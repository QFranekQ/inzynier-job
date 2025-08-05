import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JSON5 from 'json5';
import EditCards from './EditCards';
import ExportPDF from './ExportPDF';

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
    const tasks = ['Task1', 'Task2', 'Task3'];
    const result = [];
    const objTask={
      name:null,
      status:null,
      valuess:null
    }
    inputs.forEach((input) => {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      const randomTask = tasks[randomIndex];
      const fakeInputs=[...inputs.filter((x) => x !== input).sort(() => 0.5 - Math.random())];
      
      objTask.name = randomTask;
      objTask.status=false;
      objTask.valuess = [];
    
      if (randomTask === 'Task2') {
        objTask.valuess.push(input, fakeInputs.pop(), fakeInputs.pop());
      } else if (randomTask === 'Task3') {
        objTask.valuess.push(
          input,
          fakeInputs.pop(),
          fakeInputs.pop(),
          fakeInputs.pop(),
          fakeInputs.pop()
        );
      } else if (randomTask === 'Task1') {
        objTask.valuess.push(input);
      }
    result.push({ ...objTask }); 
  });
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
    className=' grid grid-cols-1 justify-center items-start w-[100%] h-80  overflow-auto '

    >

      {responseData.map((item, index) => (
        <div className="flex w-[100%] border-2  border-[#F48C56] bg-white	rounded-xl mt-5"> 
        <div className='flex ml-10 font-bold text-xl justify-center items-center	'>
        {item.name}
        </div>
          {selectedItemIndex === index && (
        <div 
        onClick={()=> {setSelectedItemIndex(null)}}
        className='fixed inset-0 bg-black flex flex-col justify-center items-center  bg-opacity-20 backdrop-blur-sm'>
          <ul className='border-gray-300 bg-white rounded-3xl  w-[35%]'>
            <h2 className="text-xl font-bold mb-2 text-center">{item.name}</h2>

              {item.values.map((value, valueIndex) => (
                <li key={valueIndex} className={`flex justify-between border-t-2 border-black  items-center ${valueIndex%2==0 ? 'bg-slate-200' : 'bg-white'}`}>
                <div className='left-column w-[50%]'>
                  {value.left}
                  </div>
                  <div className='flex justify-start w-[50%]'>
                    {value.right}
                    </div> 
                </li>
              ))}

          </ul>
          </div>
      )}
          <div className='flex justify-end items-end w-[100%] h-14 text-lg'>
          <button
          className='   w-20 h-[100%] hover:bg-green-600 transition duration-300 font-bold '
          onClick={()=>toggleInputList(index)}>
            {selectedItemIndex === index  ? 'Lista' : 'Lista'}
          </button>

          <button
          className='  w-20 h-[100%] hover:bg-green-600 transition duration-300 font-bold '
          onClick={() =>createCards(item.name,item.values)}>Karty </button>
           <button
          className='   w-20 h-[100%] hover:bg-green-600 rounded-b transition duration-300 font-bold '
          onClick={()=>{createTasks(item.values);{navigate('/tasks',{state:responseID[index]})}}}>Zadania</button>
          
          <button
          className='  w-20 h-[100%] hover:bg-green-600 transition duration-300 font-bold '
          onClick={()=>editCards(responseID[index],item.name,item.values)}>Edytuj</button>

<button onClick={() => ExportPDF(item.name,item.values)} className=" w-20 h-[100%] hover:bg-green-600 transition duration-300 font-bold">
    Pobierz
  </button>
          </div>
          {/* {console.log(createTasks(item.values))} */}
          </div>
          ))}
      {/* {responseData[0].name} */}
    </div>
  );
}

export default LoadCards;