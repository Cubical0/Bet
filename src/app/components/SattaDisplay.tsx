'use client';
import { useEffect, useState } from "react";

const SattaDisplay = () => {
  const [number, setNumber] = useState<string | number>("wait");

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await fetch("/api/satta-number"); // Adjust the endpoint
        const data = await response.json();
        setNumber(data.number);
      } catch (error) {
        console.error("Error fetching number:", error);
        setNumber("wait");
      }
    };

    fetchNumber();
    const interval = setInterval(fetchNumber, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-black">
      <h1 className="text-red-600 text-4xl font-bold mb-4">AJMERI GATE SATTA</h1>
      <div className="text-green-500 text-3xl font-bold animate-pulse">
        {number}
      </div>
    </div>
  );
};

export default SattaDisplay;
