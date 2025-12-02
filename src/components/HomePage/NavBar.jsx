import { Menu, X } from "lucide-react";

function NavBar({ openModal, isMenuOpen, setIsMenuOpen }) {

    const navItems = [
        { label: "About Us", id: "about" },
        { label: "Programs", id: "programs" },
        { label: "Contact", id: "contact" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavItemClick = () => { if (isMenuOpen) toggleMenu() }

    return (
        <header className="sticky top-0 z-50 border-b shadow-xl bg-slate-900/90 backdrop-blur-lg border-slate-800">
            <div className="flex items-center justify-between px-4 py-3 mx-auto sm:px-6 max-w-7xl">
                <a href="#" className="flex items-center gap-3 group focus:outline-none">
                    <div className="p-[3px] rounded-full bg-slate-800 shadow-inner shadow-teal-500/20">
                        <img
                            src="/logo.png"
                            alt="Al Muhmin Trust Logo"
                            className="object-cover w-10 h-10 border rounded-full border-slate-700"
                        />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-teal-400">
                        Al Muhmin Trust
                    </h1>
                </a>

                <nav className="items-center hidden gap-8 lg:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={handleNavItemClick}
                            className="relative text-base font-medium transition-all duration-300 text-slate-300 group hover:text-teal-400"
                        >
                            {item.label}
                            <span className="
                                absolute left-0 bottom-[-8px] h-[2px] w-0 
                                bg-teal-500 rounded-full transition-all duration-300
                                group-hover:w-full
                            "></span>
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setIsMenuOpen(false);
                            openModal();
                        }}
                        className="
                            hidden lg:inline-flex px-5 py-2.5 rounded-lg
                            text-white font-semibold text-sm tracking-wider
                            bg-teal-600 hover:bg-teal-500
                            shadow-lg shadow-teal-600/30
                            transform transition-all duration-300 
                            hover:scale-[1.03] hover:shadow-teal-600/50
                            focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900
                        "
                    >
                        Log In
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-2 transition-colors rounded-lg text-slate-300 hover:text-teal-400 lg:hidden hover:bg-slate-800"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <nav className={`
                absolute top-[64px] left-0 w-full p-4 md:hidden
                bg-slate-900 border-t border-slate-800
                transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
            `}>
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={toggleMenu}
                            className="p-3 text-base font-medium transition-all duration-200 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-teal-400"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => {
                        openModal();
                        toggleMenu();
                    }}
                    className="w-full px-6 py-3 mt-4 text-base font-semibold text-white transition-all duration-300 bg-teal-600 rounded-lg shadow-lg hover:bg-teal-500 shadow-teal-600/30"
                >
                    Login
                </button>
            </nav>
        </header>
    );
}

export default NavBar;