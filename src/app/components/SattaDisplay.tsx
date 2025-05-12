'use client';
import { useEffect, useState } from "react";

const SattaDisplay = () => {
  const [number, setNumber] = useState<string | number>("wait");

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await fetch("/api/satta/today");
        const data = await response.json();

        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find the entry with today's date
        interface DailyValueEntry {
          date: string;
          value: string | number;
        }

        const todayEntry = data.dailyValuedata.find((entry: DailyValueEntry) => {
          const entryDate = new Date(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === today.getTime();
        });

        setNumber(todayEntry?.value ?? "wait");
        console.log("Fetched number:", todayEntry?.value ?? "wait");
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
    <div className="flex flex-col items-center justify-center bg-black "> 
      <h1 className="text-red-600 text-4xl font-bold mb-4">AJMERI GATE SATTA</h1>
      <div className="text-green-500 text-3xl font-bold animate-pulse">
        {number}
      </div>
    </div>
  );
};

export default SattaDisplay;
