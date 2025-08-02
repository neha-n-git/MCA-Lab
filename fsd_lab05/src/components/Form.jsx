import React, { useState } from 'react';

const fontstyle = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
`;

function Form() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roomType: '',
    time: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      time: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      roomType: '',
      time: '',
    });
    setIsSubmitted(false);
  };

  const radioOptions = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Evening', label: 'Evening' },
  ];

  return (
    <div className="font-montserrat">
      <style>{fontstyle}</style>
      <div className="bg-white p-8  transition-all duration-500 max-w-4xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-8 text-[#7c5e79]">Booking</h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name Input */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-[#5a4a42] text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#d9cfcf] rounded-lg bg-[#fffaf9] text-[#5a4a42] focus:outline-none focus:ring-2 focus:ring-[#bfa1bd] focus:border-[#bfa1bd] transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="block text-[#5a4a42] text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#d9cfcf] rounded-lg bg-[#fffaf9] text-[#5a4a42] focus:outline-none focus:ring-2 focus:ring-[#bfa1bd] focus:border-[#bfa1bd] transition-all"
              />
            </div>

            {/* Room Type Select */}
            <div className="relative">
              <label htmlFor="roomType" className="block text-[#5a4a42] text-sm font-semibold mb-2">Room Type</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#d9cfcf] rounded-lg bg-[#fffaf9] text-[#5a4a42] focus:outline-none focus:ring-2 focus:ring-[#bfa1bd] focus:border-[#bfa1bd] transition-all"
              >
                <option value="" disabled>Select a room type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>

            {/* Preferred Check-in Time (Radio buttons) */}
            <fieldset className="md:col-span-2">
              <legend className="block text-[#5a4a42] text-sm font-semibold mb-3">Preferred Check-in Time</legend>
              <div className="flex flex items-center justify-around flex-wrap gap-4">
                {radioOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-center px-6 py-3 border rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium
                      ${
                        formData.time === option.value
                          ? 'bg-purple-100 border-[#bfa1bd] text-[#7c5e79] shadow-md ring-2 ring-[#bfa1bd]'
                          : 'bg-[#f9f5f9] border-[#ddd0da] hover:bg-[#f4ebe9] hover:border-[#bfa1bd] text-[#5a4a42]'
                      }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={option.value}
                      checked={formData.time === option.value}
                      onChange={handleRadioChange}
                      className="hidden"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#7c5e79] text-white font-semibold py-3 rounded-lg hover:bg-[#684e64] focus:outline-none focus:ring-2 focus:ring-[#bfa1bd] focus:ring-offset-2 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation message after form submission */
          <div id="output" className="p-8 rounded-xl border border-[#e0d2cd] bg-[#fff9f8] text-[#5a4a42] shadow-md transition-all">
            <h2 className="text-2xl font-bold text-[#7c5e79] mb-4">Booking Confirmed!</h2>
            <p className="mb-2"><span className="font-semibold text-[#5a4a42]">Full Name:</span> {formData.fullName}</p>
            <p className="mb-2"><span className="font-semibold text-[#5a4a42]">Email:</span> {formData.email}</p>
            <p className="mb-2"><span className="font-semibold text-[#5a4a42]">Room Type:</span> {formData.roomType}</p>
            <p className="mb-4"><span className="font-semibold text-[#5a4a42]">Preferred Check-in:</span> {formData.time || 'Not selected'}</p>
            <button
              onClick={handleReset}
              className="bg-[#7c5e79] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#684e64] transition-all"
            >
              Make a New Booking
            </button>
          </div>
        )}
      </div>
       <footer className="text-center text-[#aa95a1] text-sm py-6 border-t border-[#e6d9ce]">
        &copy; 2025 Lavender Stay Hotels. All rights reserved.
      </footer>
    </div>
  );
}

export default Form;
