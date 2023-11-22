import React, { useEffect, useState } from 'react';
import Tasks2 from './Tasks2';
import { render } from 'react-dom';
import Tasks from './Tasks';
import Tasks3 from './Tasks3';
import { ceil } from 'lodash';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";





function TasksSite() {
  
  const location = useLocation();
  const data1 = localStorage.getItem('userData');
  const userData = JSON.parse(data1);
  const today = new Date();
  console.log(today.getMonth() + 1,today.getDate(),today.getFullYear())
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const data = localStorage.getItem('Tasks');
  const tasksData = JSON.parse(data);
  const [arrayLength, setArrayLength] = useState(tasksData.length);
  const [arrayLengthMeasurment,setArrayLengthMeasurment]=useState(tasksData.length)
  const [indexOfArray, setindexOfArray] = useState(0);
  const [Score, setScore] = useState(0);
  const [Percantage, setPercantage] = useState('');
  const [CorrectAnswear, setCorrectAnswear]=useState('');
  const [isCompleted,setIsCompleted]=useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState('');
  console.log("id"+location.state)
  
  useEffect(() => {


  },[userAnswer])
  if (!tasksData) {
    return <div>No data in localStorage</div>;
  }

  const nextTask = () => {
    setindexOfArray(indexOfArray+1)
    if(userAnswer==="Correct"){
      tasksData[currentTaskIndex].status=true;
      // tasksData.splice(currentTaskIndex, 1);

      localStorage.setItem('Tasks', JSON.stringify(tasksData.filter((p) =>p.status ===false)));
      console.log("dlugosc"+localStorage.getItem('Tasks').length)
      if(localStorage.getItem('Tasks').length===2){
        handleStatistic(userData.id,`${month}/${date}/${year}`,location.state,Percantage,Score)  
          }
      setArrayLength(arrayLength-1)
    }
    setUserAnswer('');
    setIsCorrect('');
    if (currentTaskIndex >= arrayLength-2) {
      setCurrentTaskIndex(0);

    }
    else{
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
    if(indexOfArray===arrayLengthMeasurment-2){
      console.log(tasksData.length)
      console.log(arrayLengthMeasurment)
      console.log((ceil(tasksData.length*((tasksData.length/arrayLengthMeasurment)))))

      setPercantage(-(tasksData.length/arrayLengthMeasurment)+1)
      setScore(ceil(tasksData.length*(-(tasksData.length/arrayLengthMeasurment)+1)))
    }
    // console.log("indexy1:"+currentTaskIndex,tasksData.length)

  };
  const handleStatistic = async (userid, date,lastTask,LtScore,Uscore) => {
    // You can add authentication logic here
     
    const url = `http://127.0.0.1:8000/score`;

    const data = {
      uid: userid,
      CurentDate: date,
      lTask: lastTask,
      lScore:LtScore,
      userScore:Uscore,
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  // JSON.stringify(response.data)
    } catch (error) {

      console.error(error);
    }
  }

  
  const prevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };
  let dataFalseStatus=tasksData.filter((p) =>p.status ===false)


  const task = tasksData[currentTaskIndex];
  // console.log((tasksData.filter((p) =>p.status ===false)).length)
  const progressPercentage = (((arrayLengthMeasurment - arrayLength) / arrayLengthMeasurment) * 100);

  return (
    <div className="p-4 mt-10">
            <ProgressBar bgColor="#F48C56" margin="0 auto" width="70%" completed={progressPercentage} />

      {(tasksData.length > 0)?(
     <>
      {console.log("indexy2:"+currentTaskIndex,arrayLength)}
      {/* <h2 className="text-2xl font-semibold mb-4">Task {currentTaskIndex + 1}</h2>
      <p className="mb-2">Name: {task.name}</p> */}

      {(task.name === 'Task2' ) ? (
        <div>            
          {/* {console.log("task2"+task.valuess)} */}

          <Tasks2
            values={task.valuess}
            index={currentTaskIndex}
            onUserAnswerChange={setUserAnswer} // Pass the setUserAnswer function
            userAnswer={userAnswer}
            onUserGivingAnswear={setCorrectAnswear}
            CorrectAnswear={CorrectAnswear}
          />
        </div>
      ) : (null)}
      {(task.name === 'Task1') ? (
        <div>            
          {/* {console.log("task1"+task.valuess)} */}

          <Tasks
            values={task.valuess}
            index={currentTaskIndex}
            onUserAnswerChange={setUserAnswer} // Pass the setUserAnswer function
            userAnswer={userAnswer}
            onUserGivingAnswear={setCorrectAnswear}
            CorrectAnswear={CorrectAnswear}

          />
        </div>
      ) : (null)}
     {(task.name === 'Task3') ? (
        <div>
            {/* {console.log("task3"+currentTaskIndex)} */}
          <Tasks3
            values={task.valuess}
            index={currentTaskIndex}
            onUserAnswerChange={setUserAnswer} // Pass the setUserAnswer function
            userAnswer={userAnswer}
            onUserGivingAnswear={setCorrectAnswear}
            CorrectAnswear={CorrectAnswear}
          />
        </div>
      ) : (null)}
      {/* Render other components or content here. */}
    {/* {(task.name==='Task3')?(
        <Tasks3 />
      ):(null)} */}
    {(userAnswer!=='') &&(
      <div 
      className='fixed inset-0 bg-black flex flex-col justify-end items-center  bg-opacity-20 backdrop-blur-sm'
      >
        <div className='flex flex-col justify-center items-center h-32 w-[50%] border-gray-300 bg-slate-100 rounded-3xl mb-10'>
        <div
        className='flex flex-col justify-start items-start w-[90%]'
        >
        <h1 className={`${
                  userAnswer==='Correct' ? 'text-green-500	' : 'text-red-700	'
                } font-bold text-3xl`}>{userAnswer}</h1>
        <p className='text-xl mt-1'>{CorrectAnswear}</p>
        </div>
        {/* <button
          onClick={prevTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          disabled={currentTaskIndex === 0}
        >
          Previous Task
        </button> */}
        <div
        className='flex flex-col justify-start items-end w-[90%]'
        >
        <button
          onClick={nextTask}
          className="bg-[#F48C56] hover:bg-green-600  text-white font-bold py-2 px-4 rounded"
          // disabled={((tasksData.filter((p) =>p.status ===false)).length ===1)}
        >
          Next Task
        </button>
        </div>
        </div>
      </div>
     )}
      </>

      ):(<p>Congratulations!!</p>)}
    </div>
  );
}

export default TasksSite;
