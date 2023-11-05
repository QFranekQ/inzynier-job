import React from 'react';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Header(props) {
  const data = localStorage.getItem('userData');
  const userData = JSON.parse(data);
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-blue-500 text-white p-4">
      <p className="text-lg">
        Witaj {data ? userData.login : ''}
      </p>
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
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          onClick={handleOpen}
        >
          User
        </button>
      ) : (
      <Login />
      )}
      {open ? (
        <ul className="menu mt-4">
          <li className="menu-item">
            <button
              className="text-blue-500 hover:text-blue-700"
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
        </ul>
      ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
    </div>
  );
}

export default Header;
