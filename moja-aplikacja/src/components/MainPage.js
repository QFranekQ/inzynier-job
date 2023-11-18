import React from 'react';

function MainPage(props) {
  return (
    <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 mt-40 w-140 h-full flex flex-col justify-center items-center">
      <div className="text-white text-4xl font-bold mb-6">Welcome to Our Website</div>
      <p className="text-white text-lg mb-8">Explore our amazing services and products.</p>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300">
          Get Started
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default MainPage;
