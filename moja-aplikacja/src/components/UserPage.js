import React, { useState, useEffect, useRef } from 'react';
import LoadCards from './LoadCards';
import axios from 'axios';
import { ceil } from 'lodash';

function UserPage(props) {
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    const [responseData, setResponseData] = useState([]);
    const [lastTask, setLastTask] = useState({});
    const [isTask, setisTask] = useState(true);
    const [isStat, setisStat] = useState(false);
    const [achivmentData,setAchivmentData]= useState([]);
    const [hover, setHover] = useState(null);

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
    const handleachivments = async (userId, passwordd) => {
      // Your login logic here
  
      const url = `http://127.0.0.1:8000/achivments`;
  
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
        setAchivmentData(objectData);
        // setLastTask(JSON.parse(objectData.lastTask)); // Parse the lastTask string
        // console.log(responseData)
        // console.log(objectData.position)
      } catch (error) {
        if (error){
          setAchivmentData(null);
        }
        console.error(error);
      }
    };
    useEffect(() => {
      handleLogin(userData.id, userData.password);
      handleachivments(userData.id, userData.password);
  }, []); 

    console.log(achivmentData)
    return (
        <div 
        className=' flex flex-col justify-center items-center '

        >

<div className='flex  w-[50%]'>
        <div className=' w-96 h-40 pt-5' >
        <h1 className='mt-10 font-bold text-3xl'></h1>
        <ul className="menu  border-black	 text-2xl p-2 rounded bg-slate-100 w-[100%] h-[100%]">
          <li className="login">
            <strong>Nazwa: </strong>{userData.login}
          </li>
          {/* <li className="password">
            haslo:{userData.password}

          </li> */}
          <li className="email">
          <strong>E-mail: </strong>{userData.email}

          </li>
          {achivmentData.map((item, index) => (
          <li className='float-left mt-4'>        
            <img className='object-contain h-14 '
      src={item[3]}

            
      alt="new"
      />

      </li>
      ))}
        </ul>
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

<div className='flex flex-col items-center mt-24  mr-3 border-2   bg-white	rounded-xl w-2/4'>
<div className='flex border-b-2 border-inherit h-14 w-[100%] items-center justify-center'>
<button onClick={()=>(setisTask(true),setisStat(false))} className=' font-bold text-3xl '>Zadania</button>
<button onClick={()=>(setisTask(false),setisStat(true))} className='ml-20 font-bold text-3xl '>Statystyki</button>
</div>

{responseData !== null && isStat ? (
        <ul className="flex flex-col items-center justify-center text-xl 	p-2  w-[100%] h-96">
   
          <li className="l">
          <strong>Ostatnia aktywność: </strong> {responseData.date}
          </li>

          <li className="p">
          <strong>Ostatnie zrobione zadanie: </strong>{lastTask.name}
          </li>
          <li className="p1">
          <strong>Jak poprawnie wykonane: </strong>{(responseData.lastTaskScore*100).toFixed(2)}%

          </li>
          <li className="e">
          <strong>Punkty użytkownika: </strong>{responseData.userScore}

          </li>
          <li className="e">
          <strong>Pozycja w rankingu: </strong>{responseData.position}

          </li>
        </ul>
        ):(

null

        )}
{isTask ? (

        <LoadCards userid={userData.id} data={userData.id} />
        ):(null)}
        </div>
        </div>
    );
}

export default UserPage;