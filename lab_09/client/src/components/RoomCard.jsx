import { useState } from 'react';
import BookForm from './BookForm';

const RoomCard = ({ room }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!room) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <p className="text-red-500">Room data is missing</p>
        </div>
      </div>
    );
  }

  const amenities = room.amenities || [];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img 
          src={room.img} 
          alt={room.hotel} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400';
          }}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{room.hotel || 'Unknown Hotel'}</h3>
          <p className="text-gray-600 mb-2">{room.city || 'Unknown City'} • {room.roomType || 'Unknown Type'}</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-[#915a8b]">${room.price || '0'}</span>
            <span className="text-sm text-gray-500">per night</span>
          </div>
          <div className="flex items-center mb-3">
            <span className="text-sm text-gray-600">{room.beds || '0'} {room.beds > 1 ? 'beds' : 'bed'}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className={`text-sm ${room.available ? 'text-green-600' : 'text-red-600'}`}>
              {room.available ? 'Available' : 'Booked'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {amenities.length === 0 && (
              <span className="text-xs text-gray-500">No amenities listed</span>
            )}
          </div>
          {room.available ? (
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full bg-[#915a8b] text-white py-2 rounded-md font-semibold hover:bg-[#915a8b]"
            >
              Book Now
            </button>
          ) : (
            <button
              className="w-full bg-gray-300 text-gray-600 py-2 rounded-md font-semibold cursor-not-allowed"
              disabled
            >
              Not Available
            </button>
          )}
        </div>
      </div>

      {showBookingForm && (
        <BookForm 
          room={room} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </>
  );
};

export default RoomCard;