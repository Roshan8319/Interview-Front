import { useRouteError } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';


export default function ErrorBoundary() {
    const error = useRouteError();
    const [particles, setParticles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Create random particles
        const newParticles = [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="min-h-screen bg-[#EBDFD7] flex items-center justify-center p-4 overflow-hidden">
            {/* Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute bg-[#E65F2B]/20 rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            x: particle.x,
                            y: particle.y,
                        }}
                        animate={{
                            y: [particle.y, particle.y - 100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Background animated shapes */}
            <div className="fixed inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#E65F2B]/10"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: [1, 2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: `${100 + i * 50}px`,
                            height: `${100 + i * 50}px`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-xl w-full relative" // Changed from max-w-md to max-w-xl
            >
                {/* Glowing background */}
                <motion.div
                    className="absolute -z-10 w-full h-full bg-gradient-to-r from-[#E65F2B]/20 to-[#EBDFD7]/20 rounded-lg blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="flex flex-col items-center">
                    <motion.div
                        className="text-[#E65F2B] mb-4 relative"
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Add glowing effect around the icon */}
                        <div className="absolute inset-0 bg-[#E65F2B]/20 rounded-full blur-xl animate-pulse" />
                        <svg className="w-20 h-20 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2 }}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </motion.div>

                    <AnimatePresence>
                        <motion.h1
                            className="text-3xl font-bold text-gray-800 mb-4 flex flex-col items-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E65F2B] to-[#d95725] animate-gradient text-6xl">
                                404
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E65F2B] to-[#d95725] animate-gradient text-2xl">
                                Page Not Found
                            </span>
                        </motion.h1>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 25px rgba(230, 95, 43, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowModal(true)}
                            className="w-[210px] group px-8 py-3 bg-white border-2 border-[#E65F2B] text-[#E65F2B] rounded-full shadow-lg relative overflow-hidden mb-4"
                        >
                            <span className="relative z-10">View Error Details</span>
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 25px rgba(230, 95, 43, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/'}
                            className="w-[210px] group px-8 py-3 bg-gradient-to-r from-[#E65F2B] to-[#d95725] text-white rounded-full shadow-lg relative overflow-hidden"
                        >
                            <span className="relative z-10">Go Back Home</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#d95725] to-[#E65F2B]"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Error Details Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.02 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{
                                duration: 0.02,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Error Details</h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Error Type</h4>
                                        <p className="text-[#E65F2B] font-medium">{error.name || "Unknown Error"}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Message</h4>
                                        <p className="text-gray-800">{error.message || "No error message available"}</p>
                                    </div>
                                    {error.stack && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Stack Trace</h4>
                                            <pre className="mt-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                                                {error.stack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}