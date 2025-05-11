'use client';
import { useEffect, useState } from "react";

interface SattaData {
  name: string;
  time: string;
  leftNumber: number | string;
  rightNumber: number | string;
}

const AjmeriSattaTable = () => {
  const [sattaData, setSattaData] = useState<SattaData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/satta-data");
        const data = await response.json();
        setSattaData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSattaData([
          {
            name: "SHIV SHAKTI",
            time: "01:15",
            leftNumber: 49,
            rightNumber: 16,
          },
        ]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex  bg-black">
      <div className="w-full  p-1 border-2 border-white">
        <div className="bg-gradient-to-r from-blue-900 via-green-500 to-blue-900 py-6 px-4 rounded">
          {sattaData.map((item, index) => (
            <div key={index} className="text-center">
              <h1 className="text-red-600 text-2xl font-bold mb-2">
                {item.name}
              </h1>
              <p className="text-black text-xl font-bold mb-4">
                ({item.time})
              </p>
              <div className="flex justify-center items-center gap-6 text-black text-2xl font-bold">
                <span>{item.leftNumber}</span>
                <span className="border-2 border-white px-2 py-1 rounded bg-white text-green-700">➡️</span>
                <span>{item.rightNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AjmeriSattaTable;
