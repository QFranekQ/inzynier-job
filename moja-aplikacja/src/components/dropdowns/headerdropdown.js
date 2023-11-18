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
  <div className="bg-[#71A9F7] text-white p-4 h-20 flex items-center justify-between w-full max-w-screen">
    <p className=" drop-shadow	 p-10 text-lg text-[#F48C56] font-bold">
      Foxint {data ? userData.login : ''}
    </p>
    <div className='flex items-center'>
    <button
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      onClick={() => {
        navigate('/translate');
      }}
    >
      Cards!
    </button>
    {data ? (
      <button
        className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4`}
        onClick={handleOpen}
        // onMouseEnter={()=>setOpen(true)}
        // onMouseLeave={()=>setOpen(false)}
      >
        User
      </button>
    ) : (
      <Login />
    )}

<AnimatePresence>
          {open && (
            <motion.ul
              className="menu text-left absolute top-20 w-20 right-0 ml-30  bg-red-500 bg-opacity-50 shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <li className="menu-item">
                <button
                  className="text-green-500 hover:text-blue-700 "
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Accounts!
                </button>
              </li>
              <li className="menu-item">
                <Logout />
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>

  );
}

export default Header;
