import React from 'react';
const fontstyle = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
`;


const services = [
  {
    title: 'Luxury Rooms',
    description: 'Spacious, elegant rooms with modern amenities and stunning views.',
    image: 'https://i.pinimg.com/736x/60/c7/dd/60c7dd409e670004c085b65f2a2b9e23.jpg',
  },
  {
    title: 'Spa & Wellness',
    description: 'Relax and rejuvenate with our world-class spa treatments.',
    image: 'https://i.pinimg.com/736x/c4/88/8e/c4888efb3fafc080d6fc3929dc54fcb7.jpg',
  },
  {
    title: 'Fine Dining',
    description: 'Indulge in gourmet cuisine prepared by top chefs in a luxurious setting.',
    image: 'https://i.pinimg.com/1200x/8f/96/26/8f962645e58502ea49191ee7277f2519.jpg',
  },
];

const ServiceCard = ({ title, description, image }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
    <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
    <h3 className="text-xl font-bold text-[#7c5e79] mb-2">{title}</h3>
    <p className="text-[#5a4a42]">{description}</p>
  </div>
);

function About() {
  return (
    <div className="bg-[#f9f5f9] font-montesserat text-[#5a4a42] font-[Montserrat] py-16 px-4 max-w-7xl mx-auto">
        <style>{fontstyle}</style>
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#7c5e79]">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          At Florence, we believe in offering our guests more than just a place to stay. Our commitment to elegance, comfort,
          and exceptional service makes every visit memorable.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-10 text-center text-[#7c5e79]">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
        
      </section>
       <footer className="text-center text-[#aa95a1] text-sm py-6 border-t border-[#e6d9ce]">
        &copy; 2025 Lavender Stay Hotels. All rights reserved.
      </footer>
    </div>
  );
}

export default About;
