import React, { useState } from 'react';

function Tasks(props) {
  const data = localStorage.getItem('Cards');
  const cardsData = JSON.parse(data);
  const valuesArray = cardsData.values;

  const [pairs, setPairs] = useState([...valuesArray]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);
  const [disabledValues, setDisabledValues] = useState([]);

  const handleMatch = (pair,pairSide) => {
    if (selectedPair) {
      if (selectedPair.id === pair.id) {
        // If both pairs have the same values, they match and are removed
        const remainingPairs = pairs.filter((p) =>p.left !== pair.left || p.right !== pair.right);
        setPairs(remainingPairs);
        setSelectedPair(null);

        if (remainingPairs.length === 0) {
          setIsCorrect(true);
        }
      } else {
        // If they don't match, show "Wrong!" and reset the selectedPair
        alert('Wrong!');
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

  const isButtonDisabled = (value) =>
    disabledValues.includes(value);

  return (
    <div>
      <h1>{cardsData.name}</h1>
      {isCorrect ? (
        <p>Correct!</p>
      ) : (
        <div>
          <div className="pairs">
            {pairs.map((pair) => (
              <div key={pair.id}>
                <button
                  onClick={() => handleMatch(pair,pair.left)}
                  disabled={isButtonDisabled(pair.left)}
                >
                  {pair.left}
                </button>
                <button
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

export default Tasks;
