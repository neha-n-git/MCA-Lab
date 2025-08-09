import { Link } from "react-router-dom";

export default function BranchCard({ id, name, location }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="text-gray-500">{location}</p>
      <Link to={`/branch/${id}`} className="mt-3 inline-block bg-purple-400 text-white px-4 py-2 rounded">
        View Nearby Attractions
      </Link>
    </div>
  );
}
