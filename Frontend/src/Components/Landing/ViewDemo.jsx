import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

// Updated URLs with Vimeo links
const VIDEO_URL = "https://player.vimeo.com/video/1081213421?h=d8f8deb565";
const LEFT_PANEL_URL = "https://player.vimeo.com/video/1081225631?h=1a1abf0804";
const RIGHT_PANEL_URL = "https://player.vimeo.com/video/1081227155?h=3292635ce9";

const ViewDemo = ({ isOpen, onClose, videoUrl = VIDEO_URL }) => {
    const [activeIndex, setActiveIndex] = useState(1); // 0: left, 1: center, 2: right
    const startX = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Reset to center when dialog opens
    useEffect(() => {
        if (isOpen) {
            setActiveIndex(1);
        }
    }, [isOpen]);

    // Load Vimeo API script
    useEffect(() => {
        if (isOpen && !window.Vimeo) {
            const script = document.createElement('script');
            script.src = "https://player.vimeo.com/api/player.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleMouseDown = (e) => {
        startX.current = e.clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        handleSlideLogic(currentX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        handleSlideLogic(currentX);
    };

    const handleSlideLogic = (currentX) => {
        if (startX.current === null) return;

        const diff = startX.current - currentX;
        if (Math.abs(diff) > 50) { // Threshold to trigger slide
            if (diff > 0 && activeIndex < 2) {
                // Slide left - go to next (right) panel
                setActiveIndex(activeIndex + 1);
            } else if (diff < 0 && activeIndex > 0) {
                // Slide right - go to previous (left) panel
                setActiveIndex(activeIndex - 1);
            }
            startX.current = null;
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        startX.current = null;
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        startX.current = null;
        setIsDragging(false);
    };

    const handleClickPanel = (index) => {
        setActiveIndex(index);
    };

    // Get Vimeo URL with appropriate parameters for clean embed
    const getVideoUrl = (index) => {
        let baseUrl;

        switch (index) {
            case 0:
                baseUrl = LEFT_PANEL_URL;
                break;
            case 1:
                baseUrl = videoUrl;
                break;
            case 2:
                baseUrl = RIGHT_PANEL_URL;
                break;
            default:
                baseUrl = videoUrl;
        }

        // Parse the URL to get base and hash
        const urlParts = baseUrl.split('?');
        const baseUrlWithoutParams = urlParts[0];

        // Get hash parameter if it exists
        let hashParam = '';
        if (urlParts.length > 1) {
            const params = new URLSearchParams(urlParts[1]);
            const hash = params.get('h');
            if (hash) {
                hashParam = `h=${hash}&`;
            }
        }

        // Construct URL with all needed parameters
        return `${baseUrlWithoutParams}?${hashParam}autoplay=1&background=1&muted=0&loop=0&transparent=0&responsive=1&dnt=1`;
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full">
                    <div className="relative">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-10 right-2 sm:-top-20 sm:right-10 z-30 rounded-full bg-white p-1.5 sm:p-2 shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-6 sm:w-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Interactive panel layout */}
                        <div
                            ref={containerRef}
                            className="flex items-center justify-center w-full py-2 overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {/* Left panel */}
                            <div
                                onClick={() => handleClickPanel(0)}
                                className={`transition-all duration-500 ease-in-out 
                                    ${activeIndex === 0
                                        ? 'w-[200%] sm:w-[250%] z-20 scale-100 opacity-100 cursor-default'
                                        : activeIndex === 1
                                            ? 'w-[75%] sm:w-[105%] mr-[-20px] z-10 transform -rotate-6 scale-90 opacity-90 cursor-pointer'
                                            : 'w-[70%] sm:w-[100%] mr-[-40px] z-0 transform -rotate-12 scale-75 opacity-70 cursor-pointer'}
                                    sm:rounded-lg rounded-sm overflow-hidden aspect-[2924/1680]`}
                            >
                                {activeIndex === 0 ? (
                                    <div className="w-full h-full rounded-lg overflow-hidden">
                                        <iframe
                                            className="w-full h-full"
                                            src={getVideoUrl(0)}
                                            title="Client Demo"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                            allowFullScreen
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800/80 rounded-lg">
                                        <span className="text-xs sm:text-lg font-medium text-white text-center">Client Demo</span>
                                    </div>
                                )}
                            </div>

                            {/* Center panel */}
                            <div
                                onClick={() => handleClickPanel(1)}
                                className={`transition-all duration-500 ease-in-out
                                    ${activeIndex === 1
                                        ? 'w-[200%] sm:w-[250%] z-20 scale-100 opacity-100 cursor-default'
                                        : activeIndex === 0
                                            ? 'w-[75%] sm:w-[105%] ml-[-20px] z-10 transform rotate-6 scale-90 opacity-90 cursor-pointer'
                                            : 'w-[75%] sm:w-[105%] mr-[-20px] z-10 transform -rotate-6 scale-90 opacity-90 cursor-pointer'}
                                    sm:rounded-lg rounded-sm overflow-hidden aspect-[2924/1680]`}
                            >
                                {activeIndex === 1 ? (
                                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                                        <iframe
                                            className="w-full h-full"
                                            src={getVideoUrl(1)}
                                            title="Main Demo"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                            allowFullScreen
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800/80 rounded-lg">
                                        <span className="text-xs sm:text-lg font-medium text-white text-center">Main Demo</span>
                                    </div>
                                )}
                            </div>

                            {/* Right panel */}
                            <div
                                onClick={() => handleClickPanel(2)}
                                className={`transition-all duration-500 ease-in-out
                                    ${activeIndex === 2
                                        ? 'w-[200%] sm:w-[250%] z-20 scale-100 opacity-100 cursor-default'
                                        : activeIndex === 1
                                            ? 'w-[75%] sm:w-[105%] ml-[-20px] z-10 transform rotate-6 scale-90 opacity-90 cursor-pointer'
                                            : 'w-[70%] sm:w-[100%] ml-[-40px] z-0 transform rotate-12 scale-75 opacity-70 cursor-pointer'}
                                    sm:rounded-lg rounded-sm overflow-hidden aspect-[2924/1680]`}
                            >
                                {activeIndex === 2 ? (
                                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                                        <iframe
                                            className="w-full h-full"
                                            src={getVideoUrl(2)}
                                            title="Interviewer Demo"
                                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                            allowFullScreen
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800/80 rounded-lg">
                                        <span className="text-xs sm:text-lg font-medium text-white text-center">Interviewer Demo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex justify-center mt-4 space-x-2 pb-2">
                            {[0, 1, 2].map((index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2.5 w-2.5 rounded-full transition-colors ${activeIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export { VIDEO_URL };
export default ViewDemo;