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
       console.log(valueToTest)
       console.log(selectedPair.left , valueToTest[0].left , pair.right , valueToTest[0].right,pair.left , valueToTest[0].left ,selectedPair.right , valueToTest[0].right)
      if ((selectedPair.left === valueToTest[0].left && pair.right === valueToTest[0].right) || (pair.left === valueToTest[0].left && selectedPair.right === valueToTest[0].right)) {
        // If both pairs have the same values, they match and are removed
        console.log("jupi")
        setDisabledValues([...disabledValues, pairSide]);
        const remainingPairs = pairs.filter((p) =>p.left !== pair.left || p.right !== pair.right);

        // setPairs(remainingPairs);
        setSelectedPair(null);
        console.log(valuesArray.length,disabledValues.length)
        if (disabledValues.length===9) {
          setIsCorrect(true);
          props.onUserAnswerChange('Correct');
          tasksData[index].status=true;
          // localStorage.setItem('Tasks', JSON.stringify(tasksData.filter((p) =>p.status ===false)));
        }
      } else {
        // If they don't match, show "Wrong!" and reset the selectedPair
        alert('Wrong!');
        props.onUserAnswerChange('Wrong');

        setSelectedPair(null);
        setDisabledValues([]);
      }
    } else {
      // Set the selectedPair for matching
      setSelectedPair(pair);
      // Disable the left button of the clicked pair
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
    <div>
      {/* <h1>{cardsData.name}</h1> */}
      {isCorrect ? (
        <p>Correct!</p>
      ) : (
        
        <div>
          <div className="pairs">
            {pairs.map((pair) => (
              <div key={pair.id}>
                <button   className={`${
                  isButtonDisabled(pair.left) ? 'bg-gray-400' : 'bg-blue-500'
                } text-white px-4 py-2 mr-2`}
                  onClick={() => handleMatch(pair,pair.left)}
                  disabled={isButtonDisabled(pair.left)}
                >
                  {pair.left}
                </button>
                <button className={`${
                  isButtonDisabled(pair.right) ? 'bg-gray-400' : 'bg-blue-500'
                } text-white px-4 py-2`}
                  onClick={() => handleMatch(pair,pair.right)}
                  disabled={isButtonDisabled(pair.right)}
                >
                  {pair.right}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks3;