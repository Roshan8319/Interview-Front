import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
    const navigate = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const naviToPrivacy = () => {
        navigate('/privacy', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const handleEmailClick = (e) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    const handleConfirmEmail = () => {
        window.location.href = "mailto:recrumeta@outlook.com";
        setShowConfirmDialog(false);
    };

    const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
                <div className="relative bg-white rounded-3xl w-[90%] md:max-w-md shadow-xl">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 md:right-4 md:top-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
                            <path d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Content container */}
                    <div className="p-5 md:p-8">
                        {/* Title */}
                        <h3 className="text-[#E65F2B] text-xl md:text-2xl font-semibold mb-2 pr-8">
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">
                            {message}
                        </p>

                        {/* Buttons - Always side by side */}
                        <div className="flex flex-row justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-full border-2 border-[#475569] text-[#475569] hover:bg-gray-100 transition-colors duration-300 text-base md:text-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-5 py-2.5 rounded-full bg-[#E65F2B] text-white hover:bg-[#d64e1a] transition-colors duration-300 text-base md:text-lg"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen py-12 px-6 sm:px-6 lg:px-8 bg-[#F1F5F9] font-montserrat">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Terms and Conditions</h1>
                <p className="text-sm text-gray-500 mb-4">Last updated: April 24, 2025</p>

                <section className="mb-4">
                    <p className="text-gray-700 mb-2">
                        Welcome to Recrumeta ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of our platform, services, and website (the "Service"). By accessing or using Recrumeta, you agree to comply with and be bound by these Terms.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
                    <p className="text-gray-700 mb-4">
                        You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using Recrumeta, you confirm that you meet these requirements.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">2. Services</h2>
                    <p className="text-gray-700 mb-4">
                        Recrumeta provides a tech hiring platform to help companies screen, interview, and hire engineering candidates efficiently. Our services include but are not limited to resume screening, mock interviews, expert-led evaluations, and reporting tools.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
                    <p className="text-gray-700 mb-4">
                        To access certain features, you may need to register for an account. You agree to provide accurate and complete information and to keep your account secure and confidential.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">4. Use of the Platform</h2>
                    <p className="text-gray-700">
                        You agree to use Recrumeta only for lawful purposes. You may not use the platform:
                    </p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-2">
                        <li>To impersonate another person or entity.</li>
                        <li>To share misleading or false information.</li>
                        <li>To infringe on intellectual property rights.</li>
                        <li>To upload malicious software or engage in harmful activities.</li>
                    </ul>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
                    <p className="text-gray-700 mb-4">
                        All content on Recrumeta, including text, logos, branding, and software, is our property or licensed to us. You may not reproduce, distribute, or create derivative works without our written permission.
                    </p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">6. Privacy</h2>
                    <p className="text-gray-700 mb-4">
                        Your use of the Service is also governed by our&nbsp;
                        <span onClick={naviToPrivacy} className='text-[#E65F2B] hover:underline cursor-pointer'>Privacy Policy</span>
                        . We are committed to protecting your data and handling it responsibly.
                    </p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">7. Payments and Refunds</h2>
                    <p className="text-gray-700 mb-4">
                        If applicable, payments for services are non-refundable unless otherwise stated. All charges are clearly outlined before you complete any transactions.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">8. Termination</h2>
                    <p className="text-gray-700 mb-4">
                        We reserve the right to suspend or terminate your access to Recrumeta at any time, without prior notice, for conduct that violates these Terms or is otherwise harmful.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">9. Disclaimers</h2>
                    <p className="text-gray-700 mb-4">
                        Recrumeta is provided "as is" without warranties of any kind. We do not guarantee hiring outcomes or uninterrupted service availability.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">
                        To the maximum extent permitted by law, Recrumeta shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the Service.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
                    <p className="text-gray-700 mb-4">
                        We may update these Terms from time to time. Continued use of the Service after changes are posted will constitute your acceptance.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about these Terms, please contact us at{' '}
                        <a href="#" onClick={handleEmailClick} className="text-[#E65F2B] hover:underline">
                            recrumeta@outlook.com
                        </a>
                        .
                    </p>
                </section>
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmEmail}
                title="Open Email Client?"
                message="This will open your default email client to send an email to recrumeta@outlook.com"
            />
        </div >
    );
};

export default Terms;