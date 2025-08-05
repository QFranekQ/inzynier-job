import React, { useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';

function Tasks(props) {
  const data = localStorage.getItem('Tasks');
  const tasksData = JSON.parse(data);
  const valuesArray = props.values;
  const index = props.index;


  const [curentID, setCurentID] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState('');

  const filteredCard = valuesArray[curentID];

  const handleSubmit = () => {
    const similarity = stringSimilarity.compareTwoStrings(
      userAnswer.toLowerCase(),
      filteredCard.right.toLowerCase()
    );

    // You can adjust the threshold for similarity as needed (e.g., 0.8 for 80% similarity).
    const similarityThreshold = 0.7;

    if (similarity >= similarityThreshold) {
      props.onUserAnswerChange('Poprawnie');
      props.onUserGivingAnswear('');

      tasksData[index].status=true;
      // localStorage.setItem('Tasks', JSON.stringify(tasksData.filter((p) =>p.status ===false)));
    } else {
      props.onUserAnswerChange('Błąd');
      props.onUserGivingAnswear('Poprawna odpowiedź: '+(filteredCard.right));

    }
  }

  const handleNext = () => {
    setCurentID(prevID => (prevID < valuesArray.length ? prevID + 1 : prevID));
    setUserAnswer('');
    setIsCorrect('');
  }

  const handlePrev = () => {
    setCurentID(prevID => (prevID > 1 ? prevID - 1 : prevID));
    setUserAnswer('');
    setIsCorrect('');
  }
  useEffect(() => {
    setIsCorrect('');
    setUserAnswer('')
  },[valuesArray]);
  return (
    <div
    className='flex flex-col justify-center items-center'
    >
      <h1
          className='font-bold text-4xl mt-20'

      >Napisz tłumaczenie</h1>
      {filteredCard && (
        <div key={filteredCard.id} className='flex flex-col justify-center items-center text-3xl mt-20'>
          <p className='mb-4'>{filteredCard.left}</p>
          <div className='flex flex-col justify-center items-center '> 
          <input
            className='mb-4 w-full border  text-gray-700 border-gray-300  p-2 rounded bg-slate-100	'
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <div  className="grid grid-cols-2 gap-20 text-xl mt-10 text-xl font-bold">
          <button
            className="flex justify-center items-center bg-[#F48C56] shadow-2xl 	border-b-8 border-[#f48056] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13"
          onClick={()=>(props.onUserAnswerChange('błąd'),props.onUserGivingAnswear(""))}>Pomiń</button>
          <button
                        className="bg-[#F48C56] shadow-2xl 	border-b-8 border-[#f48056] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13"

          onClick={handleSubmit}>Zatwierdź</button>
                    </div>

          </div>
          {isCorrect}
          {/* <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button> */}
        </div>
      )}
    </div>
  );
}

export default Tasks;
