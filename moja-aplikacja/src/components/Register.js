import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


function Register({onCancel, onCloseForm}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmpassword] = useState('');
  const [email, setEmail] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const handleRegister = async (usernamee, passwordd,emaill) => {
    // You can add authentication logic here
    if (password === Confirmpassword) {
        setAuthMessage('Register successful!');
     
    const url = `http://127.0.0.1:8000/register`;

    const data = {
      username: usernamee,
      password: passwordd,
      email: emaill,
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  // JSON.stringify(response.data)
      setAuthMessage('Register successful!');
    } catch (error) {
      setAuthMessage('Register failed. Please check your credentials.');

      console.error(error);
    }
  }
    else {
      setAuthMessage('Register failed. Please check your credentials.');
  }
  };
  const registerFormRef = useRef(null);

  const closeOnOutsideClick = (e) => {
    if (registerFormRef.current && !registerFormRef.current.contains(e.target)) {
      onCancel();
      onCloseForm(); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeOnOutsideClick);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, []);

  return (
    <div>
      <form ref={registerFormRef} className="bg-white p-6 rounded shadow-md w-96">
  <div className='text-gray-700 text-[24px] text-center	 font-bold mb-6'>Create new profille</div>
    <input
      className='mb-2 w-full border  text-gray-700 border-gray-300  p-2 rounded-lg bg-slate-100	'
      placeholder='Username'
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  
    <input
      className='mb-2 w-full border  text-gray-700 border-gray-300  p-2 rounded-lg bg-slate-100	'
      placeholder='E-mail'
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  
    <input
      className='mb-2 w-full border  text-gray-700 border-gray-300  p-2 rounded-lg bg-slate-100	'
      placeholder='Password'
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  
    <input
      className='mb-4 w-full border  text-gray-700 border-gray-300  p-2 rounded-lg bg-slate-100	'
      placeholder='Confirm password'
      type="password"
      value={Confirmpassword}
      onChange={(e) => setConfirmpassword(e.target.value)}
    />
  
  <div className="mb-2 text-center">
    <button
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 w-36"
      type="button"
      onClick={() => handleRegister(username, password, email)}
    >
      Register
    </button>
  </div>
  
  {/* <div className="mb-4 text-center">
    <button
      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-300 w-36"
      type="button"
      onClick={onCancel}
    >
      Cancel
    </button>
  </div> */}
  
  <div className='block text-gray-700 text-sm text-center	 font-bold mb-2'>
                Already have account? <a className='text-blue-500'href onClick={onCancel}>Login!</a>
              </div>

  <div className="text-red-600 text-center">{authMessage}</div>
</form>
    </div>
  );
}

export default Register;