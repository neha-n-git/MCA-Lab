import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="p-1 w-full rounded-md bg-transparent  md:flex md:flex-row md:justify-between items-center p-4 bg-white shadow">
        <div className="flex justify-between items-center md:justify-start w-full md:w-auto">
          <img className="w-25 h-20" src="./src/assets/logo.png" alt="Logo" />

          <button className="md:hidden text-3xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          > ☰</button>
        </div>

        <div
          className={`nav-col flex flex-col md:flex-row md:space-x-4 transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          } md:flex`}
        >
          <Link className="text-lg p-2" to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link className="text-lg p-2" to="/form" onClick={() => setIsOpen(false)}>Form</Link>
          <Link className="text-lg p-2" to="/about" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
