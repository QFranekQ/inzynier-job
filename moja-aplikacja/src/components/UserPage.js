import React, { useState, useEffect, useRef } from 'react';
import LoadCards from './LoadCards';
import axios from 'axios';
import { ceil } from 'lodash';

function UserPage(props) {
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    const [responseData, setResponseData] = useState([]);
    const [lastTask, setLastTask] = useState({});


    const handleLogin = async (userId, passwordd) => {
      // Your login logic here
  
      const url = `http://127.0.0.1:8000/getScore`;
  
      const data = {
        id: userId,
        password: passwordd,
      };
  
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // setAuthMessage('Login successful!' + JSON.stringify(response.data));
        const objectData = (response.data);
        setResponseData(objectData);
        setLastTask(JSON.parse(objectData.lastTask)); // Parse the lastTask string
        // console.log(responseData)
        // console.log(objectData.position)
      } catch (error) {
        if (error){
        setResponseData(null);
        }
        console.error(error);
      }
    };
    useEffect(() => {
      handleLogin(userData.id, userData.password);
  }, []); 

    return (
        <div 
        className=' flex flex-col justify-center items-center '

        >

<div className='flex  justify-evenly '>
        <div className=' w-96 h-40 mr-20' >
        <h1 className='mt-10 font-bold text-3xl'>User data:</h1>
        <ul className="menu  border-black	 text-xl p-2 rounded bg-slate-100 w-[100%] h-[100%]">
          <li className="login">
            <strong>Login: </strong>{userData.login}
          </li>
          {/* <li className="password">
            haslo:{userData.password}

          </li> */}
          <li className="email">
          <strong>E-mail: </strong>{userData.email}

          </li>
        </ul>
        </div>
        <div className=' w-96 h-40'>
        <h1 className='mt-10 font-bold text-3xl '>User stitistics:</h1>
        {responseData !== null ? (
        <ul className="menu  text-xl border-black	p-2 rounded bg-slate-100 w-[100%] h-[100%]">
   
          <li className="l">
          <strong>Last activity: </strong> {responseData.date}
          </li>

          <li className="p">
          <strong>Last task name: </strong>{lastTask.name}
          </li>
          <li className="p1">
          <strong>Last task score: </strong>{(responseData.lastTaskScore*100).toFixed(2)}%

          </li>
          <li className="e">
          <strong>User score: </strong>{responseData.userScore}

          </li>
          <li className="e">
          <strong>Position in ranking: </strong>{responseData.position}

          </li>
        </ul>
        ):(

          <ul className="flex justify-center items-center text-center  text-xl border-black	p-2 rounded bg-slate-100 w-[100%] h-[100%]">
   
          <li className=" ">
          <strong className=''>Make first task before seeing account statistic </strong>
          </li>
          </ul>

        )}

        </div>

        </div>
        {/* <hr 
 style={{
  color: 'red',
  backgroundColor: 'red',
  height: 5,
  width: 100,
  borderColor : 'red'
}}
           /> */}

<div className='flex flex-col items-center mt-24 pb-20 mr-3 rounded bg-slate-100 w-2/4'>
<h1 className='mt-10 font-bold text-3xl '>User Tasks</h1>
        <LoadCards userid={userData.id} data={userData.id} />
        </div>
        </div>
    );
}

export default UserPage;