import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="max-w-md mx-auto p-8 mt-16">
      <div className="bg-white shadow-2xl rounded-lg p-8 border-2 border-stone-300">
        <h1 className="text-4xl font-bold text-stone-800 mb-6 text-center">Sign Up</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-yellow-900 hover:bg-yellow-800 text-white font-bold rounded-md transition">
            Create Account
          </button>
        </form>
        <p className="text-center mt-4 text-stone-600">
          Already have an account? <Link to="/login" className="text-amber-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
