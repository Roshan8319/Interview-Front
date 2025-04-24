import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen py-12 px-6 sm:px-6 lg:px-8 bg-[#F1F5F9] font-montserrat">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-4">Last updated: April 24, 2025</p>

                <section className="mb-4">
                    <p className="text-gray-700 mb-4">
                        At Recrumeta, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services and website.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                    <p className="text-gray-700">We collect information in the following ways:</p>
                    
                    <h3 className="pl-4 text-lg font-medium mt-2">a. Information You Provide:</h3>
                    <ul className="list-disc pl-12 text-gray-700 space-y-1">
                        <li>Name, email address, phone number, and other contact details</li>
                        <li>Company details (for recruiters and hiring managers)</li>
                        <li>Candidate resumes, portfolio links, or job application data</li>
                        <li>Messages or communication shared through our platform</li>
                    </ul>

                    <h3 className="pl-4 text-lg font-medium mt-2">b. Information We Collect Automatically:</h3>
                    <ul className="list-disc pl-12 text-gray-700 space-y-1">
                        <li>IP address and browser information</li>
                        <li>Device and usage data (e.g., page visits, time on site)</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                    <p className="text-gray-700">We use your data to:</p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1">
                        <li>Provide and improve our services</li>
                        <li>Facilitate job screening and interview processes</li>
                        <li>Send relevant updates and notifications</li>
                        <li>Ensure the security and integrity of our platform</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
                    <p className="text-gray-700">We do not sell your data. However, we may share your information with:</p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1">
                        <li>Verified third-party service providers who support our operations</li>
                        <li>Hiring companies (if you're a candidate)</li>
                        <li>Law enforcement, when required by applicable law</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
                    <p className="text-gray-700 mb-4">
                        We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
                    <p className="text-gray-700 mb-4">
                        We retain your personal information as long as necessary to provide our services or as required by law. You may request deletion of your data at any time (subject to legal obligations).
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
                    <p className="text-gray-700">Depending on your location, you may have the right to:</p>
                    <ul className="list-disc pl-8 text-gray-700 space-y-1">
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Object to or restrict certain data processing</li>
                        <li>Withdraw consent for marketing communications</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                        To exercise these rights, contact us at{' '}
                        <a href="mailto:recrumeta@outlook.com" className="text-[#E65F2B] hover:underline">
                            recrumeta@outlook.com
                        </a>
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">7. Cookies</h2>
                    <p className="text-gray-700 mb-4">
                        We use cookies and similar technologies to improve your experience. You can manage your cookie preferences in your browser settings.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">8. Children's Privacy</h2>
                    <p className="text-gray-700 mb-4">
                        Recrumeta is not intended for children under the age of 16. We do not knowingly collect personal data from minors.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We may update this policy from time to time. Changes will be posted on this page with a revised effective date.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                    <p className="text-gray-700">
                        If you have questions about this Privacy Policy, reach out to us at:
                    </p>
                    <div className="mt-2 space-y-1 text-gray-700">
                        <p>
                            📩{' '}
                            <a href="mailto:recrumeta@outlook.in" className="text-[#E65F2B] hover:underline">
                                recrumeta@outlook.in
                            </a>
                        </p>
                        <p>
                            🌐{' '}
                            <a href="https://www.recrumeta.in" target="_blank" rel="noopener noreferrer" className="text-[#E65F2B] hover:underline">
                                www.recrumeta.in
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Privacy;