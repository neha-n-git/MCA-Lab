import { useState, useEffect } from "react";
import axios from "axios";
import BranchCard from "../components/BranchCard";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/branches.json") 
      .then(res => {
        setBranches(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch branches");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-6">Loading branches...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      {branches.map(branch => (
        <BranchCard key={branch.id} {...branch} />
      ))}
    </div>
  );
}
