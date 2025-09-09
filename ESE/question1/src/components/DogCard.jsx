import React from "react";
function DogCard({ breed }) {
  const { name, description, life, male_weight, female_weight, hypoallergenic } =
    breed;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col text-center space-y-4 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600 text-sm italic">{description}</p>

      <div className="w-full flex justify-around text-gray-700 font-medium">
        <div>
          <span className="block text-lg font-bold">Lifespan</span>
          <span className="text-sm">
            {life?.min} - {life?.max} years
          </span>
        </div>
        <div>
          <span className="block text-lg font-bold">Male Wt.</span>
          <span className="text-sm">
            {male_weight?.min} - {male_weight?.max} kg
          </span>
        </div>
        <div>
          <span className="block text-lg font-bold">Female Wt.</span>
          <span className="text-sm">
            {female_weight?.min} - {female_weight?.max} kg
          </span>
        </div>
      </div>

      <div>
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${
            hypoallergenic
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {hypoallergenic ? "Hypoallergenic" : "Not Hypoallergenic"}
        </span>
      </div>
    </div>
  );
}

export default DogCard;
