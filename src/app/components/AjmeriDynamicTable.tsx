'use client';
import React, { useState } from 'react';

const dummyData: Record<string, Record<string, string[]>> = {
  '2025': {
    January: ['32', '7', '65', '42', '55'],
    February: ['65', '70', '32', '85', '76'],
    March: ['53', '67', '50', '2', '73'],
    April: ['83', '45', '78', '29', '43'],
    May: ['87', '60', '54', '35', '87'],
  },
};

const months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const AjmeriDynamicTable = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const handleGoClick = () => {
    if (dummyData[selectedYear] && dummyData[selectedYear][selectedMonth]) {
      setFilteredData(dummyData[selectedYear][selectedMonth]);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className=" bg-black min-h-screen text-white">
   <div className="flex gap-6 mb-6 justify-center items-center">
  <select
    className="p-3 bg-gray-800 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
  >
    <option value="">Select Month</option>
    {months.map((month) => (
      <option key={month} value={month}>{month}</option>
    ))}
  </select>

  <select
    className="p-3 bg-gray-800 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
  >
    <option value="2025">2025</option>
  </select>

  <button
    className="bg-red-600 text-white px-8 py-3 rounded-md font-bold shadow-lg hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
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
              filteredData.map((value, index) => (
                <tr key={index} className="bg-green-700 hover:bg-green-600">
                  <td className="border border-white p-2">
                    {`${months.indexOf(selectedMonth) + 1}/${index + 1}/25`}
                  </td>
                  <td className="border border-white p-2">{value}</td>
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
