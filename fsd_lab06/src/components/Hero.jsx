export default function Hero() {
  return (
    <section
      className="relative bg-[url('./src/assets/image.png')] bg-cover bg-center text-white min-h-[80vh] flex items-center justify-center text-center"
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Florence</h1>
        <p className="text-xl">Luxury stays, unforgettable experiences.</p>
      </div>
    </section>
  );
}
