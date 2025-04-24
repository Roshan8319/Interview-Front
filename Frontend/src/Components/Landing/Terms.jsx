import React from 'react';
import { useNavigate } from 'react-router-dom';


const Terms = () => {
    const navigate = useNavigate();

    const naviToPrivacy = () => {
        navigate('/privacy', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
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
                        <a href="mailto:recrumeta@outlook.com" className="text-[#E65F2B] hover:underline">recrumeta@outlook.com</a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;