import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OurTeam from './OurTeam';
import GrowYourTeam from './GrowYourTeam';
import YourEngineerBuild from './YourEngineerBuild';
import EveryHiringSolution from './EveryHiringSolution';
import WhomWeSupport from './WhomWeSupport';
import OurProduct from './OurProduct';
import EffortlessHiring from './EffortlessHiring';
import { useNavigate } from 'react-router-dom';
import Load from '../../assets/Load';
import { Outlet } from 'react-router-dom';
import ViewDemo, { VIDEO_URL } from './ViewDemo';

function NavigationLayout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDemo, setShowDemo] = useState(false); // State for showing the demo modal
    const [showEmailDialog, setShowEmailDialog] = useState(false); // State for showing the email dialog
    const [showPhoneDialog, setShowPhoneDialog] = useState(false); // State for showing the phone dialog

    useEffect(() => {
        const startTime = Date.now();
        const minLoadTime = 2000; // 2 seconds minimum

        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        }, 0);

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const naviToSignIn = () => {
        navigate('/auth/signin');
    };

    const naviToTerms = () => {
        navigate('/terms', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const naviToPrivacy = () => {
        navigate('/privacy', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const naviToContact = () => {
        navigate('/contact', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const naviToJoinAsInterviewer = () => {
        navigate('/join-as-interviewer', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const navigateToHome = () => {
        navigate('/', { replace: true }); // Replace current route
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    const scrollToProduct = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/', { replace: true });
            // Wait for navigation to complete before scrolling
            setTimeout(() => {
                const productSection = document.getElementById('product-section');
                if (productSection) {
                    const headerOffset = document.querySelector('.sticky').offsetHeight;
                    const elementPosition = productSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            const productSection = document.getElementById('product-section');
            if (productSection) {
                const headerOffset = document.querySelector('.sticky').offsetHeight;
                const elementPosition = productSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollToAboutUs = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/', { replace: true });
            setTimeout(() => {
                const aboutSection = document.getElementById('About-us-section');
                if (aboutSection) {
                    const headerOffset = document.querySelector('.sticky').offsetHeight;
                    const elementPosition = aboutSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            const aboutSection = document.getElementById('About-us-section');
            if (aboutSection) {
                const headerOffset = document.querySelector('.sticky').offsetHeight;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollToContactUs = (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
            navigate('/', { replace: true });
            setTimeout(() => {
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                    const headerOffset = document.querySelector('.sticky').offsetHeight;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                const headerOffset = document.querySelector('.sticky').offsetHeight;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    {/* Dialog */ }
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
        <div className="flex flex-col min-h-screen font-montserrat-recrumeta">
            {loading ? (
                <div className="min-h-screen flex flex-col bg-[#EBDFD7] items-center justify-center">
                    <Load />
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="sticky top-0 z-50 bg-white">
                        <div className={`w-full flex justify-between items-center py-2 px-4 md:px-2 ${isScrolled ? 'shadow-md' : ''}`}>
                            {/* Logo */}
                            <div className="flex items-center px-0 md:px-10 cursor-pointer" onClick={navigateToHome}>
                                <svg
                                    width="180"
                                    height="42"
                                    viewBox="0 0 1600 400"
                                    className="w-[140px] h-[35px] md:w-[200px] md:h-[50px]"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M60 185.674V328H90V256.837H90.0024C90.0024 251.386 91.0887 245.988 93.1993 240.952C95.3099 235.916 98.4034 231.34 102.303 227.486C106.203 223.631 110.833 220.574 115.928 218.488C121.024 216.402 126.485 215.328 132 215.328V215.325H139V185.674H132C122.545 185.674 113.182 187.515 104.447 191.091C99.3265 193.187 94.4805 195.856 90 199.036V185.674H60Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M220.912 194.482C218.732 196.637 216.419 198.646 213.989 200.5C216.419 202.354 218.732 204.363 220.912 206.518C227.598 213.126 232.901 220.971 236.519 229.604C240.138 238.238 242 247.492 242 256.837V328H212V256.837H211.998C211.998 251.386 210.911 245.988 208.801 240.952C206.69 235.916 203.597 231.34 199.697 227.486C195.797 223.631 191.167 220.574 186.072 218.488C180.976 216.402 175.515 215.328 170 215.328V215.326H163V185.674H170V185.672C175.515 185.672 180.976 184.598 186.072 182.512C191.167 180.426 195.797 177.369 199.697 173.514C203.597 169.66 206.69 165.084 208.801 160.048C210.911 155.012 211.998 149.614 211.998 144.163C211.998 138.712 210.911 133.314 208.801 128.278C206.69 123.242 203.597 118.666 199.697 114.811C195.797 110.957 191.167 107.899 186.072 105.813C180.976 103.727 175.515 102.654 170 102.654V73C179.455 73 188.818 74.8407 197.553 78.4169C206.289 81.9932 214.226 87.235 220.912 93.8431C227.598 100.451 232.901 108.296 236.519 116.93C240.138 125.564 242 134.818 242 144.163C242 153.508 240.138 162.762 236.519 171.396C232.901 180.029 227.598 187.874 220.912 194.482Z"
                                        fill="#E65F2B"
                                    />
                                    <path
                                        d="M60 161.953H90V144.163H90.0024C90.0024 138.712 91.0887 133.314 93.1993 128.278C95.3099 123.242 98.4034 118.666 102.303 114.811C106.203 110.957 110.833 107.899 115.928 105.813C121.024 103.727 126.485 102.654 132 102.654V102.651H170V73H60V161.953Z"
                                        fill="#E65F2B"
                                    />
                                    <path
                                        d="M343.683 327.82C328.257 327.82 314.737 324.787 303.123 318.72C291.683 312.48 282.757 303.987 276.343 293.24C270.103 282.493 266.983 270.273 266.983 256.58C266.983 242.713 270.017 230.493 276.083 219.92C282.323 209.173 290.817 200.767 301.563 194.7C312.483 188.633 324.877 185.6 338.743 185.6C352.263 185.6 364.31 188.547 374.883 194.44C385.457 200.333 393.777 208.653 399.843 219.4C405.91 230.147 408.943 242.8 408.943 257.36C408.943 258.747 408.857 260.307 408.683 262.04C408.683 263.773 408.597 265.42 408.423 266.98H292.723V245.4H391.263L378.523 252.16C378.697 244.187 377.05 237.167 373.583 231.1C370.117 225.033 365.35 220.267 359.283 216.8C353.39 213.333 346.543 211.6 338.743 211.6C330.77 211.6 323.75 213.333 317.683 216.8C311.79 220.267 307.11 225.12 303.643 231.36C300.35 237.427 298.703 244.62 298.703 252.94V258.14C298.703 266.46 300.61 273.827 304.423 280.24C308.237 286.653 313.61 291.593 320.543 295.06C327.477 298.527 335.45 300.26 344.463 300.26C352.263 300.26 359.283 299.047 365.523 296.62C371.763 294.193 377.31 290.38 382.163 285.18L399.583 305.2C393.343 312.48 385.457 318.113 375.923 322.1C366.563 325.913 355.817 327.82 343.683 327.82Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M503.862 327.82C489.302 327.82 476.302 324.787 464.862 318.72C453.595 312.48 444.755 303.987 438.342 293.24C431.928 282.493 428.722 270.273 428.722 256.58C428.722 242.713 431.928 230.493 438.342 219.92C444.755 209.173 453.595 200.767 464.862 194.7C476.302 188.633 489.302 185.6 503.862 185.6C517.382 185.6 529.255 188.373 539.482 193.92C549.882 199.293 557.768 207.267 563.142 217.84L538.182 232.4C534.022 225.813 528.908 220.96 522.842 217.84C516.948 214.72 510.535 213.16 503.602 213.16C495.628 213.16 488.435 214.893 482.022 218.36C475.608 221.827 470.582 226.853 466.942 233.44C463.302 239.853 461.482 247.567 461.482 256.58C461.482 265.593 463.302 273.393 466.942 279.98C470.582 286.393 475.608 291.333 482.022 294.8C488.435 298.267 495.628 300 503.602 300C510.535 300 516.948 298.44 522.842 295.32C528.908 292.2 534.022 287.347 538.182 280.76L563.142 295.32C557.768 305.72 549.882 313.78 539.482 319.5C529.255 325.047 517.382 327.82 503.862 327.82Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M591.236 326V187.16H622.176V225.38L618.536 214.2C622.696 204.84 629.196 197.733 638.036 192.88C647.049 188.027 658.229 185.6 671.576 185.6V216.54C670.189 216.193 668.889 216.02 667.676 216.02C666.463 215.847 665.249 215.76 664.036 215.76C651.729 215.76 641.936 219.4 634.656 226.68C627.376 233.787 623.736 244.447 623.736 258.66V326H591.236Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M759.176 327.82C747.389 327.82 736.989 325.653 727.976 321.32C718.962 316.813 711.942 310.053 706.916 301.04C701.889 291.853 699.376 280.327 699.376 266.46V187.16H731.876V262.04C731.876 274.52 734.649 283.88 740.196 290.12C745.916 296.187 753.976 299.22 764.376 299.22C772.002 299.22 778.589 297.66 784.136 294.54C789.856 291.42 794.276 286.74 797.396 280.5C800.689 274.26 802.336 266.547 802.336 257.36V187.16H834.836V326H803.896V288.56L809.356 300C804.676 309.013 797.829 315.947 788.816 320.8C779.802 325.48 769.922 327.82 759.176 327.82Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M1052.63 185.6C1063.72 185.6 1073.51 187.767 1082.01 192.1C1090.67 196.433 1097.43 203.107 1102.29 212.12C1107.14 220.96 1109.57 232.4 1109.57 246.44V326H1077.07V250.6C1077.07 238.293 1074.38 229.107 1069.01 223.04C1063.63 216.973 1055.92 213.94 1045.87 213.94C1038.76 213.94 1032.43 215.5 1026.89 218.62C1021.51 221.74 1017.27 226.333 1014.15 232.4C1011.2 238.467 1009.73 246.18 1009.73 255.54V326H977.228V250.6C977.228 238.293 974.542 229.107 969.168 223.04C963.795 216.973 956.082 213.94 946.028 213.94C938.922 213.94 932.595 215.5 927.048 218.62C921.675 221.74 917.428 226.333 914.308 232.4C911.362 238.467 909.888 246.18 909.888 255.54V326H877.388V187.16H908.328V224.08L902.868 213.16C907.548 204.147 914.308 197.3 923.148 192.62C932.162 187.94 942.388 185.6 953.828 185.6C966.828 185.6 978.095 188.807 987.628 195.22C997.335 201.633 1003.75 211.34 1006.87 224.34L994.128 219.92C998.635 209.52 1006.09 201.2 1016.49 194.96C1026.89 188.72 1038.93 185.6 1052.63 185.6Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M1216.61 327.82C1201.19 327.82 1187.67 324.787 1176.05 318.72C1164.61 312.48 1155.69 303.987 1149.27 293.24C1143.03 282.493 1139.91 270.273 1139.91 256.58C1139.91 242.713 1142.95 230.493 1149.01 219.92C1155.25 209.173 1163.75 200.767 1174.49 194.7C1185.41 188.633 1197.81 185.6 1211.67 185.6C1225.19 185.6 1237.24 188.547 1247.81 194.44C1258.39 200.333 1266.71 208.653 1272.77 219.4C1278.84 230.147 1281.87 242.8 1281.87 257.36C1281.87 258.747 1281.79 260.307 1281.61 262.04C1281.61 263.773 1281.53 265.42 1281.35 266.98H1165.65V245.4H1264.19L1251.45 252.16C1251.63 244.187 1249.98 237.167 1246.51 231.1C1243.05 225.033 1238.28 220.267 1232.21 216.8C1226.32 213.333 1219.47 211.6 1211.67 211.6C1203.7 211.6 1196.68 213.333 1190.61 216.8C1184.72 220.267 1180.04 225.12 1176.57 231.36C1173.28 237.427 1171.63 244.62 1171.63 252.94V258.14C1171.63 266.46 1173.54 273.827 1177.35 280.24C1181.17 286.653 1186.54 291.593 1193.47 295.06C1200.41 298.527 1208.38 300.26 1217.39 300.26C1225.19 300.26 1232.21 299.047 1238.45 296.62C1244.69 294.193 1250.24 290.38 1255.09 285.18L1272.51 305.2C1266.27 312.48 1258.39 318.113 1248.85 322.1C1239.49 325.913 1228.75 327.82 1216.61 327.82Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M1365.35 327.82C1350.1 327.82 1338.31 323.92 1329.99 316.12C1321.67 308.147 1317.51 296.447 1317.51 281.02V156.48H1350.01V280.24C1350.01 286.827 1351.66 291.94 1354.95 295.58C1358.42 299.22 1363.18 301.04 1369.25 301.04C1376.53 301.04 1382.6 299.133 1387.45 295.32L1396.55 318.46C1392.74 321.58 1388.06 323.92 1382.51 325.48C1376.96 327.04 1371.24 327.82 1365.35 327.82ZM1294.63 214.2V188.2H1387.19V214.2H1294.63Z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M1508.83 326V297.92L1507.01 291.94V242.8C1507.01 233.267 1504.15 225.9 1498.43 220.7C1492.71 215.327 1484.04 212.64 1472.43 212.64C1464.63 212.64 1456.91 213.853 1449.29 216.28C1441.83 218.707 1435.51 222.087 1430.31 226.42L1417.57 202.76C1425.02 197.04 1433.86 192.793 1444.09 190.02C1454.49 187.073 1465.23 185.6 1476.33 185.6C1496.43 185.6 1511.95 190.453 1522.87 200.16C1533.96 209.693 1539.51 224.513 1539.51 244.62V326H1508.83ZM1465.15 327.82C1454.75 327.82 1445.65 326.087 1437.85 322.62C1430.05 318.98 1423.98 314.04 1419.65 307.8C1415.49 301.387 1413.41 294.193 1413.41 286.22C1413.41 278.42 1415.23 271.4 1418.87 265.16C1422.68 258.92 1428.83 253.98 1437.33 250.34C1445.82 246.7 1457.09 244.88 1471.13 244.88H1511.43V266.46H1473.47C1462.37 266.46 1454.92 268.28 1451.11 271.92C1447.29 275.387 1445.39 279.72 1445.39 284.92C1445.39 290.813 1447.73 295.493 1452.41 298.96C1457.09 302.427 1463.59 304.16 1471.91 304.16C1479.88 304.16 1486.99 302.34 1493.23 298.7C1499.64 295.06 1504.23 289.687 1507.01 282.58L1512.47 302.08C1509.35 310.227 1503.71 316.553 1495.57 321.06C1487.59 325.567 1477.45 327.82 1465.15 327.82Z"
                                        fill="#000"
                                    />
                                </svg>
                            </div>

                            {/* Hamburger Menu Button */}
                            <button
                                className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg
                                    className={`w-6 h-6 text-black transition-transform duration-500 ease-in-out ${isMenuOpen ? 'rotate-180' : 'rotate-0'
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex md:items-center md:gap-x-12">
                                <Link to="#" onClick={scrollToProduct} className="hover:text-[#E65F2B]">
                                    Product
                                </Link>
                                <Link to="#" onClick={scrollToContactUs} className="hover:text-[#E65F2B]">
                                    Pricing
                                </Link>
                                <Link to="#" onClick={scrollToAboutUs} className="hover:text-[#E65F2B]">
                                    About Us
                                </Link>
                            </div>

                            {/* Sign In and Join as Interviewer */}
                            <div className="hidden md:flex items-center gap-x-6 px-10">
                                <button onClick={naviToJoinAsInterviewer} className="text-[#E65F2B] font-medium whitespace-nowrap text-sm md:text-base">
                                    <span className="text-[16px] md:text-[18px] hover:underline">Join as interviewer</span>
                                </button>
                                <button
                                    onClick={naviToSignIn}
                                    className="w-[100px] md:w-[116px] h-[38px] md:h-[42px] flex justify-center items-center rounded-lg border-2 border-black text-sm md:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-2000 ease-in-out">
                                <div className="flex flex-col items-center gap-y-4 py-4 border-b border-gray-200">
                                    <Link to="#" onClick={(e) => {
                                        scrollToProduct(e);
                                        setIsMenuOpen(false);
                                    }} className="hover:text-[#E65F2B]">
                                        Product
                                    </Link>
                                    <Link to="#" onClick={(e) => {
                                        scrollToContactUs(e);
                                        setIsMenuOpen(false);
                                    }} className="hover:text-[#E65F2B]">
                                        Pricing
                                    </Link>
                                    <Link to="#" onClick={(e) => {
                                        scrollToAboutUs(e);
                                        setIsMenuOpen(false);
                                    }} className="hover:text-[#E65F2B]">
                                        About Us
                                    </Link>
                                    <button onClick={() => {
                                        naviToJoinAsInterviewer();
                                        setIsMenuOpen(false);
                                    }} className="text-[#E65F2B] font-medium whitespace-nowrap text-sm">
                                        Join as interviewer
                                    </button>
                                    <button
                                        onClick={() => {
                                            naviToSignIn();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-[100px] h-[38px] flex justify-center items-center rounded-lg border-2 border-black text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        {window.location.pathname === '/' ? (
                            <>
                                <YourEngineerBuild />
                                <EveryHiringSolution />
                                <EffortlessHiring />

                                <WhomWeSupport />
                                <div id="product-section">
                                    <OurProduct />
                                </div>
                                <div id='About-us-section'>
                                    <OurTeam />
                                </div>
                                <div id='contact-section'>
                                    <GrowYourTeam />
                                </div>
                            </>
                        ) : (
                            <Outlet />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-[#0F172A]">
                        <footer className='w-full px-4 md:w-[95%] mx-auto text-[#E2E8F0]' >
                            {/* Footer content wrapper */}
                            <div className='w-full flex flex-col md:flex-row border-b-[1px] border-[#E2E8F0] py-8 md:py-0' >
                                {/* Logo and tagline section */}
                                <div className='w-full md:w-[30%] flex flex-col gap-y-4 items-start text-left mt-0 md:mt-6 pb-8 md:pb-16' >
                                    <div className="w-[260px] md:w-[300px]">
                                        <svg
                                            width="300"
                                            height="75"
                                            viewBox="0 0 1600 400"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M60 185.674V328H90V256.837H90.0024C90.0024 251.386 91.0887 245.988 93.1993 240.952C95.3099 235.916 98.4034 231.34 102.303 227.486C106.203 223.631 110.833 220.574 115.928 218.488C121.024 216.402 126.485 215.328 132 215.328V215.325H139V185.674H132C122.545 185.674 113.182 187.515 104.447 191.091C99.3265 193.187 94.4805 195.856 90 199.036V185.674H60Z" fill="white" />
                                            <path
                                                d="M220.912 194.482C218.732 196.637 216.419 198.646 213.989 200.5C216.419 202.354 218.732 204.363 220.912 206.518C227.598 213.126 232.901 220.971 236.519 229.604C240.138 238.238 242 247.492 242 256.837V328H212V256.837H211.998C211.998 251.386 210.911 245.988 208.801 240.952C206.69 235.916 203.597 231.34 199.697 227.486C195.797 223.631 191.167 220.574 186.072 218.488C180.976 216.402 175.515 215.328 170 215.328V215.326H163V185.674H170V185.672C175.515 185.672 180.976 184.598 186.072 182.512C191.167 180.426 195.797 177.369 199.697 173.514C203.597 169.66 206.69 165.084 208.801 160.048C210.911 155.012 211.998 149.614 211.998 144.163C211.998 138.712 210.911 133.314 208.801 128.278C206.69 123.242 203.597 118.666 199.697 114.811C195.797 110.957 191.167 107.899 186.072 105.813C180.976 103.727 175.515 102.654 170 102.654V73C179.455 73 188.818 74.8407 197.553 78.4169C206.289 81.9932 214.226 87.235 220.912 93.8431C227.598 100.451 232.901 108.296 236.519 116.93C240.138 125.564 242 134.818 242 144.163C242 153.508 240.138 162.762 236.519 171.396C232.901 180.029 227.598 187.874 220.912 194.482Z"
                                                fill="#E65F2B"
                                            />
                                            <path
                                                d="M60 161.953H90V144.163H90.0024C90.0024 138.712 91.0887 133.314 93.1993 128.278C95.3099 123.242 98.4034 118.666 102.303 114.811C106.203 110.957 110.833 107.899 115.928 105.813C121.024 103.727 126.485 102.654 132 102.654V102.651H170V73H60V161.953Z"
                                                fill="#E65F2B"
                                            />
                                            <path
                                                d="M343.683 327.82C328.257 327.82 314.737 324.787 303.123 318.72C291.683 312.48 282.757 303.987 276.343 293.24C270.103 282.493 266.983 270.273 266.983 256.58C266.983 242.713 270.017 230.493 276.083 219.92C282.323 209.173 290.817 200.767 301.563 194.7C312.483 188.633 324.877 185.6 338.743 185.6C352.263 185.6 364.31 188.547 374.883 194.44C385.457 200.333 393.777 208.653 399.843 219.4C405.91 230.147 408.943 242.8 408.943 257.36C408.943 258.747 408.857 260.307 408.683 262.04C408.683 263.773 408.597 265.42 408.423 266.98H292.723V245.4H391.263L378.523 252.16C378.697 244.187 377.05 237.167 373.583 231.1C370.117 225.033 365.35 220.267 359.283 216.8C353.39 213.333 346.543 211.6 338.743 211.6C330.77 211.6 323.75 213.333 317.683 216.8C311.79 220.267 307.11 225.12 303.643 231.36C300.35 237.427 298.703 244.62 298.703 252.94V258.14C298.703 266.46 300.61 273.827 304.423 280.24C308.237 286.653 313.61 291.593 320.543 295.06C327.477 298.527 335.45 300.26 344.463 300.26C352.263 300.26 359.283 299.047 365.523 296.62C371.763 294.193 377.31 290.38 382.163 285.18L399.583 305.2C393.343 312.48 385.457 318.113 375.923 322.1C366.563 325.913 355.817 327.82 343.683 327.82Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M503.862 327.82C489.302 327.82 476.302 324.787 464.862 318.72C453.595 312.48 444.755 303.987 438.342 293.24C431.928 282.493 428.722 270.273 428.722 256.58C428.722 242.713 431.928 230.493 438.342 219.92C444.755 209.173 453.595 200.767 464.862 194.7C476.302 188.633 489.302 185.6 503.862 185.6C517.382 185.6 529.255 188.373 539.482 193.92C549.882 199.293 557.768 207.267 563.142 217.84L538.182 232.4C534.022 225.813 528.908 220.96 522.842 217.84C516.948 214.72 510.535 213.16 503.602 213.16C495.628 213.16 488.435 214.893 482.022 218.36C475.608 221.827 470.582 226.853 466.942 233.44C463.302 239.853 461.482 247.567 461.482 256.58C461.482 265.593 463.302 273.393 466.942 279.98C470.582 286.393 475.608 291.333 482.022 294.8C488.435 298.267 495.628 300 503.602 300C510.535 300 516.948 298.44 522.842 295.32C528.908 292.2 534.022 287.347 538.182 280.76L563.142 295.32C557.768 305.72 549.882 313.78 539.482 319.5C529.255 325.047 517.382 327.82 503.862 327.82Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M591.236 326V187.16H622.176V225.38L618.536 214.2C622.696 204.84 629.196 197.733 638.036 192.88C647.049 188.027 658.229 185.6 671.576 185.6V216.54C670.189 216.193 668.889 216.02 667.676 216.02C666.463 215.847 665.249 215.76 664.036 215.76C651.729 215.76 641.936 219.4 634.656 226.68C627.376 233.787 623.736 244.447 623.736 258.66V326H591.236Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M759.176 327.82C747.389 327.82 736.989 325.653 727.976 321.32C718.962 316.813 711.942 310.053 706.916 301.04C701.889 291.853 699.376 280.327 699.376 266.46V187.16H731.876V262.04C731.876 274.52 734.649 283.88 740.196 290.12C745.916 296.187 753.976 299.22 764.376 299.22C772.002 299.22 778.589 297.66 784.136 294.54C789.856 291.42 794.276 286.74 797.396 280.5C800.689 274.26 802.336 266.547 802.336 257.36V187.16H834.836V326H803.896V288.56L809.356 300C804.676 309.013 797.829 315.947 788.816 320.8C779.802 325.48 769.922 327.82 759.176 327.82Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1052.63 185.6C1063.72 185.6 1073.51 187.767 1082.01 192.1C1090.67 196.433 1097.43 203.107 1102.29 212.12C1107.14 220.96 1109.57 232.4 1109.57 246.44V326H1077.07V250.6C1077.07 238.293 1074.38 229.107 1069.01 223.04C1063.63 216.973 1055.92 213.94 1045.87 213.94C1038.76 213.94 1032.43 215.5 1026.89 218.62C1021.51 221.74 1017.27 226.333 1014.15 232.4C1011.2 238.467 1009.73 246.18 1009.73 255.54V326H977.228V250.6C977.228 238.293 974.542 229.107 969.168 223.04C963.795 216.973 956.082 213.94 946.028 213.94C938.922 213.94 932.595 215.5 927.048 218.62C921.675 221.74 917.428 226.333 914.308 232.4C911.362 238.467 909.888 246.18 909.888 255.54V326H877.388V187.16H908.328V224.08L902.868 213.16C907.548 204.147 914.308 197.3 923.148 192.62C932.162 187.94 942.388 185.6 953.828 185.6C966.828 185.6 978.095 188.807 987.628 195.22C997.335 201.633 1003.75 211.34 1006.87 224.34L994.128 219.92C998.635 209.52 1006.09 201.2 1016.49 194.96C1026.89 188.72 1038.93 185.6 1052.63 185.6Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1216.61 327.82C1201.19 327.82 1187.67 324.787 1176.05 318.72C1164.61 312.48 1155.69 303.987 1149.27 293.24C1143.03 282.493 1139.91 270.273 1139.91 256.58C1139.91 242.713 1142.95 230.493 1149.01 219.92C1155.25 209.173 1163.75 200.767 1174.49 194.7C1185.41 188.633 1197.81 185.6 1211.67 185.6C1225.19 185.6 1237.24 188.547 1247.81 194.44C1258.39 200.333 1266.71 208.653 1272.77 219.4C1278.84 230.147 1281.87 242.8 1281.87 257.36C1281.87 258.747 1281.79 260.307 1281.61 262.04C1281.61 263.773 1281.53 265.42 1281.35 266.98H1165.65V245.4H1264.19L1251.45 252.16C1251.63 244.187 1249.98 237.167 1246.51 231.1C1243.05 225.033 1238.28 220.267 1232.21 216.8C1226.32 213.333 1219.47 211.6 1211.67 211.6C1203.7 211.6 1196.68 213.333 1190.61 216.8C1184.72 220.267 1180.04 225.12 1176.57 231.36C1173.28 237.427 1171.63 244.62 1171.63 252.94V258.14C1171.63 266.46 1173.54 273.827 1177.35 280.24C1181.17 286.653 1186.54 291.593 1193.47 295.06C1200.41 298.527 1208.38 300.26 1217.39 300.26C1225.19 300.26 1232.21 299.047 1238.45 296.62C1244.69 294.193 1250.24 290.38 1255.09 285.18L1272.51 305.2C1266.27 312.48 1258.39 318.113 1248.85 322.1C1239.49 325.913 1228.75 327.82 1216.61 327.82Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1365.35 327.82C1350.1 327.82 1338.31 323.92 1329.99 316.12C1321.67 308.147 1317.51 296.447 1317.51 281.02V156.48H1350.01V280.24C1350.01 286.827 1351.66 291.94 1354.95 295.58C1358.42 299.22 1363.18 301.04 1369.25 301.04C1376.53 301.04 1382.6 299.133 1387.45 295.32L1396.55 318.46C1392.74 321.58 1388.06 323.92 1382.51 325.48C1376.96 327.04 1371.24 327.82 1365.35 327.82ZM1294.63 214.2V188.2H1387.19V214.2H1294.63Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1508.83 326V297.92L1507.01 291.94V242.8C1507.01 233.267 1504.15 225.9 1498.43 220.7C1492.71 215.327 1484.04 212.64 1472.43 212.64C1464.63 212.64 1456.91 213.853 1449.29 216.28C1441.83 218.707 1435.51 222.087 1430.31 226.42L1417.57 202.76C1425.02 197.04 1433.86 192.793 1444.09 190.02C1454.49 187.073 1465.23 185.6 1476.33 185.6C1496.43 185.6 1511.95 190.453 1522.87 200.16C1533.96 209.693 1539.51 224.513 1539.51 244.62V326H1508.83ZM1465.15 327.82C1454.75 327.82 1445.65 326.087 1437.85 322.62C1430.05 318.98 1423.98 314.04 1419.65 307.8C1415.49 301.387 1413.41 294.193 1413.41 286.22C1413.41 278.42 1415.23 271.4 1418.87 265.16C1422.68 258.92 1428.83 253.98 1437.33 250.34C1445.82 246.7 1457.09 244.88 1471.13 244.88H1511.43V266.46H1473.47C1462.37 266.46 1454.92 268.28 1451.11 271.92C1447.29 275.387 1445.39 279.72 1445.39 284.92C1445.39 290.813 1447.73 295.493 1452.41 298.96C1457.09 302.427 1463.59 304.16 1471.91 304.16C1479.88 304.16 1486.99 302.34 1493.23 298.7C1499.64 295.06 1504.23 289.687 1507.01 282.58L1512.47 302.08C1509.35 310.227 1503.71 316.553 1495.57 321.06C1487.59 325.567 1477.45 327.82 1465.15 327.82Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <div className='text-[22px] md:text-[28px] font-medium px-2' >
                                        <p>Your Engineers Build,</p>
                                        <p>We handle the interviews</p>
                                    </div>
                                </div>

                                {/* Social section - adjusted width and spacing */}
                                <div className='w-full md:w-[70%] flex flex-col md:flex-row items-start md:items-start justify-end mt-6 md:mt-12 pb-8 md:pb-10 gap-8 md:gap-24 pr-12 pl-2' >
                                    {/* Sitemap Section */}
                                    <div className='w-full md:w-auto flex flex-col gap-y-3 items-start' >
                                        <p className='font-semibold text-[#F0C274]'>Sitemap</p>
                                        <ul className='flex flex-col gap-y-3' >
                                            <li><a href='#' onClick={scrollToProduct} className='hover:text-[#E65F2B]' >Products</a></li>
                                            <li><a href='#' onClick={scrollToContactUs} className='hover:text-[#E65F2B]' >Pricing</a></li>
                                            <li><a href='#' onClick={scrollToAboutUs} className='hover:text-[#E65F2B]' >About Us</a></li>
                                            <li>
                                                <button onClick={() => setShowDemo(true)} className='group flex items-center gap-x-2 hover:text-[#E65F2B]'>
                                                    <span className='transition-colors duration-300'>
                                                        View Demo
                                                    </span>
                                                    <svg className='transition-all duration-300 group-hover:rotate-[-45deg]' width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path className="fill-[#E2E8F0] group-hover:fill-[#E65F2B]" d="M15.586 11.6247L11.636 7.67469C11.4538 7.48609 11.353 7.23349 11.3553 6.97129C11.3576 6.70909 11.4628 6.45828 11.6482 6.27287C11.8336 6.08747 12.0844 5.9823 12.3466 5.98002C12.6088 5.97774 12.8614 6.07853 13.05 6.26069L18.707 11.9177C18.8002 12.0103 18.8741 12.1205 18.9246 12.2418C18.9751 12.3632 19.001 12.4933 19.001 12.6247C19.001 12.7561 18.9751 12.8862 18.9246 13.0075C18.8741 13.1289 18.8002 13.239 18.707 13.3317L13.05 18.9887C12.9578 19.0842 12.8474 19.1604 12.7254 19.2128C12.6034 19.2652 12.4722 19.2928 12.3394 19.2939C12.2066 19.2951 12.0749 19.2698 11.952 19.2195C11.8291 19.1692 11.7175 19.095 11.6236 19.0011C11.5297 18.9072 11.4555 18.7955 11.4052 18.6726C11.3549 18.5498 11.3296 18.4181 11.3307 18.2853C11.3319 18.1525 11.3595 18.0213 11.4119 17.8993C11.4643 17.7773 11.5405 17.6669 11.636 17.5747L15.586 13.6247H6C5.73478 13.6247 5.48043 13.5193 5.29289 13.3318C5.10536 13.1443 5 12.8899 5 12.6247C5 12.3595 5.10536 12.1051 5.29289 11.9176C5.48043 11.73 5.73478 11.6247 6 11.6247H15.586Z" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Contact Section */}
                                    <div className='w-full md:w-auto flex flex-col gap-y-3 items-start' >
                                        <p className='font-semibold text-[#F0C274]'>Contact Us</p>
                                        <ul className='flex flex-col gap-y-3'>
                                            <li className='group flex items-center gap-x-4 hover:text-[#E65F2B]'>
                                                <div>
                                                    <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20 4.96777H4C2.89543 4.96777 2 5.8632 2 6.96777V18.9678C2 20.0723 2.89543 20.9678 4 20.9678H20C21.1046 20.9678 22 20.0723 22 18.9678V6.96777C22 5.8632 21.1046 4.96777 20 4.96777Z"
                                                            className="stroke-[#475569] group-hover:stroke-[#E65F2B] transition-colors duration-300"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M22 7.96777L13.03 13.6678C12.7213 13.8612 12.3643 13.9638 12 13.9638C11.6357 13.9638 11.2787 13.8612 10.97 13.6678L2 7.96777"
                                                            className="stroke-[#475569] group-hover:stroke-[#E65F2B] transition-colors duration-300"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowEmailDialog(true);
                                                    }}>
                                                        <p>team.recrumeta@gmail.com</p>
                                                    </a>
                                                </div>
                                            </li>
                                            <li className='group flex items-center gap-x-2 hover:text-[#E65F2B]'>
                                                <div>
                                                    <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.366 11.6498C10.3045 13.2981 11.6696 14.6633 13.318 15.6018L14.202 14.3638C14.3442 14.1647 14.5543 14.0247 14.7928 13.9701C15.0313 13.9156 15.2814 13.9503 15.496 14.0678C16.9101 14.8413 18.4721 15.3062 20.079 15.4318C20.3298 15.4516 20.5638 15.5653 20.7345 15.7501C20.9052 15.9349 21 16.1772 21 16.4288V20.8908C21.0001 21.1384 20.9083 21.3772 20.7424 21.561C20.5765 21.7448 20.3483 21.8605 20.102 21.8858C19.572 21.9404 19.038 21.9678 18.5 21.9678C9.94 21.9678 3 15.0278 3 6.46777C3 5.92977 3.02733 5.39577 3.082 4.86577C3.10725 4.61947 3.22298 4.39129 3.40679 4.22541C3.5906 4.05952 3.82941 3.96772 4.077 3.96777H8.539C8.79056 3.96774 9.0329 4.06252 9.21768 4.23322C9.40247 4.40392 9.51613 4.638 9.536 4.88877C9.66157 6.49569 10.1265 8.05771 10.9 9.47177C11.0175 9.68634 11.0522 9.93651 10.9977 10.175C10.9431 10.4134 10.8031 10.6236 10.604 10.7658L9.366 11.6498ZM6.844 10.9928L8.744 9.63577C8.20465 8.47192 7.83522 7.23664 7.647 5.96777H5.01C5.00333 6.13444 5 6.30111 5 6.46777C5 13.9238 11.044 19.9678 18.5 19.9678C18.6667 19.9678 18.8333 19.9644 19 19.9578V17.3208C17.7311 17.1326 16.4959 16.7631 15.332 16.2238L13.975 18.1238C13.4287 17.9113 12.8981 17.6607 12.387 17.3738L12.329 17.3408C10.3677 16.2243 8.74344 14.6001 7.627 12.6388L7.594 12.5808C7.30678 12.0698 7.05615 11.5392 6.844 10.9928Z"
                                                            className="fill-[#475569] group-hover:fill-[#E65F2B] transition-colors duration-300" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowPhoneDialog(true);
                                                    }}>
                                                        <p>+91-7070222841</p>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Connect Section */}
                                    <div className='w-full md:w-auto flex flex-col gap-y-3 items-start' >
                                        <p className='font-semibold text-[#F0C274]'>Connect with us</p>
                                        <ul className='flex flex-col gap-y-3'>
                                            <li className='flex items-center gap-x-4'>
                                                <div className='group hover:text-[#E65F2B]'>
                                                    <a href="https://www.linkedin.com/in/7070sumit" target="_blank">
                                                        <svg width="38" height="38" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M29.8521 3.88448H5.1479C4.8702 3.88062 4.59446 3.93151 4.33643 4.03423C4.0784 4.13695 3.84313 4.28949 3.64406 4.48314C3.44499 4.6768 3.28602 4.90777 3.17622 5.16287C3.06642 5.41797 3.00795 5.6922 3.00415 5.9699V30.9657C3.00795 31.2434 3.06642 31.5177 3.17622 31.7728C3.28602 32.0279 3.44499 32.2588 3.64406 32.4525C3.84313 32.6461 4.0784 32.7987 4.33643 32.9014C4.59446 33.0041 4.8702 33.055 5.1479 33.0511H29.8521C30.1298 33.055 30.4055 33.0041 30.6635 32.9014C30.9216 32.7987 31.1568 32.6461 31.3559 32.4525C31.555 32.2588 31.7139 32.0279 31.8237 31.7728C31.9335 31.5177 31.992 31.2434 31.9958 30.9657V5.9699C31.992 5.6922 31.9335 5.41797 31.8237 5.16287C31.7139 4.90777 31.555 4.6768 31.3559 4.48314C31.1568 4.28949 30.9216 4.13695 30.6635 4.03423C30.4055 3.93151 30.1298 3.88062 29.8521 3.88448ZM11.7979 28.297H7.4229V15.172H11.7979V28.297ZM9.6104 13.3345C9.00703 13.3345 8.42838 13.0948 8.00173 12.6681C7.57509 12.2415 7.3354 11.6628 7.3354 11.0595C7.3354 10.4561 7.57509 9.87746 8.00173 9.45081C8.42838 9.02417 9.00703 8.78448 9.6104 8.78448C9.93079 8.74815 10.2552 8.77989 10.5625 8.87764C10.8698 8.9754 11.1529 9.13695 11.3934 9.35172C11.6339 9.56649 11.8264 9.82964 11.9581 10.1239C12.0899 10.4182 12.158 10.737 12.158 11.0595C12.158 11.3819 12.0899 11.7007 11.9581 11.995C11.8264 12.2893 11.6339 12.5525 11.3934 12.7672C11.1529 12.982 10.8698 13.1436 10.5625 13.2413C10.2552 13.3391 9.93079 13.3708 9.6104 13.3345ZM27.5771 28.297H23.2021V21.2532C23.2021 19.4886 22.575 18.3366 20.9854 18.3366C20.4935 18.3402 20.0144 18.4945 19.6129 18.7787C19.2113 19.0629 18.9065 19.4634 18.7396 19.9261C18.6254 20.2689 18.576 20.6299 18.5937 20.9907V28.2824H14.2187V15.1574H18.5937V17.0095C18.9912 16.3198 19.5692 15.7517 20.2656 15.3662C20.962 14.9808 21.7504 14.7926 22.5458 14.822C25.4625 14.822 27.5771 16.7032 27.5771 20.7428V28.297Z"
                                                                className="fill-[#475569] group-hover:fill-[#E65F2B] transition-colors duration-300" />
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div className='group hover:text-[#E65F2B]'>
                                                    <a href="https://www.instagram.com/sumitkumar.451" target="_blank">
                                                        <svg width="35" height="35" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.37496 0.884277H21.625C26.2916 0.884277 30.0833 4.67594 30.0833 9.34261V21.5926C30.0833 23.8359 29.1922 25.9873 27.6059 27.5736C26.0197 29.1598 23.8683 30.0509 21.625 30.0509H9.37496C4.70829 30.0509 0.916626 26.2593 0.916626 21.5926V9.34261C0.916626 7.09932 1.80777 4.94791 3.39401 3.36167C4.98026 1.77542 7.13167 0.884277 9.37496 0.884277ZM9.08329 3.80094C7.69091 3.80094 6.35555 4.35407 5.37098 5.33863C4.38642 6.3232 3.83329 7.65856 3.83329 9.05094V21.8843C3.83329 24.7864 6.18121 27.1343 9.08329 27.1343H21.9166C23.309 27.1343 24.6444 26.5812 25.6289 25.5966C26.6135 24.612 27.1666 23.2767 27.1666 21.8843V9.05094C27.1666 6.14886 24.8187 3.80094 21.9166 3.80094H9.08329ZM23.1562 5.98844C23.6397 5.98844 24.1033 6.1805 24.4452 6.52236C24.7871 6.86423 24.9791 7.32789 24.9791 7.81136C24.9791 8.29483 24.7871 8.75849 24.4452 9.10036C24.1033 9.44222 23.6397 9.63428 23.1562 9.63428C22.6727 9.63428 22.2091 9.44222 21.8672 9.10036C21.5253 8.75849 21.3333 8.29483 21.3333 7.81136C21.3333 7.32789 21.5253 6.86423 21.8672 6.52236C22.2091 6.1805 22.6727 5.98844 23.1562 5.98844ZM15.5 8.17594C17.4338 8.17594 19.2885 8.94417 20.6559 10.3116C22.0234 11.6791 22.7916 13.5337 22.7916 15.4676C22.7916 17.4015 22.0234 19.2561 20.6559 20.6236C19.2885 21.9911 17.4338 22.7593 15.5 22.7593C13.5661 22.7593 11.7114 21.9911 10.344 20.6236C8.97652 19.2561 8.20829 17.4015 8.20829 15.4676C8.20829 13.5337 8.97652 11.6791 10.344 10.3116C11.7114 8.94417 13.5661 8.17594 15.5 8.17594ZM15.5 11.0926C14.3396 11.0926 13.2268 11.5535 12.4064 12.374C11.5859 13.1945 11.125 14.3073 11.125 15.4676C11.125 16.6279 11.5859 17.7407 12.4064 18.5612C13.2268 19.3817 14.3396 19.8426 15.5 19.8426C16.6603 19.8426 17.7731 19.3817 18.5936 18.5612C19.414 17.7407 19.875 16.6279 19.875 15.4676C19.875 14.3073 19.414 13.1945 18.5936 12.374C17.7731 11.5535 16.6603 11.0926 15.5 11.0926Z"
                                                                className="fill-[#475569] group-hover:fill-[#E65F2B] transition-colors duration-300" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Copyright Section */}
                            <div className='w-full flex flex-col md:flex-row justify-between items-start text-left gap-y-4 md:gap-y-0 py-6 text-sm md:text-base' >
                                <div className="text-center md:text-left">
                                    © 2025 Recrumeta. All rights reserved.
                                </div>
                                <div className='flex gap-x-4 md:gap-x-8' >
                                    <span onClick={naviToTerms} className='hover:text-[#E65F2B] cursor-pointer'>Terms & Conditions</span>
                                    <span onClick={naviToPrivacy} className='hover:text-[#E65F2B] cursor-pointer'>Privacy Policy</span>
                                    <span onClick={naviToContact} className='hover:text-[#E65F2B] cursor-pointer'>Contact Us</span>
                                </div>
                            </div>

                            {/* Confirm Dialogs */}
                            <ConfirmDialog
                                isOpen={showEmailDialog}
                                onClose={() => setShowEmailDialog(false)}
                                onConfirm={() => {
                                    window.open('mailto:team.recrumeta@gmail.com', '_blank');
                                    setShowEmailDialog(false);
                                }}
                                title="Send Email"
                                message="Would you like to send an email to team.recrumeta@gmail.com?"
                            />

                            <ConfirmDialog
                                isOpen={showPhoneDialog}
                                onClose={() => setShowPhoneDialog(false)}
                                onConfirm={() => {
                                    window.location.href = 'tel:+917070222841';
                                    setShowPhoneDialog(false);
                                }}
                                title="Make Phone Call"
                                message="Would you like to call +91-7070222841?"
                            />
                        </footer>
                    </div>

                </>
            )}

            {/* ViewDemo component */}
            {showDemo && (
                <ViewDemo
                    isOpen={showDemo}
                    onClose={() => setShowDemo(false)}
                    videoUrl={VIDEO_URL}
                />
            )}
        </div>
    );
}

export { NavigationLayout as LandingNavigationLayout };