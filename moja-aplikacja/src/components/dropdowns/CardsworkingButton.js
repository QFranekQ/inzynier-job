import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeachSynth from '../SpeachSynth';
import CardsShow from '../CardsShow';
import { useNavigate } from "react-router-dom";
import ExportPDF from '../ExportPDF';

// import { Link } from "react-router-dom/cjs/react-router-dom.min"



const mystyle = {
  float: 'left',
  width: '50%',
};

function Cards() {
  const [CardsName, setCardsName] = useState('');

  const handleNameChange = (event) => {
    setCardsName(event.target.value);
  };

  const [inputs, setInputs] = useState([
    { id: 1, left: '', right: '' },
  ]);
  const [showInputList, setShowInputList] = useState(false);

  const addInputPair = () => {
    setInputs([
      ...inputs,
      {
        id: inputs.length + 1,
        left: '',
        right: '',
      },
    ]);
    // console.log(inputs)
    // console.log("Non-empty inputs:", inputs.filter(input => input.left && input.right));

  };

  const handleInputChange = (id, side, value) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, [side]: value } : input
    );

    setInputs(updatedInputs);
  };
  const toggleInputList = () => {
    setShowInputList(!showInputList);
  };
  // const createCards= () =>{
  //   inputs.filter(input => input.left && input.right)
  // }
  let navigate = useNavigate(); 
  const createCards = () =>{
    const cardData={
      name:CardsName,
      values:inputs,
    }
    localStorage.setItem('Cards', JSON.stringify(cardData));
    console.log(inputs)
    let path = `/cards`; 
    navigate(path);

  }
  // Function to handle translation
  const translateText = async (id, text) => {
    const sourceLanguage = 'pl'; // Translate from Polish
    const outputLanguage = 'en'; // Translate to English
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?from=${sourceLanguage}&to=${outputLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '736d1f149cmshd12cf2eceb5ee96p184b4bjsn0117dfae2931', // Replace with your actual API key
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
      },
      data: [
        {
          Text: text,
        },
      ],
    };

    try {
      const response = await axios.request(url, options);
      const data = response.data;

      if (data[0].translations[0].text) {
        // Update the right input field with the translation
        const updatedInputs = inputs.map((input) =>
          input.id === id ? { ...input, right: data[0].translations[0].text } : input
        );
        setInputs(updatedInputs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Input Form</h1>
      <input
            type="text"
            placeholder="Name"
            value={CardsName}
            onChange={handleNameChange}
            style={{ marginRight: '10px' }}
          />
      {inputs.map((input) => (
        <div key={input.id} style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Left Input"
            value={input.left}
            onChange={(e) => handleInputChange(input.id, 'left', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={() => translateText(input.id, input.left)}>Translate</button>
          <input
            type="text"
            placeholder="Right Input"
            value={input.right}
            readOnly
          />
           <SpeachSynth text={input.right} />

         
        </div>
      ))}
    <button onClick={addInputPair}>Add</button>
    <button onClick={toggleInputList}>
        {showInputList ? 'Hide Input List' : 'Show Input List'}
      </button>
      {showInputList && (
        <div>
          <h2>{CardsName}</h2>
          <ul>
            {inputs.map((input) => (
              <li key={input.id}>
                Left: {input.left}, Right: {input.right}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={createCards}>
        create cards
    </button>
    <button onClick={()=>ExportPDF(CardsName,inputs)}>
        ExportToPDF
    </button>
    {/* <CardsShow mapProp={inputs.filter(input => input.left && input.right)}/> */}

    </div>
  );
}


export default Cards;
