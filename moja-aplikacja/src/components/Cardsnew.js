import React, { useState, useEffect } from 'react';

const mystyle = {
  float: 'left',
  width: '50%',
};

function Cards() {
  const [inputs, setInputs] = useState([
    { id: 1, left: '', right: '' },
  ]);

  const addInputPair = () => {
    setInputs([
      ...inputs,
      {
        id: inputs.length + 1,
        left: '',
        right: '',
      },
    ]);
  };

  const handleInputChange = (id, side, value) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, [side]: value } : input
    );
    setInputs(updatedInputs);
  };

  useEffect(() => {
    // Function to handle translation
    const translateText = async (text, id) => {
      const outputFormat = 'en'; // Translate to English
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${outputFormat}&api-version=3.0&profanityAction=NoAction&textType=plain`;

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace with your actual API key
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
        },
        body: JSON.stringify([{ Text: text }]),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data[0] && data[0].translations && data[0].translations[0] && data[0].translations[0].text) {
          // Update the right input field with the translation
          handleInputChange(id, 'right', data[0].translations[0].text);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Listen for changes in the left input fields and trigger translation
    inputs.forEach((input) => {
      if (input.left !== '') {
        translateText(input.left, input.id);
      }
    });
  }, [inputs, handleInputChange]);

  return (
    <div>
      <h1>Input Form</h1>
      {inputs.map((input) => (
        <div key={input.id} style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Left Input"
            value={input.left}
            onChange={(e) => handleInputChange(input.id, 'left', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Right Input"
            value={input.right}
            readOnly
          />
        </div>
      ))}
      <button onClick={addInputPair}>Add</button>
    </div>
  );
}

export default Cards;
