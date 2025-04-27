import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

const VIDEO_URL = "https://app.supademo.com/embed/cm9zrmr0a0h8413m0o36aagxp?embed_v=2";

const ViewDemo = ({ isOpen, onClose, videoUrl = VIDEO_URL }) => {
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

export { VIDEO_URL };
export default ViewDemo;


{/* <div style="position: relative; box-sizing: content-box; max-height: 80vh; max-height: 80svh; width: 100%; aspect-ratio: 1.8252184769038702; padding: 40px 0 40px 0;">
    <iframe src="https://app.supademo.com/embed/cm9zrmr0a0h8413m0o36aagxp?embed_v=2"
        loading="lazy"
        title="Recrumeta Demo"
        allow="clipboard-write"
        frameborder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div> */}