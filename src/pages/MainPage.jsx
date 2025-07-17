import React, { useEffect, useState } from 'react';
import Logo from '../assets/TRUST LOGO.jpeg'
import Img1 from '../assets/img6.jpg'
import Img2 from '../assets/img5.jpg'
import { useNavigate } from 'react-router-dom';

const images = [Img1, Img2];

function MainPage() {
    const [slideImage, setSlideImages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideImages((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handlenavigate = () => {
        navigate('/login');
    };
    return (
        <div className='min-h-screen w-full bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-100'>
            <div className='sticky top-0 flex'>
                <div className='h-24 bg-white shadow-xl w-[60%] flex gap-5 items-center'>
                    <img src={Logo} className='ml-5 w-20 h-20 object-fit' />
                    <h1 className='text-3xl font-bold text-gray-900'>Welcome to AL Muhmin Trust Portal</h1>
                </div>
                <div className='bg-white w-[40%] h-24 flex justify-end items-center gap-10'>
                    <a href='' className='font-bold text-lg hover:underline'>About</a>
                    <a href='' className='font-bold text-lg hover:underline'>Contact</a>
                    <a href='' className='font-bold text-lg hover:underline'>Services</a>
                    <button onClick={handlenavigate}
                        className='bg-blue-700 h-16 p-5 font-bold text-lg rounded-lg mr-5 hover:bg-blue-600 text-white cursor-pointer'>Donate</button>
                </div>
            </div>
            <div className='w-full h-[700px] overflow-hidden'>
                <img
                    src={images[slideImage]}
                    className='object-cover w-full h-[700px] transition-all duration-1000 ease-in-out'
                    alt='Slide'
                />
            </div>
        </div>
    );
}

export default MainPage;






















// import React, { useEffect, useState } from 'react';
// // import Logos from '../assets/TRUST LOGO.jpeg';
// import Img1 from '../assets/img1.jpg';
// import Img2 from '../assets/img2.jpg';
// import Img3 from '../assets/img3.jpg';
// import Img4 from '../assets/img4.jpg';
// import Img5 from '../assets/img5.jpg';
// import { useNavigate } from 'react-router-dom';

// const images = [Img1, Img2,Img3,Img4,Img5];

// function MainPage() {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImageIndex(prev => (prev + 1) % images.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     const handlenavigate = () => {
//         navigate('/login');
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 scroll-smooth">
//             {/* Header */}
//             <header className="sticky top-0 z-50 rounded-t-lg bg-amber-300 py-6 shadow-md flex justify-between items-center px-10">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     Welcome to Online Donor System
//                 </h1>
//                 <button
//                     className="bg-green-500 text-white rounded-lg font-bold text-xl px-6 py-2 hover:bg-green-600"
//                     onClick={handlenavigate}
//                 >
//                     Donate
//                 </button>
//             </header>

//             {/* Navigation */}
//             <nav className="sticky top-[92px] z-40 rounded-b-lg bg-cyan-500 text-white px-6 py-4 flex justify-center space-x-10 text-lg font-medium shadow">
//                 <a href="#about" className="hover:underline">About</a>
//                 <a href="#contact" className="hover:underline">Contact</a>
//             </nav>

//             {/* Image Slider */}
//             <div className="mt-6">
//                 <img
//                     src={images[currentImageIndex]}
//                     alt="Slider"
//                     className="w-full h-[560px] object-fit"
//                 />
//             </div>

//             {/* About Section */}
//             <section id="about" className="bg-white min-h-screen py-12 px-6 md:px-20">
//                 <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
//                 <p className="text-lg text-gray-700 leading-relaxed">
//                     Our Online Donor System helps connect generous donors with people in need.
//                     We aim to streamline the donation process and ensure transparency, trust, and accessibility.
//                     Whether you're contributing funds, food, or clothes, your support goes a long way in transforming lives.
//                 </p>
//             </section>

//             {/* Contact Section */}
//             <section id="contact" className="bg-gray-200 min-h-screen py-12 px-6 md:px-20">
//                 <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                     📧 Email: almuhmintrust@gmail.com
//                 </p>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                     📞 Phone: +91 9629601141
//                 </p>
//                 <p className="text-lg text-gray-700 leading-relaxed">
//                     📍 Address: Perambalur
//                 </p>
//             </section>
//         </div>
//     );
// }

// export default MainPage;
