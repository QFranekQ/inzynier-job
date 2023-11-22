import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JSON5 from 'json5';
function Learning(props) {
    const [responseData, setResponseData] = useState([]);
    const [responseID, setResponseID] = useState([]);
    

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
            console.log(response.data)
            setResponseID(response.data.filter((_, index) => index % 2 === 0).map((str) => (str)))
            const objectData = response.data.filter((_, index) => index % 2 !== 0).map((str) => JSON5.parse(str));
            setResponseData(objectData);


          } catch (error) {
            console.error(error);
          }
        };
        useEffect(() => { 
        fetchData(); // Call the fetchData function when the component mounts
      }, []); // Ensure useEffect runs when props change
    
      console.log(responseData)
      console.log(responseID)
      
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

    return (
        <div
        className=' flex flex-wrap justify-center items-start '

        >
             {responseData.map((item, index) => (
        <ul className="menu "> 
                 <button
        className={`bg-[#71A9F7] truncate  text-white py-2 px-4 rounded-t hover:bg-green-600 transition duration-300 ml-4 mt-6 w-40 	h-12`}
        onClick={()=>handleOpen(index)}
      >
        {item.name}
      </button>
      {selectedItemIndex === index && (
        <div 
        onClick={()=> {setSelectedItemIndex(null)}}
        className='fixed inset-0 bg-black flex flex-col justify-center items-center  bg-opacity-20 backdrop-blur-sm'>
          <ul className='border-gray-300 bg-slate-100 rounded-3xl  w-[35%]'>
            <h2 className="text-xl font-bold mb-2 text-center">{item.name}</h2>

            {item.values.map((value, valueIndex) => (
              <li key={valueIndex} className='flex justify-around items-center'>
              <div className='left-column'>
                {value.left}
                </div>
                <div className='flex justify-start'>
                  {value.right}
                  </div> 
              </li>
            ))}

          </ul>
          </div>
      )}
      {open===index && (
        <div className=' flex flex-col justify-center text-white  items-center ml-4 '>
          <li className="menu-item w-[100%] ">
          <button
          className='border-t-2 border-[#F48C56] bg-[#71A9F7] w-[100%] hover:bg-green-600 transition duration-300'
          onClick={()=>toggleInputList(index)}
          >
            {selectedItemIndex === index  ? 'Hide Input List' : 'Show Input List'}
          </button>
          </li>
          <li className="menu-item w-[100%]">

          <button
          className='border-t-2 border-[#F48C56] bg-[#71A9F7] w-[100%] hover:bg-green-600 transition duration-300'
          onClick={() =>createCards(item.name,item.values)}
          >create cards </button>
          </li>


          <li className="menu-item w-[100%] ">
          <button
          className='border-t-2 border-[#F48C56] bg-[#71A9F7] w-[100%] hover:bg-green-600 rounded-b transition duration-300'
          onClick={()=>{createTasks(item.values);{navigate('/tasks',{state:responseID[index]})}}}
          >create tasks</button>
          </li>
          </div>
        )}
          {/* {console.log(createTasks(item.values))} */}
          </ul>      
          
          ))}
        </div>
    );
}

export default Learning;