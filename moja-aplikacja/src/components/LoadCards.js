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
 
  const editCards = (id,CardsName,inputs) =>{
    const cardData={
      name:CardsName,
      values:inputs,
    }
    localStorage.setItem('Cards', JSON.stringify(cardData));
    
    let path = `/edit`;

    navigate(path,{state:id});

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
  const result = [];
  let values=[]
  const objTask={
    name:null,
    status:null,
    valuess:null
  }
  inputs.forEach((input) => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    let fakeInputs=[...inputs.filter((x) => x !== input).sort(() => 0.5 - Math.random())];

    objTask.name = randomTask;
    objTask.status=false;
    objTask.valuess = [];
  
  
    if (randomTask === 'Task2') {
      objTask.valuess.push(input, fakeInputs.pop(), fakeInputs.pop());
      console.log(objTask.values);
    } else if (randomTask === 'Task3') {
      objTask.valuess.push(
        input,
        fakeInputs.pop(),
        fakeInputs.pop(),
        fakeInputs.pop(),
        fakeInputs.pop()
        
      );
      // objTask.status=true;

      console.log(objTask.values);
    } else if (randomTask === 'Task1') {
      objTask.valuess.push(input);
      // objTask.status=true;

    }
  
    result.push({ ...objTask }); // Push a copy of objTask
  
  });
  console.log(result)
  localStorage.setItem('Tasks', JSON.stringify(result));

  return result;
};
const [selectedItemIndex, setSelectedItemIndex] = useState(null);

const toggleInputList = (index) => {
  setSelectedItemIndex(index === selectedItemIndex ? null : index);
};
const [open, setOpen] = useState(null);

const handleOpen = (index) => {
  setOpen((index === selectedItemIndex ? null : index));
};
  return (

    <div
    className=' flex flex-wrap justify-center items-center w-4/12	'

    >

      {responseData.map((item, index) => (
        <ul className="menu "> 
                 <button
        className={`bg-green-500 truncate  text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4 mt-10 w-40 	`}
        onClick={()=>handleOpen(index)}
      >
        {item.name}
      </button>

          {selectedItemIndex === index && (
        <div 
        onClick={()=> {setSelectedItemIndex(null)}}
        className='fixed inset-0 bg-black flex flex-col justify-center items-center  bg-opacity-20 backdrop-blur-sm'>
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <ul>
            {item.values.map((value, valueIndex) => (
              <li key={valueIndex}>
                <strong>Left:</strong> {value.left}, <strong>Right:</strong> {value.right}
              </li>
            ))}

          </ul>
          </div>
      )}
      {open===index && (
        <div className='flex flex-col justify-center items-center ml-4'>
          <li className="menu-item">
          <button onClick={()=>toggleInputList(index)}>
            {selectedItemIndex === index  ? 'Hide Input List' : 'Show Input List'}
          </button>
          </li>
          <li className="menu-item">

          <button onClick={() =>createCards(item.name,item.values)}>create cards </button>
          </li>
          <li className="menu-item">
          <button onClick={()=>editCards(responseID[index],item.name,item.values)}> edit button</button>
          </li>

          <li className="menu-item">
          <button onClick={()=>{createTasks(item.values);{navigate('/tasks',{state:responseID[index]})}}}>Make zadania :D</button>
          </li>
          </div>
        )}
          {/* {console.log(createTasks(item.values))} */}
          </ul>      
          
          ))}
      {/* {responseData[0].name} */}
    </div>
  );
}

export default LoadCards;