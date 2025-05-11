'use client';

import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function AdminDashboardPage() {
  const [value, setValue] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setSuccess(false);
    if (e.target.value === '') {
      setValue('');
      setError('');
    } else if (!Number.isNaN(num) && num >= 0 && num <= 100) {
      setValue(num);
      setError('');
    } else {
      setError('Enter a number between 0 and 100');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value !== '' && !error) {
      setSuccess(true);
      // You can integrate backend logic here
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold text-white mb-6 tracking-tight">Admin Input Panel</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="score" className="block text-sm text-neutral-300 mb-2">
            Number (0–100)
          </label>
          <input
            id="score"
            type="number"
            value={value}
            onChange={handleChange}
            min={0}
            max={100}
            placeholder="Enter a number"
            className={`w-full px-4 py-2 bg-white/5 text-white border rounded-lg placeholder-neutral-400 focus:outline-none focus:ring-2 transition ${
              error
                ? 'border-red-400 focus:ring-red-400'
                : 'border-white/20 focus:ring-blue-400'
            }`}
          />

          {error && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <ExclamationCircleIcon className="w-4 h-4" />
              {error}
            </p>
          )}

          {success && (
            <p className="mt-3 text-sm text-green-400 flex items-center gap-1">
              <CheckCircleIcon className="w-4 h-4" />
              Submitted successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={value === '' || !!error}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
