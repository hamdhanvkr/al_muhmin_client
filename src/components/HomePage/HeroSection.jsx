import React from "react";
import { motion } from "framer-motion";

function HeroSection({ openModal }) {

    const impactStats = [
        { value: "450K+", label: "Lives Transformed" },
        { value: "$12.5M", label: "Funds Disbursed" },
        { value: "35+", label: "Education Programs" },
    ]

    return (
        <section
            id="hero"
            className="
                relative min-h-[90vh] flex flex-col justify-between 
                bg-white text-gray-900 overflow-hidden
                bg-[radial-gradient(#d1d5db_1px,transparent_1px)]
                [background-size:20px_20px]
            "
            aria-label="Hero section with mission statement and call to action"
        >

            <div className="z-10 flex items-center justify-center flex-grow px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >

                    {/* Tagline */}
                    <p className="inline-block px-3 py-1 text-sm font-semibold tracking-widest text-teal-600 uppercase rounded-full shadow-inner bg-teal-50 sm:text-base shadow-teal-300/40">
                        Serving Humanity Since 1998
                    </p>

                    {/* Headline */}
                    <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-6xl md:text-7xl">
                        Faith in <span className="text-teal-600">Action</span>,
                        Impacting <span className="text-teal-600">Futures</span>
                    </h2>

                    {/* Subheading */}
                    <p className="max-w-3xl mx-auto mt-6 text-lg font-light text-gray-600 sm:text-xl">
                        Al Muhmin Trust is dedicated to fostering global prosperity through sustainable charity, educational excellence, and community welfare programs, guided by strong ethical principles.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
                        {/* Primary CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openModal("Donate Now")}
                            className="px-8 py-3 text-lg font-bold text-white transition-all duration-300 bg-teal-600 rounded-full shadow-xl hover:bg-teal-700 shadow-teal-600/30 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                        >
                            Donate Now & Make an Impact
                        </motion.button>

                        {/* Secondary CTA */}
                        <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            href="#about"
                            className="px-8 py-3 text-lg font-semibold text-teal-600 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full hover:border-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                        >
                            Read Our Mission
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Impact Stats */}
            <div className="w-full py-6 bg-gray-100 border-t border-gray-200 shadow-inner sm:py-8">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-3"
                    >
                        {impactStats.map((stat, index) => (
                            <div key={index} className="p-3 text-center">
                                <p className="text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-teal-600 to-sky-500">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-base font-medium text-gray-500 sm:text-lg">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    )
}

export default HeroSection;