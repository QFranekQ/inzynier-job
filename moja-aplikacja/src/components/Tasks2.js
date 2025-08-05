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
    const allOptions = valuesArray.map((card) => card.right).sort(() => 0.5 - Math.random()); 
    setOptions(allOptions);
  }

  const handleSelectOption = (selectedOption) => {
    if (selectedOption === filteredCard.right) {
      props.onUserAnswerChange('Poprawnie');
      props.onUserGivingAnswear('');
      tasksData[index].status=true;

    } else {
      props.onUserAnswerChange('Błąd');
      props.onUserGivingAnswear('Poprawna odpowiedź: '+(filteredCard.right));

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

      >Wybierz poprawne tłumaczenie</h1>

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
          onClick={()=>(props.onUserAnswerChange('Błąd'),props.onUserGivingAnswear('Poprawna odpowiedź: '+(filteredCard.right)))}>Pomiń</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks2;
