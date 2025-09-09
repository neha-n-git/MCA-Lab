import React from "react";

function Navbar({ onNavigate }) {
  return (
    <nav className="bg-yellow-600 shadow-md rounded-b-lg p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          DogShelter.co
        </div>
        <button
          onClick={() => onNavigate("dogs")}
          className="px-4 py-2 bg-white text-yellow-600 font-bold rounded-md hover:bg-yellow-600 transition"
        >
          Explore
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
