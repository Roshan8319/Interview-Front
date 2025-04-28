import React, { useState } from 'react';
import video1 from '../../assets/Video1.mp4'
import toast, { Toaster } from 'react-hot-toast';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!formData.name.trim() || formData.name.length < 2) {
            toast.error('Please enter a valid name (minimum 2 characters)', {
                style: {
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
            return false;
        }

        if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            toast.error('Please enter a valid email address', {
                style: {
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
            return false;
        }

        if (!formData.phone.replace(/\D/g, '').match(/^\d{10}$/)) {
            toast.error('Please enter a valid 10-digit phone number', {
                style: {
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
            return false;
        }

        if (!formData.message.trim() || formData.message.length < 10) {
            toast.error('Please enter a message (minimum 10 characters)', {
                style: {
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateForm()) return;

        setIsSubmitting(true);
        const loadingToast = toast.loading('Sending your message...', {
            style: {
                background: '#FFFFFF',
                color: '#374151',
                border: '2px solid #e5e7eb',
            },
        });

        try {
            const response = await fetch("https://formcarry.com/s/1ra8f0NTeV5", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            toast.dismiss(loadingToast);

            if (data.code === 200) {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });

                toast.success('Message sent successfully!', {
                    style: {
                        background: '#FFFFFF',
                        color: '#374151',
                        border: '2px solid #359E45',
                    },
                    iconTheme: {
                        primary: '#359E45',
                        secondary: 'white',
                    },
                });
            } else {
                throw new Error(data.message || 'Failed to send message');
            }

        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to send message. Please try again.', {
                style: {
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '2px solid #EF4444',
                },
                iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Format phone number as user types
            const formatted = value.replace(/\D/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            setFormData(prev => ({
                ...prev,
                phone: formatted
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                if (!value.trim() || value.length < 2) {
                    toast.error('Name should be at least 2 characters long', {
                        style: {
                            background: '#FFFFFF',
                            color: '#374151',
                            border: '2px solid #EF4444',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    });
                }
                break;

            case 'email':
                if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                    toast.error('Please enter a valid email address', {
                        style: {
                            background: '#FFFFFF',
                            color: '#374151',
                            border: '2px solid #EF4444',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    });
                }
                break;

            case 'phone':
                if (!value.replace(/\D/g, '').match(/^\d{10}$/)) {
                    toast.error('Please enter a valid 10-digit phone number', {
                        style: {
                            background: '#FFFFFF',
                            color: '#374151',
                            border: '2px solid #EF4444',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    });
                }
                break;

            case 'message':
                if (!value.trim() || value.length < 10) {
                    toast.error('Message should be at least 10 characters long', {
                        style: {
                            background: '#FFFFFF',
                            color: '#374151',
                            border: '2px solid #EF4444',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: 'white',
                        },
                    });
                }
                break;

            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9]">
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
                            border: '2px solid #359E45',
                        },
                        iconTheme: {
                            primary: '#359E45',
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
                gutter={-60}
                containerStyle={{
                    bottom: '40px',
                    right: '50px',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 sm:px-6 lg:px-8 font-montserrat">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold">
                            Contact <span className="text-[#E65F2B]">Us</span>
                        </h2>
                        <p className="text-gray-600">
                            Whether you're looking to join as an interviewer, explore pricing, or simply want to learn more about Recrumeta — we're here to help.
                            <br /><br />
                            📩 For pricing details or to become an interviewer:<br />
                            Fill out the form below or email us directly at contact@recrumeta.com
                            <br /><br />
                            We'll get back to you within 24 hours. Let's build the future of tech hiring together.
                        </p>
                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="grid grid-cols-1 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-[#E65F2B] text-white px-8 py-3 rounded-3xl transition-all duration-300 flex items-center
                                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#d45525]'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Leave us a Message
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="relative rounded-2xl space-y-10">
                        {/* Video Container */}
                        <div className="relative w-full lg:w-[585px] h-auto flex flex-col items-center bg-[#FFFFFF] rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* Browser Header */}
                            <div className="flex justify-between items-center w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-t-[20px] border-b border-gray-200">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#E11D48] hover:opacity-80 transition-opacity"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FBBF24] hover:opacity-80 transition-opacity"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#22C55E] hover:opacity-80 transition-opacity"></div>
                                </div>
                            </div>

                            {/* Video with Overlay */}
                            <div className="relative w-full">
                                <video
                                    src={video1}
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    className="w-full h-auto object-cover p-2 md:p-3 rounded-b-[22px] md:rounded-b-[24px]"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Office Hours Card */}
                            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-orange-100 rounded-full">
                                        <svg className="w-6 h-6 text-[#E65F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold">Office Hours</h4>
                                </div>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        Monday - Friday: 9:00 AM - 6:00 PM IST
                                    </p>
                                    <p className="flex items-center gap-2">
                                        Weekend: By appointment only
                                    </p>
                                </div>
                            </div>

                            {/* Quick Contact Card */}
                            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-orange-100 rounded-full">
                                        <svg className="w-6 h-6 text-[#E65F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold">Quick Contact</h4>
                                </div>
                                <div className="space-y-3">
                                    <a href="mailto:recrumeta@outlook.com" className="flex items-center gap-2 text-gray-600 hover:text-[#E65F2B] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        recrumeta@outlook.com
                                    </a>
                                    <a href="tel:+917070222841" className="flex items-center gap-2 text-gray-600 hover:text-[#E65F2B] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        +91 7070222841
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="col-span-1 md:col-span-2 h-[200px] md:h-[400px] rounded-2xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.216092065197!2d85.79765577565156!3d20.24987088121164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a3b9692fff%3A0x87cd0a356bbc39ce!2sITER%2C%20Siksha%20&#39;O&#39;%20Anusandhan!5e0!3m2!1sen!2sin!4v1745483752666!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;