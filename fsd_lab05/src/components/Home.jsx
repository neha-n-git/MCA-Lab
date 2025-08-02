import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
const fontstyle = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
`;


const roomData = [
  {
    title: "Deluxe Room",
    desc: "1 King Bed • 75m²",
    price: "Rs.2990/night",
    img: "https://i.pinimg.com/736x/60/c7/dd/60c7dd409e670004c085b65f2a2b9e23.jpg",
  },
  {
    title: "Double Suite",
    desc: "1 King Bed • 60m²",
    price: "Rs.1990/night",
    img: "https://i.pinimg.com/736x/04/fc/eb/04fceb65df1c019e9915df2f681b5989.jpg",
  },
  {
    title: "Superior Room",
    desc: "1 Queen Bed • 50m²",
    price: "Rs.1590/night",
    img: "https://i.pinimg.com/1200x/f1/ca/ab/f1caab3389c41075a7ef5fbee5e3e999.jpg",
  },
];

function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + roomData.length) % roomData.length);
  };
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % roomData.length);
  };

  return (
    <div className="bg-[#f9f5f9] font-montserrat text-[#5a4a42]">
            <style>{fontstyle}</style>

      {/* Hero/Header */}
      <header
        className="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center p-5 relative rounded-b-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://i.pinimg.com/736x/2b/0b/43/2b0b43fecd0efe7a803d4f5de10e4920.jpg')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Welcome to Florence</h1>
        <p className="text-lg md:text-xl mb-8 text-white">Where every stay feels like a dream</p>
        <Link to="/form">
          <button className="bg-[#915a8b] hover:bg-[#684e64] text-white font-semibold py-3 px-6 rounded-lg transition">
            Book Now
          </button>
        </Link>
      </header>

      {/* Info Bar */}
      <div className="flex flex-col md:flex-row text-center divide-y md:divide-y-0 md:divide-x divide-[#e6d9ce] bg-[#fff9f8] shadow-md">
        <div className="flex-1 p-5">
          <h4 className="font-bold text-lg text-[#7c5e79] mb-2">Phone</h4>
          <p>1234567890</p>
        </div>
        <div className="flex-1 p-5">
          <h4 className="font-bold text-lg text-[#7c5e79] mb-2">Location</h4>
          <p>Bangalore, India</p>
        </div>
        <div className="flex-1 p-5">
          <h4 className="font-bold text-lg text-[#7c5e79] mb-2">Check-In</h4>
          <p>From 1:00 PM</p>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-[#7c5e79]">Our Cozy Rooms</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={roomData[currentIndex].img}
              alt="carousel"
              className="w-full h-80 object-cover"
            />
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">
            <ChevronLeft className="text-[#7c5e79]" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">
            <ChevronRight className="text-[#7c5e79]" />
          </button>
          <div className="text-center mt-6">
            <button
              onClick={() => setSelectedRoom(roomData[currentIndex])}
              className="bg-[#7c5e79] hover:bg-[#684e64] text-white font-semibold py-2 px-4 rounded-lg"
            >
              View Details
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedRoom} onClose={() => setSelectedRoom(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold text-[#7c5e79]">{selectedRoom?.title}</Dialog.Title>
              <button onClick={() => setSelectedRoom(null)}><X /></button>
            </div>
            <img src={selectedRoom?.img} alt={selectedRoom?.title} className="w-full h-60 object-cover rounded" />
            <p className="mt-4 text-[#5a4a42]">{selectedRoom?.desc}</p>
            <p className="font-bold text-[#7c5e79] mt-2">{selectedRoom?.price}</p>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Stats & Footer */}
      <section className="py-16 text-center px-4 bg-[#fffaf9] border-t border-[#e6d9ce]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#7c5e79]">Your Luxury Escape Awaits</h3>
          <p className="mb-8 text-[#5a4a42]">
            Florence Hotel offers curated comfort and tranquility for a memorable stay.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-12 text-[#7c5e79] text-4xl font-bold">
            <div className="mb-6 md:mb-0">
              <p>150+</p>
              <p className="text-base text-[#5a4a42]">Elegant Rooms</p>
            </div>
            <div>
              <p>4.9</p>
              <p className="text-base text-[#5a4a42]">Guest Rating</p>
            </div>
          </div>
          <Link to="/about">
            <button className="mt-10 bg-[#7c5e79] hover:bg-[#684e64] text-white font-semibold py-3 px-6 rounded-lg transition">
              Explore More
            </button>
          </Link>
        </div>
      </section>

      <footer className="text-center text-[#aa95a1] text-sm py-6 border-t border-[#e6d9ce]">
        &copy; 2025 Lavender Stay Hotels. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
