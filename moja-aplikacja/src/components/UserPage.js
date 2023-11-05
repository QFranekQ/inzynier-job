import React from 'react';
import LoadCards from './LoadCards';

function UserPage(props) {
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    return (
        <div>
        <ul className="menu">
          <li className="login">
            login:{userData.login}
          </li>
          <li className="password">
            haslo:{userData.password}

          </li>
          <li className="email">
            email:{userData.email}

          </li>
        </ul>
        <LoadCards userid={userData.id} data={userData.id} />

        </div>
    );
}

export default UserPage;