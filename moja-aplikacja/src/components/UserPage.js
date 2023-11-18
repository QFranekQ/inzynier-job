import React from 'react';
import LoadCards from './LoadCards';

function UserPage(props) {
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    return (
        <div 
        className=' flex flex-col justify-center items-center '

        >


        <ul className="menu mt-20">
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
        <hr 
 style={{
  color: 'red',
  backgroundColor: 'red',
  height: 5,
  width: 100,
  borderColor : 'red'
}}
           />
        <LoadCards userid={userData.id} data={userData.id} />

        </div>
    );
}

export default UserPage;