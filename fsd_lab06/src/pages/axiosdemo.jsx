import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BranchDetails() {
  const { id } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/destinations.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setDestinations(data[id] || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load destinations");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center p-6">Loading destinations...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {destinations.length > 0 ? (
        destinations.map((place, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{place.name}</h3>
              <p className="text-gray-600 text-sm">
                {place.city}, {place.state}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No destinations found.
        </p>
      )}
    </div>
  );
}

