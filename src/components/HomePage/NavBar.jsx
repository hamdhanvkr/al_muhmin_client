import { Sun, Moon, Menu, X, Handshake, BookOpen, DollarSign } from "lucide-react";

export default function Navbar({ toggleTheme, isDarkMode, openModal, isMenuOpen, setIsMenuOpen }) {

    const navItems = [
        { label: "About Us", id: "about" },
        { label: "Programs", id: "programs" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <header className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src="/logo.png" className="w-10 h-10 rounded-full border-2 border-teal-600" />
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white uppercase">
                        AL MUHMIN TRUST
                    </h1>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a key={item.id}
                           href={`#${item.id}`}
                           className="text-slate-700 dark:text-slate-300 hover:text-teal-500 transition">
                            {item.label}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                        {isDarkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-teal-600" />}
                    </button>

                    {/* CTA */}
                    <button
                        onClick={() => openModal("Donate Now")}
                        className="px-5 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-full">
                        Donate Now
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={toggleTheme}>
                        {isDarkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-teal-600" />}
                    </button>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white dark:bg-slate-800 p-4 border-t border-slate-300 dark:border-slate-700">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <a key={item.id} href={`#${item.id}`} className="p-2 text-slate-700 dark:text-slate-300">
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => openModal("Donate Now")}
                        className="mt-3 w-full px-5 py-2 bg-teal-700 text-white rounded-full">
                        Donate Now
                    </button>
                </nav>
            )}
        </header>
    );
}
