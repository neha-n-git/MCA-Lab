export default function ServiceCard({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
