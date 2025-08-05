import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JSON5 from 'json5';
import ExportPDF from './ExportPDF';

function Learning(props) {
    const [responseData, setResponseData] = useState([]);
    const [responseID, setResponseID] = useState([]);
    const [responseUser,setResponseUser]=useState([]);
    const dataa = localStorage.getItem('userData');
    const userData = JSON.parse(dataa);

        const { userid, data } = props;
        const url = `http://127.0.0.1:8000/learning`;
    
        const Postdata = {
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
            // console.log(response.data)
            setResponseID(response.data.filter((_, index) => index % 3 === 0).map((str) => (str)))
            const objectData = response.data.filter((_, index) => (index - 1) % 3 === 0).map((str) => JSON5.parse(str));
            setResponseData(objectData);
            // console.log("id userow wykorzystujacych"+response.data.filter((_, index) => index % 1 === 0).map((str) => (str)))
            setResponseUser(response.data.filter((_, index) => (index - 2) % 3 === 0).map((str) => (str)));
          } catch (error) {
            console.error(error);
          }
        };
        useEffect(() => { 
        fetchData(); // Call the fetchData function when the component mounts
      }, []); // Ensure useEffect runs when props change
    
      // console.log(responseData)
      console.log(responseID)
      console.log(responseUser)

      const createTasks = (inputs) =>{
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
            // console.log(objTask.values);
          } else if (randomTask === 'Task3') {
            objTask.valuess.push(
              input,
              fakeInputs.pop(),
              fakeInputs.pop(),
              fakeInputs.pop(),
              fakeInputs.pop()
              
            );
            // objTask.status=true;
      
            // console.log(objTask.values);
          } else if (randomTask === 'Task1') {
            objTask.valuess.push(input);
            // objTask.status=true;
      
          }
        
          result.push({ ...objTask }); // Push a copy of objTask
        
        });
        // console.log(result)
        localStorage.setItem('Tasks', JSON.stringify(result));
      
        return result;
      };
      
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
      
      const [selectedItemIndex, setSelectedItemIndex] = useState(null);

      const toggleInputList = (index) => {
        setSelectedItemIndex(index === selectedItemIndex ? null : index);
      };
      const [open, setOpen] = useState(null);

      const handleOpen = (index) => {
        setOpen((index === selectedItemIndex ? null : index));
      };
      // className={`bg-[#71A9F7] truncate  text-white py-2 px-4 rounded-t hover:bg-green-600 transition duration-300 ml-4 mt-6 w-40 	h-12  ${responseUser[index]!==null && responseUser[index].includes(userData.id.toString()) ? 'bg-red-200' : ''}`}

    return (
      <div
      className=' justify-center items-center w-[60%] m-auto '
  
      >
            <h1 className=" mt-10 text-3xl font-bold mb-4 text-center ">
Nasze lekcje          </h1>
<div className=' grid grid-cols-1 justify-center items-center m-auto overflow-auto h-96'>
        {responseData.map((item, index) => (
          <div className={`flex w-[100%] border-2  border-[#F48C56] rounded-xl mt-5 ${responseUser[index]!==null && responseUser[index].includes(userData.id.toString()) ? 'bg-slate-400 border-slate-400' : ''}`}>
          <div className='flex ml-10 font-bold text-xl justify-start items-center	w-[60%]'>
          {item.name}
          </div>
            {selectedItemIndex === index && (
          <div 
          onClick={()=> {setSelectedItemIndex(null)}}
          className='fixed inset-0 bg-black flex flex-col justify-center items-center  bg-opacity-20 backdrop-blur-sm'>
            <ul className=' rounded-3xl bg-white w-[35%]'>
              <h2 className="text-xl font-bold mb-2 text-center ">{item.name}</h2>
  
              {item.values.map((value, valueIndex) => (
                <li key={valueIndex} className={`flex justify-between border-t-2 border-black items-center ${valueIndex%2==0 ? 'bg-slate-200' : 'bg-white'}`}>
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
            
  
  <button onClick={() => ExportPDF(item.name,item.values)} className=" w-20 h-[100%] hover:bg-green-600 transition duration-300 font-bold">
      Pobierz
    </button>
            </div>
            {/* {console.log(createTasks(item.values))} */}
            </div>
            ))}
        {/* {responseData[0].name} */}
        </div>
      </div>
    );
}

export default Learning;