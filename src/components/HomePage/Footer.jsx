import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer({ openModal }) {

    const navLinks = [
        { name: "Our Mission", href: "#mission" },
        { name: "Education Programs", href: "#programs" },
        { name: "Annual Report", href: "#report" },
        { name: "Volunteer", href: "#volunteer" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
    ];

    return (
        <footer
            id="contact"
            className="text-gray-800"
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">

                {/* CTA Banner */}
                <div className="p-8 text-center text-gray-800 bg-teal-700 shadow-xl rounded-3xl sm:flex sm:justify-between sm:items-center sm:p-12">
                    <div className="sm:text-left">
                        <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Ready to make a difference?
                        </h3>
                        <p className="mt-3 text-lg font-light text-teal-100">
                            Your contribution directly impacts lives and futures.
                        </p>
                    </div>

                    <div className="flex justify-center mt-8 sm:mt-0 sm:ml-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openModal("Donate Now")}
                            className="px-8 py-4 text-lg font-bold text-teal-700 transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50"
                        >
                            Donate Securely{" "}
                            <Heart className="inline-block w-5 h-5 ml-2 fill-teal-700" />
                        </motion.button>
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-2 gap-12 pt-16 lg:gap-8 xl:col-span-2 md:grid-cols-4">

                    {/* Brand */}
                    <div className="col-span-2 space-y-4 md:col-span-1">
                        <h4 className="text-4xl font-extrabold text-teal-500">AL MUHMIN</h4>
                        <p className="text-sm font-light text-gray-800">
                            Faith in Action, Impacting Futures. Your trust, our mission.
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h5 className="pb-2 mb-6 text-sm font-semibold tracking-wider text-gray-800 uppercase border-b border-teal-600">
                            Quick Navigation
                        </h5>
                        <ul className="space-y-4" role="list">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-base text-gray-800 transition duration-150 hover:text-teal-400"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="pb-2 mb-6 text-sm font-semibold tracking-wider text-gray-800 uppercase border-b border-teal-600">
                            Get in Touch
                        </h5>

                        <ul className="space-y-4" role="list">
                            <li className="flex items-start">
                                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-teal-500" />
                                <address className="text-base not-italic text-gray-800">
                                    V Kalathur - 63, <br /> Tamil Nadu, India.
                                </address>
                            </li>

                            <li className="flex items-center">
                                <Mail className="flex-shrink-0 w-5 h-5 mr-3 text-teal-500" />
                                <button
                                    onClick={() => openModal("Contact Us")}
                                    className="text-base text-gray-800 transition duration-150 hover:text-teal-400"
                                >
                                    Contact Our Team
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h5 className="pb-2 mb-6 text-sm font-semibold tracking-wider text-gray-800 uppercase border-b border-teal-600">
                            Connect
                        </h5>

                        <div className="flex mt-4 space-x-6">
                            {socialLinks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    aria-label={item.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-800 transition duration-150 hover:text-teal-400"
                                >
                                    <item.icon className="w-7 h-7" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-12 border-t border-gray-800">
                    <p className="text-sm text-center text-gray-500">
                        © {new Date().getFullYear()} AL MUHMIN ISLAMIC TRUST. All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;