import React, { useState, useEffect, useRef } from 'react';
import Register from './Register';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleLogin = async (usernamee, passwordd) => {
    // Your login logic here

    const url = `http://127.0.0.1:8000/login`;

    const data = {
      email: usernamee,
      password: passwordd,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // setAuthMessage('Login successful!' + JSON.stringify(response.data));
      localStorage.setItem('userData', JSON.stringify(response.data));
      window.location.reload()

    } catch (error) {
      setAuthMessage('Login failed. Please check your credentials.');

      console.error(error);
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      let path = `/translate`;
      navigate(path);
    }
  }, []);

  const handleRegister = () => {
    setIsLoginForm(false);
    setOpen(true);

  };

  const handleCancel = () => {
    setIsLoginForm(true);
    // setOpen(false); // Close the form by setting open to false

  };

  const loginFormRef = useRef(null);

  const closeOnOutsideClick = (e) => {
    if (loginFormRef.current && !loginFormRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', closeOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, [open]);

  return (
    <div className='flex items-center'>
      <button 
      className="text-[#8c56f4] py-2 px-4 rounded hover:bg-green-600 transition duration-300 float-right ml-4"
      onClick={handleOpen}>Zaloguj</button>
      {open ? (
        <div className='fixed inset-0 bg-black flex justify-center items-center  bg-opacity-20 backdrop-blur-sm'>
          {isLoginForm ? (
            <form ref={loginFormRef} className='bg-white p-6 rounded shadow-md w-96 '>
              <div className='text-gray-700 text-[24px]	 text-center	 font-bold mb-6'>Zaloguj się</div>
              <input
                className='mb-4 w-full border  text-gray-700 border-gray-300  p-2 rounded bg-slate-100	'
                placeholder='Nazwa'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className='mb-4 w-full border text-gray-700 border-gray-300 p-2 rounded bg-slate-100		'
                placeholder='Hasło'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='mb-4 text-center'>
                <button
                  className='bg-[#8c56f4] text-white p-2 rounded hover:bg-blue-600 transition duration-300 w-36'
                  type='button'
                  onClick={() => {handleLogin(username, password)}}
                >
                  Zaloguj
                </button>
              </div>
              {/* <div>
                <button
                  className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300'
                  type='button'
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div> */}
              <div className='block text-gray-700 text-sm text-center	 font-bold mb-2'>
                Nie masz konta? <a className='text-[#8c56f4]'href onClick={handleRegister}>Zarejestruj się!</a>
              </div>
              <div className='text-red-600 mt-4 text-center'>{authMessage}</div>

            </form>
          ) : (
            <Register onCancel={handleCancel} onCloseForm={() => setOpen(false)}/>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
