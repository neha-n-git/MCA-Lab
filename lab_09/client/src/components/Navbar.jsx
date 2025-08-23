import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/"><img className="w-50 h-20" src="./src/assets/logo.png" alt="Logo" />
</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-[#915a8b]">Home</Link>
          <Link to="/booking" className="text-gray-700 hover:text-[#915a8b]">Book Now</Link>
           <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

