import { useState } from "react";

import axiosInstance from "@/app/hooks/axiosInstance";

export default function ShowerThoughts() {
  const [thought, setThought] = useState<string>("Loading...");

  const fetchThought = async () => {
    const res = await axiosInstance.get("/thoughts?random=true");
    console.log(res?.data?.data);
    setThought(res.data?.data?.[0]?.text);
  };
  console.log("thought", thought);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">💭 Shower Thought</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-3/4 text-center">
        <p className="text-lg italic">{thought}</p>
      </div>
      <button
        onClick={fetchThought}
        className="mt-4 px-4 py-2 bg-blue-500 rounded-lg text-white"
      >
        Get Another Thought
      </button>
    </div>
  );
}
