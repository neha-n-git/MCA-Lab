import React from 'react';
import Navbar from '../components/Navbar';

function Home({ onNavigate }) {
    const handleExploreClick = (e) => {
        e.preventDefault();
        onNavigate('dogs');
    };

    return (
        <div
            className="min-h-screen font-sans bg-cover bg-no-repeat bg-center bg-black"
        >
            <Navbar onNavigate={onNavigate} />
            <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center">
                <main className="container mx-auto px-4 py-16 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
                        Welcome to the DogShelter.co
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fadeIn delay-200">Adopt a dog of any breed of your choice now!                    </p>
                    <a
                        href="#"
                        onClick={handleExploreClick}
                        className="inline-block px-8 py-3 text-lg font-bold bg-yellow-600 rounded-full shadow-lg hover:bg-yellow-700 transition-transform transform hover:scale-105"
                    >
                        Adopt Now!
                    </a>
                </main>
            </div>
        </div>
    );
}

export default Home;
