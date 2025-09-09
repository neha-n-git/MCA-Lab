import React, { useState } from "react";
import Home from "./pages/Home";
import Dogs from "./pages/Dogs";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="min-h-screen bg-black font-sans">
      {currentPage === "home" ? (
        <Home onNavigate={handleNavigate} />
      ) : (
        <Dogs onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
