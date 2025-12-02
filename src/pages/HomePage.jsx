import { useState } from "react";
import NavBar from "../components/HomePage/NavBar";
import HeroSection from "../components/HomePage/HeroSection";
import Footer from "../components/HomePage/Footer";
import LoginModal from "../components/HomePage/LoginModal";

function HomePage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    return (
        <div>
            <LoginModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <NavBar
                openModal={openModal}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            <HeroSection />
            <Footer openModal={openModal} />
        </div>
    )
}

export default HomePage;
