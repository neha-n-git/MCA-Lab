import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import RoomCard from '../components/RoomCard';
import axios from 'axios';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rooms');
        
        // Validate the response data
        if (response.data && Array.isArray(response.data)) {
          // Get first 3 available rooms
          const availableRooms = response.data
            .filter(room => room && room.available)
            .slice(0, 3);
          
          setFeaturedRooms(availableRooms);
          setError(null);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms. Please try again later.');
        // Set some fallback data for demonstration
        setFeaturedRooms([
          {
            id: 1,
            hotel: "Sample Hotel",
            city: "Sample City",
            roomType: "Standard",
            beds: 2,
            price: 99.99,
            available: true,
            amenities: ["WiFi", "TV"],
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <div>
      <header
        className="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center p-5 relative rounded-b-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://i.pinimg.com/736x/2b/0b/43/2b0b43fecd0efe7a803d4f5de10e4920.jpg')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Welcome to Florence</h1>
        <p className="text-lg md:text-xl mb-8 text-white">Where every stay feels like a dream</p>
        <Link 
            to="/booking" 
            className="bg-[#915a8b] hover:bg-[#684e64] text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Book Now
          </Link>
      </header>

      {/* Featured Hotels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Hotels</h2>
          
          {error && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading featured rooms...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map(room => (
                <RoomCard key={room.id || Math.random()} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;