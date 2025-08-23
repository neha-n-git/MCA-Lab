import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      room_type: booking.room_type,
      status: booking.status || 'pending'
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const updateBooking = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/admin/bookings/${id}`, editForm);
      alert('Booking updated successfully');
      setEditingId(null);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/admin/bookings/${id}`);
      alert('Booking deleted successfully');
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  if (loading) return <div className="text-center py-8">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-[#915a8b] text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-white mt-2">Manage all customer bookings</p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Room Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  {/* Name */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {editingId === booking.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      booking.name
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {editingId === booking.id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      booking.email
                    )}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {editingId === booking.id ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      booking.phone
                    )}
                  </td>

                  {/* Room Type */}
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {editingId === booking.id ? (
                      <select
                        value={editForm.room_type}
                        onChange={(e) => handleEditChange('room_type', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                      </select>
                    ) : (
                      booking.room_type
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 text-sm">
                    {editingId === booking.id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status || 'pending'}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-sm space-x-2">
                    {editingId === booking.id ? (
                      <>
                        <button
                          onClick={() => updateBooking(booking.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(booking)}
                          className="bg-[#915a8b] text-white px-3 py-1 rounded text-sm hover:bg-purple-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="text-center p-3 bg-white rounded shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;