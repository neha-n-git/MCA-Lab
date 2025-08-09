import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Branches from "./pages/Branches";
import BranchDetails from "./pages/BranchDetails";

export default function App() {
  return (
    <Router>
      <nav className="bg-white text-black p-4 flex gap-6 justify-between">
        <img className="flex flex-end w-25 h-10" src="./src/assets/logo.png" alt="" />
        <div className="p-4 flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/branches" className="hover:underline">Branches</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/branch/:id" element={<BranchDetails />} />
      </Routes>
    </Router>
  );
}
