import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-[#AEBDCA]">
      <button
        onClick={() => navigate("/question/1")}
        className="px-10 py-5 bg-[#7895B2] text-white rounded-md text-xl text-opacity-50"
      >
        Start vragenlijst
      </button>
    </div>
  );
}

export default App;
