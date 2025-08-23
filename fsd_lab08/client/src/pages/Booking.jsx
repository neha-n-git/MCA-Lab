import { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import axios from 'axios';

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    roomType: '',
    beds: '',
    available: true
  });

  const fetchRooms = async (filters) => {
    setLoading(true);
    try {
      const params = { ...filters };
      const response = await axios.get('http://localhost:3001/api/rooms', { params });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(filters);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms(filters);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Available Rooms</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                type="text" 
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city" 
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select 
                name="roomType"
                value={filters.roomType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
              <select 
                name="beds"
                value={filters.beds}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Any</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3+ Beds</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button 
                type="submit"
                className="bg-[#915a8b] text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading available rooms...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
              {rooms.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No rooms found matching your criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;