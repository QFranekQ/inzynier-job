import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JSON5 from 'json5';
import EditCards from './EditCards';

function LoadCards(props) {
  const [responseData, setResponseData] = useState([]);
  const [responseID, setResponseID] = useState([]);
  const [inputsTasks, setInputsTasks] = useState([
    { id: 1, left: '', right: '' },
  ]);
  useEffect(() => {
    const { userid, data } = props;
    const url = `http://127.0.0.1:8000/load`;

    const Postdata = {
      userID: userid,
      dataCards: data,
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(url, Postdata, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Convert the individual objects into an array
        // const dataArray = JSON.parse(response.data);
        // console.log(response.data.filter((_, index) => index % 2 !== 0) )
        setResponseID(response.data.filter((_, index) => index % 2 === 0).map((str) => (str)))
        const objectData = response.data.filter((_, index) => index % 2 !== 0).map((str) => JSON5.parse(str));
        setResponseData(objectData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [props]); // Ensure useEffect runs when props change
  let navigate = useNavigate(); 
  const createCards = (CardsName,inputs) =>{
    const cardData={
      name:CardsName,
      values:inputs,
    }
    localStorage.setItem('Cards', JSON.stringify(cardData));
    let path = `/cards`; 
    navigate(path);

  }
  // console.log(responseData)
 
  let navigatee = useNavigate();
  const editCards = (id,CardsName,inputs) =>{
    const cardData={
      name:CardsName,
      values:inputs,
    }
    localStorage.setItem('Cards', JSON.stringify(cardData));
    
    let path = `/edit`;

    navigatee(path,{state:id});

  };
  const createTasks = (inputs) =>{
  //   const tasks=['Task1','Task2','Task3'];
  //   for(const x=0; x<(inputs.lenght)*2;x++){
  //     const randomIndex = Math.floor(Math.random() * tasks.length);
  //     let randomTask=tasks[randomIndex];


  // }
//   const tasks = ['Task1', 'Task2', 'Task3'];
//   const result = {};

//   tasks.forEach((task) => {
//     result[task] = [];

//     inputs.forEach((input) => {
//       const randomIndex = Math.floor(Math.random() * tasks.length);
//       const randomTask = tasks[randomIndex];
      
//       if (randomTask === task || (task === 'Task2' && result[task].length < 3) || (task === 'Task3' && result[task].length < 5)) {
//         result[task].push(input);
//       }
//     });
//   });

//   return result;
// };
  const tasks = ['Task1', 'Task2', 'Task3'];
  const result = {};

  inputs.forEach((input) => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    
    if (!result[randomTask]) {
      result[randomTask] = [];
    }

    result[randomTask].push(input);
  });

  return result;
};
  return (
    
    <div>
      {responseData.map((item, index) => (
        <li key={index}>
          <strong>Name:</strong> {item.name}<br />
          <strong>Values:</strong>
          <ul>
            {item.values.map((value, valueIndex) => (
              <li key={valueIndex}>
                <strong>Left:</strong> {value.left}, <strong>Right:</strong> {value.right}
              </li>
            ))}

          </ul>
          <button onClick={() =>createCards(item.name,item.values)}>create cards </button>
          <button onClick={()=>editCards(responseID[index],item.name,item.values)}> edit button</button>
          <button>Make zadania :D</button>
          {console.log(createTasks(item.values))}
        </li>
      ))}
      {/* {responseData[0].name} */}
    </div>
  );
}

export default LoadCards;