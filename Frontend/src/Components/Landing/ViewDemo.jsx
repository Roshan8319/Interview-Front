import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

const VIDEO_URL = "https://www.youtube.com/embed/uIxOL9fKfEk";

const ViewDemo = ({ isOpen, onClose, videoUrl=VIDEO_URL }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="mx-auto w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-4">
                    <div className="relative">
                        <button
                            onClick={onClose}
                            className="absolute -top-0.5 -right-0.5 sm:-top-2 sm:-right-2 z-10 rounded-full bg-white p-1.5 sm:p-2 shadow-lg"
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

                        <div className="relative w-full pt-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl"
                                src={videoUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export {VIDEO_URL};
export default ViewDemo;