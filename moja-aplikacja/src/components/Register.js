import React, { useState } from 'react';
import axios from 'axios';


function Register({onCancel}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmpassword] = useState('');
  const [email, setEmail] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const handleRegister = async (usernamee, passwordd,emaill) => {
    // You can add authentication logic here
    if (password === Confirmpassword) {
        setAuthMessage('Login successful!');
     
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
  
      setAuthMessage('Login successful!' + JSON.stringify(response.data));
    } catch (error) {
      setAuthMessage('Login failed. Please check your credentials.');

      console.error(error);
    }
  }
    else {
      setAuthMessage('Login failed. Please check your credentials.');
  }
  };


  return (
    <div>
      <form>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}   
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Confirm password:</label>
        <input
          type="password"
          value={Confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={()=>handleRegister(username, password,email)}>
          Register
        </button>
        <br />
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <div>{authMessage}</div>

      </form>

    </div>
  );
}

export default Register;