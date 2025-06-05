import React, { useState, useEffect, useCallback } from 'react';
import { gapi } from 'gapi-script';
import { toast } from 'sonner';
import { Toaster } from '@/Components/Ui/Sonner';
import { Calendar as CalendarComponent } from "@/Components/Ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Ui/Popover";
import { Button } from "@/Components/Ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/Ui/Select";
import { Input } from "@/Components/Ui/Input";
import { Textarea } from "@/Components/Ui/Textarea";
import { Label } from "@/Components/Ui/Label";
import { CalendarIcon, Clock, X, HelpCircle, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parse, isValid, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/Ui/Tooltip";
import { ScrollArea } from "@/Components/Ui/ScrollArea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/Ui/Dialog";

const animationCSS = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.event-animation {
  animation: fadeIn 0.3s ease-in-out;
}
`;

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month'); // 'week' or 'month'
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
    // Add state for tracking window width for responsive design
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Get responsive styles based on current window width
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // Google Calendar API credentials - replace with your own
    const API_KEY = 'AIzaSyBFyi8vbQyzOMDJcVSC6hMAy0ZY1Fl90m8';
    const CLIENT_ID = '294160514495-auh6jc99tlsvkbmo1hh6acugp1jj0975.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/calendar';

    // Inject custom CSS animations
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = animationCSS + `
        html, body {
            height: 100vh;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #root {
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .calendar-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1;
            height: 100vh;
            overflow: hidden;
        }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Add event listener for window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showToast = useCallback((message, type = 'info') => {
        const options = {
            duration: 3000,
            className: 'shadow-md',
            style: {
                background: '#FFFFFF',
                color: '#374151',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem'
            }
        };

        if (type === 'success') {
            toast.success(message, {
                ...options,
                style: {
                    ...options.style,
                    border: '2px solid #E65F2B',
                },
                icon: '✓',
                iconTheme: {
                    primary: '#E65F2B',
                    secondary: 'white',
                },
            });
        } else if (type === 'error') {
            toast.error(message, {
                ...options,
                style: {
                    ...options.style,
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
        } else {
            toast(message, options);
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
        console.log("Auth status update:", isSignedIn, "Previous auth status:", isAuthenticated);
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
            console.log("Auth status unchanged, but function still running");
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
            },
            // Add reminder notifications
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 }, // 30 minutes before
                ],
            },
        };

        toast.promise(
            gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event
            }),
            {
                loading: 'Creating event...',
                success: (response) => {
                    setShowEventModal(false);
                    setNewEvent({
                        title: '',
                        description: '',
                        startDate: '',
                        startTime: '',
                        endDate: '',
                        endTime: '',
                    });

                    // Get the created event details
                    const createdEvent = response.result;
                    const eventDate = new Date(createdEvent.start.dateTime || createdEvent.start.date);

                    // Update the calendar view to show the date of the new event
                    setCurrentDate(eventDate);

                    // Switch to appropriate view based on event duration
                    const startDate = new Date(createdEvent.start.dateTime || createdEvent.start.date);
                    const endDate = new Date(createdEvent.end.dateTime || createdEvent.end.date);
                    const durationInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

                    if (durationInDays > 1) {
                        setView('month');
                    } else {
                        setView('week');
                    }

                    // Then reload events to show the new event
                    loadEvents();

                    // Return success message
                    return (
                        <div className="flex flex-col">
                            <span className="font-medium">Event created successfully</span>
                            <span className="text-xs mt-1">{createdEvent.summary}</span>
                        </div>
                    );
                },
                error: (error) => {
                    console.error("Error creating event", error);
                    return `Failed to create event: ${error.message || 'Unknown error'}`;
                }
            }
        );
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;

        toast.promise(
            gapi.client.calendar.events.delete({
                calendarId: 'primary',
                eventId: selectedEvent.id
            }),
            {
                loading: 'Deleting event...',
                success: () => {
                    setShowEventDetails(false);
                    setSelectedEvent(null);
                    loadEvents();
                    return 'Event deleted successfully';
                },
                error: (error) => {
                    console.error("Error deleting event", error);
                    return `Failed to delete event: ${error.message || 'Unknown error'}`;
                }
            }
        );
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

    const handleInputFocus = (e) => {
        e.target.style.borderColor = '#E65F2B'; // Orange color when focused
        e.target.style.boxShadow = '0 0 0 2px rgba(230, 95, 43, 0.2)'; // Light orange glow
    };

    const handleInputBlur = (e) => {
        e.target.style.borderColor = '#e6e0da'; // Return to original color
        e.target.style.boxShadow = 'none';
    };

    // Helper function to generate time options from 7:00 AM to 9:30 PM
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 7; hour <= 21; hour++) {
            options.push(`${hour < 10 ? '0' + hour : hour}:00`);
            options.push(`${hour < 10 ? '0' + hour : hour}:30`);
        }
        return options;
    };

    const DatePickerWithPresets = ({ id, selectedDate, onDateChange, disabled, label }) => {
        const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : undefined);

        // Function to handle date selection
        const handleSelect = (newDate) => {
            setDate(newDate);
            // Format date as YYYY-MM-DD for the form
            const formattedDate = format(newDate, 'yyyy-MM-dd');
            onDateChange(formattedDate);
        };

        // Set initial date if provided
        useEffect(() => {
            if (selectedDate && isValid(new Date(selectedDate))) {
                setDate(new Date(selectedDate));
            }
        }, [selectedDate]);

        return (
            <div className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id={id}
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal bg-[#F6F1EE] border-[#e5e7eb] hover:bg-[#F2EAE5]",
                                !date && "text-muted-foreground"
                            )}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#E65F2B]" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0"
                        style={{ zIndex: 10000 }}
                    >
                        <div className="p-3 space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => {
                                        const today = new Date();
                                        handleSelect(today);
                                    }}
                                >
                                    Today
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => {
                                        const tomorrow = addDays(new Date(), 1);
                                        handleSelect(tomorrow);
                                    }}
                                >
                                    Tomorrow
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => {
                                        const nextWeek = addDays(new Date(), 7);
                                        handleSelect(nextWeek);
                                    }}
                                >
                                    In a week
                                </Button>
                            </div>
                        </div>
                        <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={handleSelect}
                            disabled={disabled || ((date) => date < new Date(new Date().setHours(0, 0, 0, 0)))}
                            initialFocus
                            classNames={{
                                day_selected: "bg-[#E65F2B] text-white hover:bg-[#d2542b] hover:text-white focus:bg-[#E65F2B] focus:text-white",
                                day_today: "bg-[#FEEAE3] text-[#E65F2B]",
                                day_range_middle: "bg-[#FEEAE3] text-[#E65F2B]",
                                day_range_end: "bg-[#E65F2B] text-white",
                                day_range_start: "bg-[#E65F2B] text-white",
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    const TimePickerSelect = ({ id, selectedTime, onTimeChange, label }) => {
        // Generate time options by hour category for better organization
        const generateGroupedTimeOptions = () => {
            const morningTimes = [];
            const afternoonTimes = [];
            const eveningTimes = [];

            // Morning: 7:00 AM - 11:30 AM
            for (let hour = 7; hour < 12; hour++) {
                morningTimes.push(`${hour < 10 ? '0' + hour : hour}:00`);
                morningTimes.push(`${hour < 10 ? '0' + hour : hour}:30`);
            }

            // Afternoon: 12:00 PM - 4:30 PM
            for (let hour = 12; hour < 17; hour++) {
                afternoonTimes.push(`${hour < 10 ? '0' + hour : hour}:00`);
                afternoonTimes.push(`${hour < 10 ? '0' + hour : hour}:30`);
            }

            // Evening: 5:00 PM - 9:30 PM
            for (let hour = 17; hour <= 21; hour++) {
                eveningTimes.push(`${hour < 10 ? '0' + hour : hour}:00`);
                eveningTimes.push(`${hour < 10 ? '0' + hour : hour}:30`);
            }

            return { morningTimes, afternoonTimes, eveningTimes };
        };

        const { morningTimes, afternoonTimes, eveningTimes } = generateGroupedTimeOptions();

        // Format time for display (converts 24h to 12h format with AM/PM)
        const formatTimeDisplay = (time) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours, 10);
            const isPM = hour >= 12;
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
        };

        return (
            <div className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Select
                    value={selectedTime || ''}
                    onValueChange={onTimeChange}
                >
                    <SelectTrigger
                        id={id}
                        className="bg-[#F6F1EE] border-[#e5e7eb]"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    >
                        <SelectValue placeholder="Select time">
                            {selectedTime ? formatTimeDisplay(selectedTime) : "Select time"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent style={{ zIndex: 10000 }}>
                        <SelectGroup>
                            <div className="px-2 py-1.5">
                                <h4 className="text-sm font-medium text-[#E65F2B]">Quick select</h4>
                                <div className="grid grid-cols-2 gap-1 mt-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B]"
                                        onClick={() => onTimeChange('09:00')}
                                    >
                                        9:00 AM
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B]"
                                        onClick={() => onTimeChange('12:00')}
                                    >
                                        12:00 PM
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B]"
                                        onClick={() => onTimeChange('13:30')}
                                    >
                                        1:30 PM
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B]"
                                        onClick={() => onTimeChange('17:00')}
                                    >
                                        5:00 PM
                                    </Button>
                                </div>
                            </div>

                            <div className="py-1.5 px-2">
                                <h4 className="text-xs font-medium text-gray-500 mb-1">Morning</h4>
                                {morningTimes.map((time) => (
                                    <SelectItem
                                        key={time}
                                        value={time}
                                        className="hover:bg-[#FEEAE3] hover:text-[#E65F2B] focus:bg-[#FEEAE3] focus:text-[#E65F2B] data-[selected]:bg-[#FEEAE3] data-[selected]:text-[#E65F2B]"
                                    >
                                        {formatTimeDisplay(time)}
                                    </SelectItem>
                                ))}
                            </div>

                            <div className="py-1.5 px-2">
                                <h4 className="text-xs font-medium text-gray-500 mb-1">Afternoon</h4>
                                {afternoonTimes.map((time) => (
                                    <SelectItem
                                        key={time}
                                        value={time}
                                        className="hover:bg-[#FEEAE3] hover:text-[#E65F2B] focus:bg-[#FEEAE3] focus:text-[#E65F2B] data-[selected]:bg-[#FEEAE3] data-[selected]:text-[#E65F2B]"
                                    >
                                        {formatTimeDisplay(time)}
                                    </SelectItem>
                                ))}
                            </div>

                            <div className="py-1.5 px-2">
                                <h4 className="text-xs font-medium text-gray-500 mb-1">Evening</h4>
                                {eveningTimes.map((time) => (
                                    <SelectItem
                                        key={time}
                                        value={time}
                                        className="hover:bg-[#FEEAE3] hover:text-[#E65F2B] focus:bg-[#FEEAE3] focus:text-[#E65F2B] data-[selected]:bg-[#FEEAE3] data-[selected]:text-[#E65F2B]"
                                    >
                                        {formatTimeDisplay(time)}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        );
    };

    const renderWeekView = () => {
        const weekDays = getWeekDays();
        const hours = Array.from({ length: 24 }, (_, i) => i);

        return (
            <div style={styles.weekView} className="bg-white rounded-lg shadow-sm">
                <div style={styles.weekHeader} className="sticky top-0 z-10 border-b">
                    <div style={styles.timeColumn} className="bg-[#f8f5f2]"></div>
                    {weekDays.map((date, index) => {
                        const isToday = new Date().toDateString() === date.toDateString();
                        return (
                            <div
                                key={index}
                                style={styles.dayColumn}
                                className={cn(
                                    "transition-colors",
                                    isToday ? "bg-[#FEEAE3]" : "bg-[#f8f5f2]"
                                )}
                            >
                                <div style={styles.dayName} className="text-xs font-semibold text-gray-600">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div
                                    style={styles.dayDate}
                                    className={cn(
                                        "text-lg font-medium mt-1",
                                        isToday ? "text-[#E65F2B]" : "text-gray-700"
                                    )}
                                >
                                    {date.getDate()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <ScrollArea className="flex-1 h-full"> {/* Update to flex-1 and h-full */}
                    <div style={styles.weekGrid} className="overflow-auto pb-20 md:pb-16">
                        <div style={styles.timeLabels} className="bg-[#f8f5f2] sticky left-0 z-10">
                            {hours.map(hour => (
                                <div key={hour} style={styles.timeLabel} className="flex items-start justify-end pr-2">
                                    <span style={styles.timeText} className="relative -top-2 text-gray-500 text-xs">
                                        {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {weekDays.map((date, dayIndex) => {
                            const isToday = new Date().toDateString() === date.toDateString();
                            return (
                                <div
                                    key={dayIndex}
                                    style={styles.dayTimeline}
                                    className={isToday ? "bg-[#FEEAE3]/30" : ""}
                                >
                                    {hours.map(hour => {
                                        const hourEvents = getHourlyEvents(date)[hour] || [];
                                        return (
                                            <div
                                                key={hour}
                                                style={styles.hourSlot}
                                                className="hover:bg-gray-50 transition-colors"
                                                onClick={() => {
                                                    if (isAuthenticated) {
                                                        // Create a new event on that specific time slot
                                                        const eventDate = new Date(date);
                                                        eventDate.setHours(hour);

                                                        // Format the date strings for the form
                                                        const formattedDate = format(eventDate, 'yyyy-MM-dd');
                                                        const formattedTime = format(eventDate, 'HH:00');
                                                        const endTime = format(new Date(eventDate.getTime() + 60 * 60 * 1000), 'HH:00');

                                                        setNewEvent({
                                                            title: '',
                                                            description: '',
                                                            startDate: formattedDate,
                                                            startTime: formattedTime,
                                                            endDate: formattedDate,
                                                            endTime: endTime,
                                                        });
                                                        setShowEventModal(true);
                                                    }
                                                }}
                                            >
                                                {hourEvents.map((event, eventIndex) => (
                                                    <TooltipProvider key={eventIndex}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div
                                                                    className="bg-[#E65F2B] text-white text-xs rounded-full px-2 py-1 mb-1 cursor-pointer hover:bg-[#d2542b] transition-colors shadow-sm truncate event-animation"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEventClick(event);
                                                                    }}
                                                                >
                                                                    {event.summary} ({formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)})
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-white p-3 shadow-lg rounded-lg border border-[#e6e0da] max-w-xs">
                                                                <div className="space-y-2">
                                                                    <h4 className="font-medium text-[#E65F2B]">{event.summary}</h4>
                                                                    <div className="flex items-center text-xs text-gray-600">
                                                                        <CalendarIcon className="w-3 h-3 mr-1" />
                                                                        <span>
                                                                            {format(new Date(event.start.dateTime), 'MMM d, h:mm a')} -
                                                                            {format(new Date(event.end.dateTime), ' h:mm a')}
                                                                        </span>
                                                                    </div>
                                                                    {event.description && (
                                                                        <p className="text-xs text-gray-700 truncate max-w-[200px]">
                                                                            {event.description.length > 100
                                                                                ? `${event.description.substring(0, 100)}...`
                                                                                : event.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        );
    };

    const renderMonthView = () => {
        const monthGrid = getMonthGrid();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div style={styles.monthView} className="bg-white rounded-lg shadow-sm flex flex-col">
                <div style={styles.weekdayHeader} className="grid grid-cols-7 border-b bg-[#f8f5f2] flex-shrink-0">
                    {weekdays.map((day, index) => (
                        <div
                            key={index}
                            className="text-center py-3 text-xs font-semibold text-gray-600 border-r last:border-r-0"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <ScrollArea className="flex-1"> {/* Add ScrollArea with flex-1 */}
                    <div style={styles.monthGrid} className="flex-1 flex flex-col pb-0 md:pb-20">
                        {monthGrid.map((week, weekIndex) => (
                            <div
                                key={weekIndex}
                                style={styles.weekRow}
                                className="grid grid-cols-7 border-b last:border-b-0"
                            >
                                {week.map((day, dayIndex) => {
                                    if (day === null) {
                                        return (
                                            <div
                                                key={dayIndex}
                                                style={styles.emptyDay}
                                                className="bg-[#f8f5f2] border border-[#e6e0da]"
                                            />
                                        );
                                    }

                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                    const isToday = new Date().toDateString() === date.toDateString();
                                    const dayEvents = getEventsForDate(date);

                                    return (
                                        <div
                                            key={dayIndex}
                                            style={isToday ? { ...styles.monthDay, ...styles.today } : styles.monthDay}
                                            className={`cursor-pointer hover:bg-[#f8f5f2] transition-colors ${isToday ? 'bg-[#FEEAE3] border-[#E65F2B]' : ''}`}
                                            onClick={() => {
                                                if (isAuthenticated) {
                                                    const formattedDate = format(date, 'yyyy-MM-dd');
                                                    const now = new Date();
                                                    // Default to current time for new events
                                                    const formattedTime = format(now, 'HH:00');
                                                    const endTime = format(new Date(now.getTime() + 60 * 60 * 1000), 'HH:00');

                                                    setNewEvent({
                                                        title: '',
                                                        description: '',
                                                        startDate: formattedDate,
                                                        startTime: formattedTime,
                                                        endDate: formattedDate,
                                                        endTime: endTime,
                                                    });
                                                    setShowEventModal(true);
                                                }
                                            }}
                                        >
                                            <div style={styles.dayNumber} className="font-medium">
                                                {day}
                                            </div>
                                            <div style={styles.dayEventList} className="space-y-1 overflow-y-auto">
                                                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                                    <TooltipProvider key={eventIndex}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div
                                                                    className="bg-[#E65F2B] text-white text-[10px] rounded px-1.5 py-0.5 truncate cursor-pointer hover:bg-[#d2542b] transition-colors shadow-sm event-animation"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEventClick(event);
                                                                    }}
                                                                >
                                                                    {event.summary}
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-white p-3 shadow-lg rounded-lg border border-[#e6e0da] max-w-xs">
                                                                <div className="space-y-2">
                                                                    <h4 className="font-medium text-[#E65F2B]">{event.summary}</h4>
                                                                    <div className="flex items-center text-xs text-gray-600">
                                                                        <Clock className="w-3 h-3 mr-1" />
                                                                        <span>
                                                                            {format(new Date(event.start.dateTime || event.start.date), 'h:mm a')} -
                                                                            {format(new Date(event.end.dateTime || event.end.date), ' h:mm a')}
                                                                        </span>
                                                                    </div>
                                                                    {event.description && (
                                                                        <p className="text-xs text-gray-700 truncate max-w-[200px]">
                                                                            {event.description.length > 100
                                                                                ? `${event.description.substring(0, 100)}...`
                                                                                : event.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ))}
                                                {dayEvents.length > 3 && (
                                                    <div className="text-[10px] text-gray-500 pl-1">
                                                        +{dayEvents.length - 3} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        );
    };

    // Define styles for the calendar component
    const styles = {
        container: {
            fontFamily: "'Montserrat', sans-serif",
            height: '100vh', // Use viewport height
            display: 'flex',
            flexDirection: 'column',
            color: '#333333',
            backgroundColor: '#EBDFD7',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            flex: 1, // Add this to make the container flex and fill available space
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '10px 5px' : isTablet ? '12px 16px' : '16px 24px',
            borderBottom: '1px solid #e6e0da',
            backgroundColor: '#EBDFD7', // White header like dashboard cards
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '8px' : '0',
            width: '100%',
            marginTop: isMobile ? '1rem' : '0',
        },
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            padding: isMobile ? '0 6px' : '0',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            width: isMobile ? '100%' : 'auto',
            marginBottom: isMobile ? '5px' : '0',
            gap: isMobile ? '5px' : '20px',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
        dateNavigationContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '4px' : '8px',
            margin: '0',
            width: 'auto',
        },
        currentDate: {
            fontSize: isMobile ? '12px' : '18px',
            fontWeight: '500',
            color: '#333333',
            textAlign: 'center',
            minWidth: isMobile ? '80px' : '100px',
            padding: '0',
        },
        headerRight: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '10px' : '12px',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end',
            flexWrap: isMobile ? 'nowrap' : 'nowrap',
            padding: isMobile ? '0 5px' : '0',
        },
        viewButtons: {
            display: 'flex',
            border: '1px solid #e6e0da',
            borderRadius: '20px',
            overflow: 'hidden',
            color: '#E65F2B',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            marginBottom: isMobile ? '0' : '0',
            width: isMobile ? 'auto' : 'auto',
            maxWidth: '100%',
            margin: isMobile ? '0' : '0',
        },
        calendarContent: {
            flex: 1,
            position: 'relative',
            backgroundColor: '#EBDFD7',
            width: '100%',
            margin: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0, // Important for flex children to prevent overflow
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: isMobile ? '14px' : '16px',
            color: '#707070',
            backgroundColor: '#EBDFD7',
        },
        signInPrompt: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flex: 1,
            backgroundColor: '#EBDFD7',
            width: '100%',
        },
        weekView: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            margin: 0,
            padding: 0,
            flex: 1,
        },
        weekHeader: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '50px repeat(7, 1fr)' : isTablet ? '60px repeat(7, 1fr)' : '60px repeat(7, 1fr)',
            borderBottom: '1px solid #e6e0da',
            backgroundColor: '#f8f5f2',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%',
            margin: 0,
            padding: 0,
            fontSize: isMobile ? '11px' : 'inherit',
        },
        timeColumn: {
            width: isMobile ? '50px' : '60px',
            borderRight: '1px solid #e6e0da',
            backgroundColor: '#f8f5f2',
            fontSize: isMobile ? '10px' : isTablet ? '11px' : 'inherit',
        },
        dayColumn: {
            padding: isMobile ? '5px 0' : '10px 0',
            textAlign: 'center',
            borderRight: '1px solid #e6e0da',
            minWidth: 'auto', // Remove fixed minimum width
            overflow: 'hidden', // Add this to prevent content overflow
            whiteSpace: 'nowrap', // Optional: prevents text wrapping
            textOverflow: 'ellipsis', // Optional: adds ellipsis for overflowing text
        },
        dayName: {
            fontWeight: '600',
            fontSize: isMobile ? '10px' : '12px',
            color: '#666666',
        },
        dayDate: {
            fontSize: isMobile ? '18px' : '20px',
            marginTop: '6px',
            fontWeight: '500',
            color: '#E65F2B',
        },
        weekGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '50px repeat(7, 1fr)' : isTablet ? '60px repeat(7, 1fr)' : '60px repeat(7, 1fr)',
            flex: 1,
            position: 'relative',
            width: '100%',
            margin: 0,
            padding: 0,
            minHeight: 0, // Add this to prevent grid from expanding past container
            paddingBottom: isMobile ? '8rem' : '4rem', // Add extra padding at the bottom
        },
        timeLabels: {
            borderRight: '1px solid #e6e0da',
            backgroundColor: '#f8f5f2',
            position: 'sticky',
            left: 0,
            zIndex: 5,
            width: isMobile ? '50px' : '60px',
        },
        timeLabel: {
            height: isMobile ? '40px' : '50px',
            padding: isMobile ? '0 5px' : '0 10px',
            borderBottom: '1px solid #e6e0da',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
        },
        timeText: {
            fontSize: isMobile ? '10px' : '12px',
            color: '#666666',
            marginTop: '-10px',
        },
        dayTimeline: {
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #e6e0da',
            minWidth: 'auto', // Remove fixed minimum width
            overflow: 'hidden', // Prevent overflow
        },
        hourSlot: {
            height: isMobile ? '40px' : '50px',
            borderBottom: '1px solid #f0ece8',
            padding: '2px',
            position: 'relative',
        },
        monthView: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#EBDFD7',
            width: '100%',
            margin: 0,
            padding: 0,
            overflow: 'hidden', // Control overflow
            flex: 1,
        },
        weekdayHeader: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            borderBottom: '1px solid #e6e0da',
            backgroundColor: '#f8f5f2',
            width: '100%',
            margin: 0,
            padding: 0,
        },
        weekdayName: {
            textAlign: 'center',
            padding: isMobile ? '8px 0' : '12px 0',
            fontWeight: '600',
            color: '#666666',
            fontSize: isMobile ? '9px' : '12px',
            borderRight: '1px solid #e6e0da',
        },
        monthGrid: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: 0, // Add this to prevent grid from expanding past container
            overflow: 'none',
        },
        weekRow: {
            flex: 'none',
            height: isMobile ? 'auto' : isTablet ? '110px' : '130px',
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            borderBottom: '1px solid #e6e0da',
        },
        monthDay: {
            border: '1px solid #e6e0da',
            padding: isMobile ? '4px' : '6px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            minHeight: isMobile ? '60px' : isTablet ? '80px' : '100px',
            height: 'auto',
            position: 'relative',
        },
        emptyDay: {
            backgroundColor: '#f8f5f2',
            border: '1px solid #e6e0da',
            minHeight: isMobile ? '60px' : isTablet ? '80px' : '100px',
        },
        today: {
            backgroundColor: '#FEEAE3', // Light orange highlight
            border: '1px solid #E65F2B', // Orange from dashboard charts/icons
        },
        dayNumber: {
            fontSize: isMobile ? '10px' : '14px',
            marginBottom: isMobile ? '2px' : '6px',
            fontWeight: '500',
            color: '#333',
        },
        dayEventList: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            gap: isMobile ? '1px' : '2px',
        },

        // Modal styles
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9000, // Set a base z-index for the modal
            backdropFilter: 'blur(3px)',
            margin: 0,
            padding: 0,
            transform: 'translateZ(0)',
            isolation: 'isolate',
        },
        modalContent: {
            backgroundColor: '#EBDFD7',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            margin: isMobile ? '0 10px' : '0',
            position: 'relative', // Add this
            zIndex: 9500, // And this to establish stacking context
        },
        modalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#E65F2B',
            fontWeight: '500',
            fontSize: isMobile ? '18px' : '20px',
            padding: '20px 24px',
            borderBottom: '1px solid #e6e0da',
            backgroundColor: '#F2EAE5', // Light beige background from dashboard
        },
        modalBody: {
            padding: isMobile ? '16px' : '24px',
            flex: 1,
            overflow: 'hidden',
            backgroundColor: '#F2EAE5',
        },
        modalFooter: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px 24px',
            borderTop: '1px solid #e6e0da',
            backgroundColor: '#F2EAE5', // Light beige background from dashboard
        }
    };

    return (
        <div className="calendar-wrapper">
            <div style={styles.container} className="focus:outline-none" tabIndex="0" role="application" aria-label="Calendar">
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <Button
                            className="bg-[#E65F2B] text-white hover:bg-[#d2542b] rounded-full px-4"
                            onClick={() => setCurrentDate(new Date())}
                        >
                            Today
                        </Button>
                        <div style={styles.dateNavigationContainer}>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white rounded-full h-8 w-8 border-[#e6e0da] text-[#E65F2B]"
                                onClick={() => changeDate(-1)}
                                aria-label="Previous"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div style={styles.currentDate} role="heading" aria-level="1">
                                {currentDate.toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric',
                                    ...(view === 'week' ? { day: 'numeric' } : {})
                                })}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white rounded-full h-8 w-8 border-[#e6e0da] text-[#E65F2B]"
                                onClick={() => changeDate(1)}
                                aria-label="Next"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div style={styles.headerRight}>
                        <div style={styles.viewButtons} className="bg-white rounded-full overflow-hidden">
                            <Button
                                variant={view === 'week' ? 'default' : 'ghost'}
                                className={cn(
                                    "rounded-none border-none px-4 py-2", // Adding consistent padding
                                    view === 'week'
                                        ? "bg-[#E65F2B] text-white hover:bg-[#E65F2B]"
                                        : "bg-white text-[#E65F2B] hover:bg-gray-50"
                                )}
                                onClick={() => setView('week')}
                                aria-label="Week view"
                                aria-pressed={view === 'week'}
                            >
                                Week
                            </Button>
                            <Button
                                variant={view === 'month' ? 'default' : 'ghost'}
                                className={cn(
                                    "rounded-none border-none px-4 py-2", // Adding consistent padding
                                    view === 'month'
                                        ? "bg-[#E65F2B] text-white hover:bg-[#E65F2B]"
                                        : "bg-white text-[#E65F2B] hover:bg-gray-500"
                                )}
                                onClick={() => setView('month')}
                                aria-label="Month view"
                                aria-pressed={view === 'month'}
                            >
                                Month
                            </Button>
                        </div>
                        {isAuthenticated && (
                            <Button
                                variant="outline"
                                className="bg-white text-[#E65F2B] hover:bg-[#F2EAE5] rounded-full"
                                onClick={() => setShowEventModal(true)}
                            >
                                + Create
                            </Button>
                        )}
                        <Button
                            className="bg-[#E65F2B] text-white hover:bg-[#d2542b] rounded-full"
                            onClick={handleAuthClick}
                        >
                            {isAuthenticated ? 'Sign Out' : 'Sign In with Google'}
                        </Button>
                    </div>
                </div>

                <div style={styles.calendarContent} className="rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full bg-white/50 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
                                <div className="h-8 w-8 border-2 border-[#E65F2B] border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600">Loading your calendar...</p>
                            </div>
                        </div>
                    ) : (
                        isAuthenticated ? (
                            view === 'week' ? renderWeekView() : renderMonthView()
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full bg-white/50 rounded-lg p-8 text-center">
                                <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center -mt-40">
                                    <CalendarIcon className="h-16 w-16 text-[#E65F2B] mb-4" />
                                    <p className="text-xl text-gray-700 mb-6">Please sign in to view your calendar</p>
                                    <Button
                                        className="bg-[#E65F2B] text-white hover:bg-[#d2542b] rounded-full px-8 py-6 text-base"
                                        onClick={handleAuthClick}
                                    >
                                        Sign In with Google
                                    </Button>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {showEventModal && (
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <div style={styles.modalHeader}>
                                <h2 className="text-[#E65F2B] text-xl font-medium">Create Event</h2>
                                <Button
                                    variant="ghost"
                                    className="rounded-full h-8 w-8 p-0 hover:bg-[#FEEAE3]"
                                    onClick={() => setShowEventModal(false)}
                                    aria-label="Close modal"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <ScrollArea className="max-h-[70vh]">
                                <div style={styles.modalBody}>
                                    <div className="space-y-5">
                                        <div className="space-y-3">
                                            <Label htmlFor="event-title" className="text-sm font-medium text-gray-700">
                                                Event Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="event-title"
                                                className="w-full bg-[#F6F1EE] border-[#e5e7eb] focus-visible:ring-[#E65F2B] focus-visible:ring-offset-0"
                                                value={newEvent.title}
                                                placeholder='Enter the event title'
                                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                                required
                                                aria-required="true"
                                            />
                                            {!newEvent.title && (
                                                <p className="text-xs text-[#E65F2B] mt-1">Title is required</p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="event-description" className="text-sm font-medium text-gray-700">Description</Label>
                                            <Textarea
                                                id="event-description"
                                                className="resize-vertical min-h-[100px] bg-[#F6F1EE] border-[#e5e7eb] focus-visible:ring-[#E65F2B] focus-visible:ring-offset-0"
                                                value={newEvent.description}
                                                placeholder='Enter the event description'
                                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DatePickerWithPresets
                                                id="start-date"
                                                selectedDate={newEvent.startDate}
                                                onDateChange={(formattedDate) => setNewEvent(prev => ({
                                                    ...prev,
                                                    startDate: formattedDate,
                                                    // If endDate is before startDate, update it
                                                    endDate: prev.endDate && new Date(formattedDate) > new Date(prev.endDate)
                                                        ? formattedDate
                                                        : prev.endDate
                                                }))}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                label={
                                                    <div className="flex items-center">
                                                        Start Date <span className="text-red-500 ml-1">*</span>
                                                    </div>
                                                }
                                            />

                                            <TimePickerSelect
                                                id="start-time"
                                                selectedTime={newEvent.startTime}
                                                onTimeChange={(value) => setNewEvent(prev => {
                                                    // Handle auto-adjusting end time
                                                    let newEndTime = prev.endTime;
                                                    if (prev.startDate === prev.endDate && prev.endTime) {
                                                        // If same day and end time exists, make sure end time is after start time
                                                        const [startHour, startMinute] = value.split(':').map(Number);
                                                        const [endHour, endMinute] = prev.endTime.split(':').map(Number);

                                                        if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                                                            // Set end time to be 1 hour after start time
                                                            let newEndHour = startHour + 1;
                                                            if (newEndHour >= 24) newEndHour = 23;
                                                            newEndTime = `${newEndHour < 10 ? '0' + newEndHour : newEndHour}:${startMinute < 10 ? '0' + startMinute : startMinute}`;
                                                        }
                                                    }

                                                    return {
                                                        ...prev,
                                                        startTime: value,
                                                        endTime: newEndTime
                                                    };
                                                })}
                                                label={
                                                    <div className="flex items-center">
                                                        Start Time <span className="text-red-500 ml-1">*</span>
                                                    </div>
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DatePickerWithPresets
                                                id="end-date"
                                                selectedDate={newEvent.endDate}
                                                onDateChange={(formattedDate) => setNewEvent(prev => ({ ...prev, endDate: formattedDate }))}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                                    (newEvent.startDate && date < new Date(newEvent.startDate))
                                                }
                                                label={
                                                    <div className="flex items-center">
                                                        End Date <span className="text-red-500 ml-1">*</span>
                                                    </div>
                                                }
                                            />

                                            <TimePickerSelect
                                                id="end-time"
                                                selectedTime={newEvent.endTime}
                                                onTimeChange={(value) => setNewEvent(prev => ({ ...prev, endTime: value }))}
                                                label={
                                                    <div className="flex items-center">
                                                        End Time <span className="text-red-500 ml-1">*</span>
                                                    </div>
                                                }
                                            />
                                        </div>

                                        {/* Form validation feedback */}
                                        {newEvent.startDate && newEvent.startTime && newEvent.endDate && newEvent.endTime && (
                                            (() => {
                                                const startDateTime = `${newEvent.startDate}T${newEvent.startTime}:00`;
                                                const endDateTime = `${newEvent.endDate}T${newEvent.endTime}:00`;

                                                if (new Date(endDateTime) <= new Date(startDateTime)) {
                                                    return (
                                                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
                                                            End time must be after start time
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })()
                                        )}
                                    </div>
                                </div>
                            </ScrollArea>

                            <div style={styles.modalFooter}>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        className="bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e5e7eb] hover:text-[#3c4043] border-none rounded-full"
                                        onClick={() => setShowEventModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-[#E65F2B] text-white hover:bg-[#d2542b] rounded-full"
                                        onClick={handleCreateEvent}
                                        disabled={
                                            !newEvent.title ||
                                            !newEvent.startDate ||
                                            !newEvent.startTime ||
                                            !newEvent.endDate ||
                                            !newEvent.endTime ||
                                            new Date(`${newEvent.endDate}T${newEvent.endTime}:00`) <= new Date(`${newEvent.startDate}T${newEvent.startTime}:00`)
                                        }
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showEventDetails && selectedEvent && (
                    <div style={styles.modal}>
                        <div style={styles.modalContent} className="max-w-md">
                            <div style={styles.modalHeader} className="flex justify-between items-center">
                                <h2 className="text-[#E65F2B] text-xl font-medium">Event Details</h2>
                                <Button
                                    variant="ghost"
                                    className="rounded-full h-8 w-8 p-0 hover:bg-[#FEEAE3]"
                                    onClick={() => setShowEventDetails(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <ScrollArea>
                                <div style={styles.modalBody} className="space-y-5">
                                    <h3 className="text-2xl font-semibold text-[#E65F2B] leading-tight">{selectedEvent.summary}</h3>

                                    <div className="space-y-4">
                                        {/* Time details */}
                                        <div className="flex flex-col space-y-1.5 bg-[#FEEAE3] rounded-lg p-3">
                                            <div className="flex items-center gap-2 text-[#5f6368] text-sm">
                                                <CalendarIcon className="h-4 w-4 text-[#E65F2B]" />
                                                <div className="font-medium">
                                                    {format(new Date(selectedEvent.start.dateTime || selectedEvent.start.date), 'EEE, MMM d, yyyy')}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[#5f6368] text-sm">
                                                <Clock className="h-4 w-4 text-[#E65F2B]" />
                                                <div>
                                                    {format(new Date(selectedEvent.start.dateTime || selectedEvent.start.date), 'h:mm a')} -
                                                    {format(new Date(selectedEvent.end.dateTime || selectedEvent.end.date), ' h:mm a')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Event description */}
                                        {selectedEvent.description && (
                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-[#e6e0da]">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                                <div className="prose prose-sm max-w-none text-[#3c4043] whitespace-pre-wrap text-sm">
                                                    {selectedEvent.description}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ScrollArea>
                            <div style={styles.modalFooter} className="flex justify-between items-center gap-x-4">
                                <Button
                                    variant="destructive"
                                    className="bg-[#ea4335] hover:bg-[#d73528] rounded-full px-4"
                                    onClick={handleDeleteEvent}
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="bg-[#E65F2B] text-white hover:bg-[#d2542b] rounded-full px-5"
                                    onClick={() => setShowEventDetails(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toaster */}
                <Toaster 
                    position="bottom-right" 
                    closeButton
                    theme="light"
                    duration={3000}
                    className="toast-container"
                    toastOptions={{
                        style: {
                            background: '#FFFFFF',
                            color: '#374151',
                            border: '2px solid #e5e7eb',
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
                />
            </div>
        </div>
    );
};

export default Calendar;
