import React, { useState, useEffect, useCallback } from 'react';
import { gapi } from 'gapi-script';
import toast, { Toaster } from 'react-hot-toast';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('week'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    });
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventDetails, setShowEventDetails] = useState(false);

    // Google Calendar API credentials - replace with your own
    const API_KEY = 'AIzaSyBFyi8vbQyzOMDJcVSC6hMAy0ZY1Fl90m8';
    const CLIENT_ID = '294160514495-auh6jc99tlsvkbmo1hh6acugp1jj0975.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/calendar';

    const showToast = useCallback((message, type = 'info') => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else {
            toast(message);
        }
    }, []);

    const loadEvents = useCallback(() => {
        setIsLoading(true);

        // Calculate time ranges based on view
        let timeMin = new Date(currentDate);
        let timeMax = new Date(currentDate);

        if (view === 'week') {
            const day = timeMin.getDay();
            timeMin.setDate(timeMin.getDate() - day);
            timeMax.setDate(timeMin.getDate() + 6);
            timeMax.setHours(23, 59, 59);
        } else {
            timeMin.setDate(1);
            timeMax.setMonth(timeMax.getMonth() + 1, 0);
            timeMax.setHours(23, 59, 59);
        }

        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': timeMin.toISOString(),
            'timeMax': timeMax.toISOString(),
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items;
            setEvents(events);
            setIsLoading(false);
            // Only show toast during manual loads, not auto-refreshes
            if (events.length > 0 && !isAuthenticated) {
                showToast(`Loaded ${events.length} events`, 'info');
            }
        }).catch(error => {
            console.error("Error loading events", error);
            setIsLoading(false);
            showToast(`Failed to load events: ${error.message || 'Unknown error'}`, 'error');
        });
    }, [currentDate, view, isAuthenticated, showToast]);

    const updateSigninStatus = useCallback((isSignedIn) => {
        if (isSignedIn !== isAuthenticated) {
            setIsAuthenticated(isSignedIn);
            if (isSignedIn) {
                loadEvents();
                showToast('Successfully signed in', 'success');
            } else {
                setEvents([]);
                setIsLoading(false);
                showToast('Signed out successfully', 'info');
            }
        } else {
            setIsAuthenticated(isSignedIn);
            if (isSignedIn) {
                loadEvents();
            } else {
                setEvents([]);
                setIsLoading(false);
            }
        }
    }, [isAuthenticated, loadEvents, showToast]);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
                ux_mode: 'popup',
                redirect_uri: window.location.origin, // This will use your current URL as the redirect URI
                prompt: 'consent',
            }).then(() => {
                // Listen for sign-in state changes
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                // Handle the initial sign-in state
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }).catch(error => {
                console.error("Error initializing Google API client", error);
                setIsLoading(false);
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);

    const handleAuthClick = () => {
        if (!isAuthenticated) {
            gapi.auth2.getAuthInstance().signIn()
                .catch(error => {
                    console.error("Auth error", error);
                    showToast('Authentication failed: ' + error.error, 'error');
                });
        } else {
            gapi.auth2.getAuthInstance().signOut()
                .catch(error => {
                    console.error("Sign out error", error);
                    showToast('Sign out failed: ' + error.error, 'error');
                });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Add a flag to prevent showing toast for automatic data loading
            const silentLoad = true;
            loadEvents(silentLoad);
        }
    }, [currentDate, view, isAuthenticated, loadEvents]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowEventDetails(true);
    };

    const handleCreateEvent = () => {
        // Validate form fields
        if (!newEvent.title) {
            showToast('Please enter an event title', 'error');
            return;
        }
        if (!newEvent.startDate || !newEvent.startTime) {
            showToast('Please set a start date and time', 'error');
            return;
        }
        if (!newEvent.endDate || !newEvent.endTime) {
            showToast('Please set an end date and time', 'error');
            return;
        }

        const startDateTime = `${newEvent.startDate}T${newEvent.startTime}:00`;
        const endDateTime = `${newEvent.endDate}T${newEvent.endTime}:00`;

        // Validate that end time is after start time
        if (new Date(endDateTime) <= new Date(startDateTime)) {
            showToast('End time must be after start time', 'error');
            return;
        }

        const event = {
            summary: newEvent.title,
            description: newEvent.description,
            start: {
                dateTime: startDateTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: endDateTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        };

        gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
        }).then(() => {
            setShowEventModal(false);
            setNewEvent({
                title: '',
                description: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
            });
            loadEvents();
            showToast('Event created successfully', 'success');
        }).catch(error => {
            console.error("Error creating event", error);
            showToast(`Failed to create event: ${error.message || 'Unknown error'}`, 'error');
        });
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;

        gapi.client.calendar.events.delete({
            calendarId: 'primary',
            eventId: selectedEvent.id
        }).then(() => {
            setShowEventDetails(false);
            setSelectedEvent(null);
            loadEvents();
            showToast('Event deleted successfully', 'success');
        }).catch(error => {
            console.error("Error deleting event", error);
            showToast(`Failed to delete event: ${error.message || 'Unknown error'}`, 'error');
        });
    };

    const changeDate = (amount) => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() + (7 * amount));
        } else {
            newDate.setMonth(newDate.getMonth() + amount);
        }
        setCurrentDate(newDate);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getMonthGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = new Date(year, month, 1).getDay();

        const grid = [];
        let day = 1;

        // Create weeks
        for (let i = 0; i < 6; i++) {
            const week = [];
            // Create days in a week
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || day > daysInMonth) {
                    week.push(null); // Empty cell
                } else {
                    week.push(day);
                    day++;
                }
            }
            grid.push(week);
            if (day > daysInMonth) break;
        }

        return grid;
    };

    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - day); // Go to Sunday

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            days.push(date);
        }

        return days;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getEventsForDate = (date) => {
        if (!events.length) return [];

        return events.filter(event => {
            const eventDate = new Date(event.start.dateTime || event.start.date);
            return eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear();
        });
    };

    const getHourlyEvents = (date) => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push([]);
        }

        const dateEvents = getEventsForDate(date);
        dateEvents.forEach(event => {
            if (event.start.dateTime) {
                const startHour = new Date(event.start.dateTime).getHours();
                if (hours[startHour]) {
                    hours[startHour].push(event);
                }
            }
        });

        return hours;
    };

    const renderWeekView = () => {
        const weekDays = getWeekDays();
        const hours = Array.from({ length: 24 }, (_, i) => i);

        return (
            <div style={styles.weekView}>
                <div style={styles.weekHeader}>
                    <div style={styles.timeColumn}></div>
                    {weekDays.map((date, index) => (
                        <div key={index} style={styles.dayColumn}>
                            <div style={styles.dayName}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div style={styles.dayDate}>{date.getDate()}</div>
                        </div>
                    ))}
                </div>

                <div style={styles.weekGrid}>
                    <div style={styles.timeLabels}>
                        {hours.map(hour => (
                            <div key={hour} style={styles.timeLabel}>
                                <span style={styles.timeText}>
                                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                                </span>
                            </div>
                        ))}
                    </div>

                    {weekDays.map((date, dayIndex) => (
                        <div key={dayIndex} style={styles.dayTimeline}>
                            {hours.map(hour => {
                                const hourEvents = getHourlyEvents(date)[hour] || [];
                                return (
                                    <div key={hour} style={styles.hourSlot}>
                                        {hourEvents.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                style={styles.event}
                                                onClick={() => handleEventClick(event)}
                                            >
                                                {event.summary} ({formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)})
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        const monthGrid = getMonthGrid();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div style={styles.monthView}>
                <div style={styles.weekdayHeader}>
                    {weekdays.map((day, index) => (
                        <div key={index} style={styles.weekdayName}>
                            {day}
                        </div>
                    ))}
                </div>

                <div style={styles.monthGrid}>
                    {monthGrid.map((week, weekIndex) => (
                        <div key={weekIndex} style={styles.weekRow}>
                            {week.map((day, dayIndex) => {
                                if (day === null) {
                                    return <div key={dayIndex} style={styles.emptyDay}></div>;
                                }

                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isToday = new Date().toDateString() === date.toDateString();
                                const dayEvents = getEventsForDate(date);

                                return (
                                    <div
                                        key={dayIndex}
                                        style={{
                                            ...styles.monthDay,
                                            ...(isToday ? styles.today : {})
                                        }}
                                    >
                                        <div style={styles.dayNumber}>{day}</div>
                                        <div style={styles.dayEventList}>
                                            {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                                <div
                                                    key={eventIndex}
                                                    style={styles.monthEvent}
                                                    onClick={() => handleEventClick(event)}
                                                >
                                                    {event.summary}
                                                </div>
                                            ))}
                                            {dayEvents.length > 3 && (
                                                <div style={styles.moreEvents}>+{dayEvents.length - 3} more</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <button
                        style={styles.todayButton}
                        onClick={() => setCurrentDate(new Date())}
                    >
                        Today
                    </button>
                    <div style={styles.navButtons}>
                        <button style={styles.navButton} onClick={() => changeDate(-1)}>
                            &lt;
                        </button>
                        <button style={styles.navButton} onClick={() => changeDate(1)}>
                            &gt;
                        </button>
                    </div>
                    <div style={styles.currentDate}>
                        {currentDate.toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                            ...(view === 'week' ? { day: 'numeric' } : {})
                        })}
                    </div>
                </div>

                <div style={styles.headerRight}>
                    <div style={styles.viewButtons}>
                        <button
                            style={{
                                ...styles.viewButton,
                                ...(view === 'week' ? styles.activeViewButton : {})
                            }}
                            onClick={() => setView('week')}
                        >
                            Week
                        </button>
                        <button
                            style={{
                                ...styles.viewButton,
                                ...(view === 'month' ? styles.activeViewButton : {})
                            }}
                            onClick={() => setView('month')}
                        >
                            Month
                        </button>
                    </div>
                    <button
                        style={styles.authButton}
                        onClick={handleAuthClick}
                    >
                        {isAuthenticated ? 'Sign Out' : 'Sign In with Google'}
                    </button>
                    {isAuthenticated && (
                        <button
                            style={styles.addEventButton}
                            onClick={() => setShowEventModal(true)}
                        >
                            + Create
                        </button>
                    )}
                </div>
            </div>

            <div style={styles.calendarContent}>
                {isLoading ? (
                    <div style={styles.loading}>Loading calendar...</div>
                ) : (
                    isAuthenticated ? (
                        view === 'week' ? renderWeekView() : renderMonthView()
                    ) : (
                        <div style={styles.signInPrompt}>
                            <p>Please sign in to view your calendar</p>
                            <button
                                style={styles.signInButton}
                                onClick={handleAuthClick}
                            >
                                Sign In with Google
                            </button>
                        </div>
                    )
                )}
            </div>

            {showEventModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2>Create Event</h2>
                            <button
                                style={styles.closeButton}
                                onClick={() => setShowEventModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Title</label>
                                <input
                                    type="text"
                                    style={styles.formInput}
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Description</label>
                                <textarea
                                    style={styles.formTextarea}
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Start Date</label>
                                    <input
                                        type="date"
                                        style={styles.formInput}
                                        value={newEvent.startDate}
                                        onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Start Time</label>
                                    <input
                                        type="time"
                                        style={styles.formInput}
                                        value={newEvent.startTime}
                                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>End Date</label>
                                    <input
                                        type="date"
                                        style={styles.formInput}
                                        value={newEvent.endDate}
                                        onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>End Time</label>
                                    <input
                                        type="time"
                                        style={styles.formInput}
                                        value={newEvent.endTime}
                                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={styles.modalFooter}>
                            <button
                                style={styles.cancelButton}
                                onClick={() => setShowEventModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                style={styles.saveButton}
                                onClick={handleCreateEvent}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEventDetails && selectedEvent && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2>Event Details</h2>
                            <button
                                style={styles.closeButton}
                                onClick={() => setShowEventDetails(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <h3 style={styles.eventTitle}>{selectedEvent.summary}</h3>
                            <p style={styles.eventTime}>
                                {new Date(selectedEvent.start.dateTime || selectedEvent.start.date).toLocaleString()} -
                                {new Date(selectedEvent.end.dateTime || selectedEvent.end.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {selectedEvent.description && (
                                <p style={styles.eventDescription}>{selectedEvent.description}</p>
                            )}
                        </div>
                        <div style={styles.modalFooter}>
                            <button
                                style={styles.deleteButton}
                                onClick={handleDeleteEvent}
                            >
                                Delete
                            </button>
                            <button
                                style={styles.closeEventButton}
                                onClick={() => setShowEventDetails(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toaster */}
            <Toaster
                position="bottom-right"
                reverseOrder={true}
                toastOptions={{
                    className: '',
                    duration: 3000,
                    style: {
                        background: '#FFFFFF',
                        color: '#374151',
                        border: '2px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    success: {
                        style: {
                            border: '2px solid #E65F2B',
                        },
                        iconTheme: {
                            primary: '#E65F2B',
                            secondary: 'white',
                        },
                    },
                    error: {
                        style: {
                            border: '2px solid #EF4444',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    },
                }}
                gutter={-55}
                containerStyle={{
                    bottom: '40px',
                    right: '30px',
                }}
            />
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Montserrat', sans-serif",
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#333333',
        backgroundColor: '#EBDFD7', // Beige background from dashboard
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #e6e0da',
        backgroundColor: '#EBDFD7', // White header like dashboard cards
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    todayButton: {
        padding: '8px 16px',
        backgroundColor: '#E65F2B',
        border: '1px solid #e6e0da',
        borderRadius: '20px',
        marginRight: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        color: '#ffffff',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    navButtons: {
        display: 'flex',
        gap: '8px',
    },
    navButton: {
        backgroundColor: '#ffffff',
        border: '1px solid #e6e0da',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E65F2B',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    currentDate: {
        marginLeft: '16px',
        fontSize: '22px',
        fontWeight: '500',
        color: '#333333',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    viewButtons: {
        display: 'flex',
        border: '1px solid #e6e0da',
        borderRadius: '20px',
        overflow: 'hidden',
        color: '#E65F2B',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    viewButton: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    activeViewButton: {
        backgroundColor: '#E65F2B',
        color: 'white',
        fontWeight: '600',
    },
    authButton: {
        padding: '10px 16px',
        backgroundColor: '#E65F2B',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    addEventButton: {
        padding: '8px 16px',
        backgroundColor: '#FFFFFF',
        color: '#E65F2B',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    calendarContent: {
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: '16px',
        color: '#707070',
        backgroundColor: '#EBDFD7',
    },
    signInPrompt: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '30px',
        backgroundColor: '#EBDFD7',
    },
    signInButton: {
        padding: '12px 24px',
        backgroundColor: '#E65F2B', // Blue from dashboard charts/icons
        color: 'white',
        border: 'none',
        borderRadius: '80px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        fontWeight: '500',
    },
    errorMessage: {
        backgroundColor: '#fdeded',
        color: '#5f2120',
        padding: '12px 16px',
        borderRadius: '20px',
        marginBottom: '16px',
        fontSize: '14px',
        maxWidth: '80%',
        textAlign: 'center',
        border: '1px solid #f5c2c7',
    },

    // Week view styles
    weekView: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    weekHeader: {
        display: 'grid',
        gridTemplateColumns: '60px repeat(7, 1fr)', // Fixed width for time column and equal for days
        borderBottom: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    timeColumn: {
        width: '60px',
        borderRight: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2',
    },
    dayColumn: {
        padding: '10px 0',
        textAlign: 'center',
        borderRight: '1px solid #e6e0da',
    },
    dayName: {
        fontWeight: '600',
        fontSize: '12px',
        color: '#666666',
    },
    dayDate: {
        fontSize: '20px',
        marginTop: '6px',
        fontWeight: '500',
        color: '#E65F2B',
    },
    weekGrid: {
        display: 'grid',
        gridTemplateColumns: '60px repeat(7, 1fr)', // Match header grid
        flex: 1,
        overflow: 'auto',
        position: 'relative',
    },
    timeLabels: {
        borderRight: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2',
        position: 'sticky',
        left: 0,
        zIndex: 5,
    },
    timeLabel: {
        height: '60px',
        display: 'flex',
        alignItems: 'center', // Changed from flex-start to center
        justifyContent: 'flex-end',
        padding: '0 8px',
        fontSize: '11px',
        color: '#70757a',
        borderBottom: '1px solid #f0ece8',
        position: 'relative',
        fontWeight: '500',
    },
    dayTimeline: {
        display: 'grid',
        gridTemplateRows: 'repeat(24, 60px)', // Fixed height for each hour
        borderRight: '1px solid #e6e0da',
    },
    dayEvents: {
        borderRight: '1px solid #e6e0da',
    },
    hourSlot: {
        height: '60px',
        borderBottom: '1px solid #f0ece8',
        padding: '2px',
        position: 'relative',
    },
    event: {
        backgroundColor: '#4685fa', // Blue from dashboard charts/icons
        color: 'white',
        padding: '4px 8px',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        marginBottom: '2px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
    },

    // Month view styles
    monthView: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        width: '100%',
    },
    weekdayHeader: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)', // Equal columns for 7 days
        borderBottom: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2',
        width: '100%',
    },
    weekdayName: {
        textAlign: 'center',
        padding: '12px 0',
        fontWeight: '600',
        color: '#666666',
        fontSize: '12px',
        borderRight: '1px solid #e6e0da',
    },
    monthGrid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    weekRow: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)', // Equal columns for 7 days
        borderBottom: '1px solid #e6e0da',
    },
    monthDay: {
        border: '1px solid #e6e0da',
        padding: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        minHeight: '100px', // Ensure minimum height for days
        position: 'relative', // For event positioning
    },
    emptyDay: {
        backgroundColor: '#f8f5f2',
        border: '1px solid #e6e0da',
        minHeight: '100px', // Match height with regular days
    },
    today: {
        backgroundColor: '#e8f0fe', // Light blue highlight
        borderLeft: '3px solid #4685fa', // Blue from dashboard charts/icons
    },
    dayNumber: {
        fontSize: '14px',
        marginBottom: '6px',
        fontWeight: '500',
        color: '#333',
    },
    dayEventList: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        gap: '2px',
    },
    monthEvent: {
        backgroundColor: '#4685fa', // Blue from dashboard charts/icons
        color: 'white',
        padding: '3px 6px',
        borderRadius: '20px',
        fontSize: '11px',
        marginBottom: '2px',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    moreEvents: {
        fontSize: '11px',
        color: '#4685fa', // Blue from dashboard charts/icons
        textAlign: 'center',
        padding: '2px',
        fontWeight: '500',
        cursor: 'pointer',
    },

    // Continuous month view styles
    continuousMonthView: {
        height: '100%',
        overflow: 'auto',
        padding: '20px',
        scrollBehavior: 'smooth',
        backgroundColor: '#EBDFD7', // Beige background from dashboard
    },
    monthContainer: {
        marginBottom: '40px',
        borderRadius: '20px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    monthHeader: {
        backgroundColor: '#f8f5f2', // Light beige background from dashboard
        padding: '15px 20px',
        fontSize: '18px',
        fontWeight: '500',
        color: '#333333',
        borderBottom: '1px solid #e6e0da',
    },
    monthViewContent: {
        display: 'flex',
        flexDirection: 'column',
    },

    // Modal styles
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Higher z-index to appear above everything
        backdropFilter: 'blur(3px)',
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
        transform: 'translateZ(0)', // Force GPU acceleration for smoother backdrop filter
        isolation: 'isolate', // Create a new stacking context
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2', // Light beige background from dashboard
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#5f6368',
    },
    modalBody: {
        padding: '24px',
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#ffffff',
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px 24px',
        borderTop: '1px solid #e6e0da',
        backgroundColor: '#f8f5f2', // Light beige background from dashboard
    },

    // Form styles
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    formLabel: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#5f6368',
        fontWeight: '500',
    },
    formInput: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e6e0da',
        borderRadius: '20px',
        fontSize: '14px',
    },
    formTextarea: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e6e0da',
        borderRadius: '20px',
        fontSize: '14px',
        minHeight: '100px',
        resize: 'vertical',
    },
    formRow: {
        display: 'flex',
        gap: '16px',
    },

    // Button styles
    cancelButton: {
        padding: '10px 16px',
        backgroundColor: '#f1f3f4',
        color: '#5f6368',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: '500',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#E65F2B',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    deleteButton: {
        padding: '10px 16px',
        backgroundColor: '#ea4335', // Red color
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        marginRight: 'auto',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    closeEventButton: {
        padding: '10px 16px',
        backgroundColor: '#4685fa', // Blue from dashboard charts/icons
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },

    // Event detail styles
    eventTitle: {
        fontSize: '20px',
        fontWeight: '500',
        marginBottom: '10px',
        color: '#4685fa', // Blue from dashboard charts/icons
    },
    eventTime: {
        fontSize: '14px',
        color: '#5f6368',
        marginBottom: '16px',
        padding: '5px 0',
        borderBottom: '1px solid #e6e0da',
    },
    eventDescription: {
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6',
        color: '#3c4043',
    },

    // Additional scrollable calendar styles 
    // for the continuous scrolling feature
    visibleMonthsContainer: {
        padding: '0 10px',
        backgroundColor: '#EBDFD7', // Beige background from dashboard
    },
    nextMonthButton: {
        backgroundColor: '#4685fa', // Blue from dashboard charts/icons
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        margin: '20px auto',
        display: 'block',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
};

export default Calendar;