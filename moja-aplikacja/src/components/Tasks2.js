import React, { useEffect, useState } from 'react';

function Tasks2(props) {
  const valuesArray = props.values;
  const index = props.index;

  const currentID = 0; // Start from the first element
  const [userAnswer, setUserAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const filteredCard = valuesArray[currentID];
  const data = localStorage.getItem('Tasks');
  const tasksData = JSON.parse(data);
  const handleGenerateOptions = () => {
    // Generate options for the current card.
    const correctOption = filteredCard.right;

    // Randomly select two wrong options from other cards' right inputs.
    const shuffledValues = valuesArray.slice(); // Clone the array.
    shuffledValues.splice(currentID, 1); // Remove the current card from the list.

    const wrongOptions = shuffledValues
      .sort(() => 0.5 - Math.random()) // Shuffle the array.
      .slice(0, 2) // Take the first two cards from the shuffled array.
      .map((card) => card.right);

    const allOptions = [correctOption, ...wrongOptions].sort(() => 0.5 - Math.random()); // Shuffle all options.
    setOptions(allOptions);
  }

  const handleSelectOption = (selectedOption) => {
    if (selectedOption === filteredCard.right) {
      setUserAnswer('Correct');
      props.onUserAnswerChange('Correct');
      props.onUserGivingAnswear('');

      tasksData[index].status=true;
      // localStorage.setItem('Tasks', JSON.stringify(tasksData.filter((p) =>p.status ===false)));
    } else {
      setUserAnswer('Wrong');
      props.onUserAnswerChange('Wrong');
      props.onUserGivingAnswear('Correct answear: '+(filteredCard.right));

    }
  }

  useEffect(() => {
    handleGenerateOptions();
    setUserAnswer('');
  }, [data]);

  return (
    <div
    className='flex flex-col justify-center items-center'

    >
      <h1
          className='font-bold text-4xl mt-20'

      >Chose right translation</h1>

      {filteredCard && (
        <div key={filteredCard.id} className='flex flex-col justify-center items-center text-3xl mt-20'>
          <p className=''>{filteredCard.left}</p>
          <div className='grid grid-cols-3 gap-20 text-xl'>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option)}
                className="border-2 border-[#F48C56] bg-white text-xl text-black py-2 px-4 rounded-xl hover:bg-green-600 transition duration-300  ml-10 mr-10 mt-10 h-12"

              >
                {option}
              </button>
            ))}
          </div>
          <div  className="flex justify-center items-center mt-10 text-xl font-bold">
          <button
            className="flex justify-center items-center bg-[#F48C56] shadow-2xl 	border-b-8 border-[#f48056] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13"
          onClick={()=>(props.onUserAnswerChange('Wrong'),props.onUserGivingAnswear('Correct answear: '+(filteredCard.right)))}>Pomiń</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks2;
