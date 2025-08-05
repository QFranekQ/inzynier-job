import React, { useState, useEffect, useRef } from 'react';


function Tasks3(props) {
  const data = localStorage.getItem('Tasks');
  const tasksData = JSON.parse(data);
  const valuesArray = props.values;
  const index = props.index;

  // console.log(valuesArray)

  const [pairs, setPairs] = useState([...valuesArray]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);
  const [disabledValues, setDisabledValues] = useState([]);
  const randomTab=[0,1,2,3,4].sort(() => 0.5 - Math.random())
  const handleMatch = (pair,pairSide) => {
    if (selectedPair) {
       const valueToTest=valuesArray.filter((p)=>p.left === selectedPair.left);
      if ((selectedPair.left === valueToTest[0].left && pair.right === valueToTest[0].right) 
      || (pair.left === valueToTest[0].left && selectedPair.right === valueToTest[0].right)) {
        setDisabledValues([...disabledValues, pairSide]);
        const remainingPairs = pairs.filter((p) =>p.left !== pair.left || p.right !== pair.right);

        setSelectedPair(null);
        console.log(valuesArray.length,disabledValues.length)
        if (disabledValues.length===9) {
          props.onUserAnswerChange('Poprawnie');
          props.onUserGivingAnswear('');

          tasksData[index].status=true;
        }
      } else {
        props.onUserAnswerChange('Błąd');
        props.onUserGivingAnswear('Poprawna odpowiedź: '+(valueToTest[0].left)+' - '+(valueToTest[0].right));
        setSelectedPair(null);
        setDisabledValues([]);
      }
    } else {
      setSelectedPair(pair);
      setDisabledValues([...disabledValues, pairSide]);
    }
  };
  function shuffleRightValues(array) {
    const rightValues = array.map((item) => item.right);
    const shuffledRightValues = shuffleArray(rightValues);
  
    const shuffledArray = array.map((item, index) => ({
      ...item,
      right: shuffledRightValues[index],
    }));
  
    return shuffledArray;
  }
  
  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a shallow copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  

  const isButtonDisabled = (value) =>
    disabledValues.includes(value);
    useEffect(() => {
      setPairs(shuffleRightValues([...valuesArray]));
      setIsCorrect(false);
      setDisabledValues([])
    },[valuesArray]);
  return (
    <div
    className='flex flex-col justify-center items-center '
    >
      <h1
          className='font-bold text-4xl mt-20'
      >Dopasuj odpowiednie tłumaczenia</h1>
      {/* <h1>{cardsData.name}</h1> */}
      {isCorrect ? (
        <p>Correct!</p>
      ) : (
        
        <div>
          <div className="pairs ">
            {pairs.map((pair) => (
              <div 
              key={pair.id}
              className=' mt-10 grid grid-cols-2 gap-20 text-xl'

              >
                <button   className={`${
                  isButtonDisabled(pair.left) ? 'bg-gray-400 border-2 border-gray-400' : 'border-2 border-[#F48C56] bg-white]'
                }  text-black px-4 py-2 mr-2 rounded-xl font-bold	 hover:bg-green-600  transition duration-300  h-12`}
                  onClick={() => handleMatch(pair,pair.left)}
                  disabled={isButtonDisabled(pair.left)}
                >
                  {pair.left}
                </button>
                <button className={`${
                  isButtonDisabled(pair.right) ? 'bg-gray-400 border-2 border-gray-400'  : 'border-2 border-[#F48C56]'
                }  text-black px-4 py-2 rounded-xl font-bold	 hover:bg-green-600 transition duration-300   h-12`}
                  onClick={() => handleMatch(pair,pair.right)}
                  disabled={isButtonDisabled(pair.right)}
                >
                  {pair.right}
                </button>
              </div>
            ))}
          </div>
          <div  className="flex justify-center items-center mt-10 text-xl font-bold">
          <button
            className="flex justify-center items-center bg-[#F48C56] shadow-2xl 	border-b-8 border-[#f48056] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13"
          onClick={()=>(props.onUserAnswerChange('błąd'),props.onUserGivingAnswear(""))}>Pomiń</button>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Tasks3;