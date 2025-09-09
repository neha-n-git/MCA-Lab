import React, { useEffect, useState } from "react";
import axios from "axios";
import DogCard from "../components/DogCard";
import Navbar from "../components/Navbar";

function Dogs({ onNavigate }) {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://dogapi.dog/api/v2/breeds")
      .then((res) => {
        setBreeds(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch dog breeds");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-600">Dog Breeds</h1>

        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            breeds.map((breed) => (
              <DogCard key={breed.id} breed={breed.attributes} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dogs;
