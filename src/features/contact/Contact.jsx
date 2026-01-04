import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-stone-800 mb-8">Contact Us</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
            <textarea rows="5" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500"></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-yellow-900 hover:bg-yellow-800 text-white font-bold rounded-md transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
