'use client';
import React, { useState, useEffect, useCallback } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const AjmeriDynamicTable = () => {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [filteredData, setFilteredData] = useState<{ date: string; value: number }[]>([]);

  const handleGoClick = useCallback(async () => {
    if (!selectedMonth || !selectedYear) return;

    const monthIndex = months.indexOf(selectedMonth) + 1;
    const paddedMonth = monthIndex.toString().padStart(2, '0');

    try {
      const res = await fetch('/api/satta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: paddedMonth, year: selectedYear }),
      });

      const result = await res.json();
      setFilteredData(result.data || []);
    } catch (error) {
      console.error('Fetch failed:', error);
      setFilteredData([]);
    }
  }, [selectedMonth, selectedYear]); // Include dependencies

  useEffect(() => {
    handleGoClick();
  }, [handleGoClick]);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="flex gap-6 mb-6 justify-center items-center">
        <select
          className="p-3 bg-gray-800 text-white rounded-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          className="p-3 bg-gray-800 text-white rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2025">2025</option>
        </select>

        <button
          className="bg-red-600 px-8 py-3 rounded-md font-bold hover:bg-red-700"
          onClick={handleGoClick}
        >
          Go
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-white text-center">
          <thead>
            <tr className="bg-orange-600 text-black">
              <th className="border border-white p-2">Date</th>
              <th className="border border-white p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr key={index} className="bg-green-700 hover:bg-green-600">
                  <td className="border border-white p-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="border border-white p-2">{entry.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-gray-300">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AjmeriDynamicTable;
