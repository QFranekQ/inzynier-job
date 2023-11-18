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
      tasksData[index].status=true;
      // localStorage.setItem('Tasks', JSON.stringify(tasksData.filter((p) =>p.status ===false)));
    } else {
      setUserAnswer('Wrong');
      props.onUserAnswerChange('Wrong');
    }
  }

  useEffect(() => {
    handleGenerateOptions();
    setUserAnswer('');
  }, [data]);

  return (
    <div>
      {filteredCard && (
        <div key={filteredCard.id}>
          <p>{filteredCard.left}</p>
          <div>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p>{userAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default Tasks2;
