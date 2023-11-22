import React from 'react';

function MainPage(props) {
  return (
    <div className="bg-gradient-to-r  w-140 h-full flex flex-col justify-center items-center">
      <div className="text-black text-4xl font-bold mb-6">Welcome to Foxint!</div>
      <p className="text-black text-lg mb-8">Start learning just by clicking the button</p>
      <div className="flex space-x-4">
        <button className="bg-[#71A9F7] hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300">
         Create your first fishcards
        </button>

      </div>
    </div>
  );
}

export default MainPage;
