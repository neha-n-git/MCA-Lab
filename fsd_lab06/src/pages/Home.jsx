import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const services = [
    { title: "Luxury Rooms", description: "Spacious and comfortable rooms with scenic views." },
    { title: "Fine Dining", description: "World-class cuisine from top chefs." },
    { title: "Spa & Wellness", description: "Relax with premium spa treatments." }
  ];

  return (
    <div>
      <Hero />
      <section className="p-20 bg-white rounded-lg shadow-md" >
          <h2 className="text-4xl font-bold text-purple-400 mb-4 align-middle text-center">Our Services</h2>
            <div className="p-8 grid md:grid-cols-3 gap-6">
                {services.map((s, idx) => (
                  <ServiceCard key={idx} {...s} />
                ))}
              </div>
      </section>
      
    </div>
  );
}
