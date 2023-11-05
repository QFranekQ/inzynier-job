import React, { useState } from 'react';

function Tasks(props) {
  const data = localStorage.getItem('Cards');
  const cardsData = JSON.parse(data);
  const valuesArray = cardsData.values;

  const [curentID, setCurentID] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [options, setOptions] = useState([]);

  const filteredCard = valuesArray.find(card => card.id === curentID);

  const handleNext = () => {
    // Move to the next card and reset user input and options.
    setCurentID(prevID => (prevID < valuesArray.length ? prevID + 1 : prevID));
    setUserAnswer('');
    setOptions([]); // Clear options.
  }

  const handleGenerateOptions = () => {
    // Generate options for the current card.
    const correctOption = filteredCard.right;
    
    // Randomly select two wrong options from other cards' right inputs.
    const shuffledValues = valuesArray.slice(); // Clone the array.
    const currentIndex = shuffledValues.findIndex(card => card.id === curentID);
    shuffledValues.splice(currentIndex, 1); // Remove the current card from the list.

    const wrongOptions = shuffledValues
      .sort(() => 0.5 - Math.random()) // Shuffle the array.
      .slice(0, 2) // Take the first two cards from the shuffled array.
      .map(card => card.right);

    const allOptions = [correctOption, ...wrongOptions].sort(() => 0.5 - Math.random()); // Shuffle all options.
    setOptions(allOptions);
  }

  const handleSelectOption = (selectedOption) => {
    if (selectedOption === filteredCard.right) {
      setUserAnswer('Correct');
    } else {
      setUserAnswer('Wrong');
    }
  }

  return (
    <div>
      <h1>{cardsData.name}</h1>
      {filteredCard && (
        <div key={filteredCard.id}>
          <p>{filteredCard.left}</p>
          {options.length === 0 ? (
            <button onClick={handleGenerateOptions}>Generate Options</button>
          ) : (
            <div>
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </button>
              ))}
              <p>{userAnswer}</p>
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tasks;
