import React from 'react';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { motion,AnimatePresence } from "framer-motion"

function Header(props) {
  const data = localStorage.getItem('userData');
  const userData = JSON.parse(data);
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };
  const dropdownStyles = {
    transition: 'opacity 0.9s ease-in-out', // Adjust the duration and timing function as needed
    opacity: open ? 1 : 0,
  };
  return (
    // bg-blue-500
  <div className=" bg-[#8c56f4] font-bold text-black border-b-[3px] border-emerald-950 p-4 h-20 flex items-center justify-between w-full max-w-screen">
    
    
    <p className=" drop-shadow	 p-10 text-lg text-[#F48C56] font-bold">
      Foxint {data ? userData.login : ''}
    </p>
    <div className='flex items-center'>
    <button
      className=" text-black py-2 px-4 rounded hover:bg-green-600 transition duration-300 "
      onClick={() => {
        navigate('/translate');
      }}
    >
      Cards
    </button>

    {data ? (
      null
    ) : (
      <Login />
    )}

          {data && (
            <>
                <button
                  className="  py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4"
                  onClick={() => {
                    navigate('/learning');
                  }}
                >
                  Learning cards
                </button>

                <button
                  className="  py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4"
                  onClick={() => {
                    navigate('/ranking');
                  }}
                >
                  Ranking
                </button>
                <button
                  className="  py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4"
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Account
                </button>
                <Logout />
                </>
          )}
      </div>
    </div>

  );
}

export default Header;
