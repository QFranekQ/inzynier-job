import React, { useState } from 'react';
import stringSimilarity from 'string-similarity';

function Tasks(props) {
  const data = localStorage.getItem('Cards');
  const cardsData = JSON.parse(data);
  const valuesArray = cardsData.values;

  const [curentID, setCurentID] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const filteredCard = valuesArray.find(card => card.id === curentID);

  const handleSubmit = () => {
    const similarity = stringSimilarity.compareTwoStrings(
      userAnswer.toLowerCase(),
      filteredCard.right.toLowerCase()
    );

    // You can adjust the threshold for similarity as needed (e.g., 0.8 for 80% similarity).
    const similarityThreshold = 0.7;

    if (similarity >= similarityThreshold) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  const handleNext = () => {
    setCurentID(prevID => (prevID < valuesArray.length ? prevID + 1 : prevID));
    setUserAnswer('');
    setIsCorrect(false);
  }

  const handlePrev = () => {
    setCurentID(prevID => (prevID > 1 ? prevID - 1 : prevID));
    setUserAnswer('');
    setIsCorrect(false);
  }

  return (
    <div>
      <h1>{cardsData.name}</h1>
      {filteredCard && (
        <div key={filteredCard.id}>
          <p>{filteredCard.left}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          {isCorrect && <p>Correct!</p>}
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Tasks;
