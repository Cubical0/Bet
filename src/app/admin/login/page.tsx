export default function AdminLoginPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h2>
          <form className="space-y-6">
            <div className="relative">
              <label htmlFor="username" className="absolute -top-3 left-4 px-2 bg-gray-800 text-sm text-gray-400">Username</label>
              <input type="text" id="username" className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your username" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="absolute -top-3 left-4 px-2 bg-gray-800 text-sm text-gray-400">Password</label>
              <input type="password" id="password" className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your password" />
            </div>
            <button type="submit" className="w-full py-3 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition duration-300 shadow-lg hover:shadow-xl">Login</button>
          </form>
        </div>
      </div>
    );
  }