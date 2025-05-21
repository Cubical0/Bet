"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSuccess(false);

    if (input === "") {
      setValue("");
      setError("");
    } else if (/^[0-9]{1,2}$/.test(input)) {
      const num = parseInt(input, 10);
      if (num >= 0 && num <= 100) {
        setValue(input);
        setError("");
      } else {
        setError("Enter a number between 0 and 100");
      }
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value !== "" && !error) {
      setLoading(true);
      try {
        const response = await fetch("/api/satta/today", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ number: value }),
        });

        const result = await response.json();
        if (response.ok) {
          setSuccess(true);
        } else {
          setError(result.message || "An error occurred");
        }
      } catch (error) {
        console.error("API error:", error);
        setError("An error occurred while updating the value");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { name: "Dashboard", icon: HomeIcon, current: true },
    { name: "Analytics", icon: ChartBarIcon, current: false },
    { name: "Users", icon: UserGroupIcon, current: false },
    { name: "Settings", icon: CogIcon, current: false },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-10">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>

            <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    item.current
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    Administrator
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <ArrowRightOnRectangleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64">
          <header className="bg-gray-800 shadow">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Stats cards */}
              {[
                { title: "Total Users", value: "1,234", color: "bg-blue-500" },
                {
                  title: "Active Sessions",
                  value: "56",
                  color: "bg-green-500",
                },
                { title: "Revenue", value: "0", color: "bg-purple-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className={`h-2 ${stat.color}`}></div>
                  <div className="p-5">
                    <h3 className="text-gray-400 text-sm font-medium">
                      {stat.title}
                    </h3>
                    <p className="text-white text-2xl font-semibold mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Update Settings
              </h3>

              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                  <label
                    htmlFor="score"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Number (00–100)
                  </label>
                  <input
                    id="score"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter a number (e.g., 01, 02, 03)"
                    className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-600 focus:ring-indigo-500"
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
                </div>

                <button
                  type="submit"
                  disabled={value === "" || !!error || loading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
