import { useState } from "react";
import Navbar from "../components/HomePage/NavBar";
import Hero from "../components//HomePage/Hero";
import Programs from "../components/HomePage/Program";
import Footer from "../components/HomePage/Footer";
import SimpleModal from "../components/HomePage/LoginModal";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const openModal = () => setIsModalOpen(true);

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <SimpleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Action Simulated"
                message="This action is simulated. It will redirect to the portal."
            />

            <Navbar
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
                openModal={openModal}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <Hero />
            <Programs />

            <Footer openModal={openModal} />
        </div>
    );
}
