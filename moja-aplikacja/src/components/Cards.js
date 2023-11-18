import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeachSynth from './SpeachSynth';
import CardsShow from './CardsShow';
import { useNavigate } from "react-router-dom";
import ExportPDF from './ExportPDF';
import _debounce from 'lodash/debounce';

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
  };

  const handleInputChange = (id, side, value) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return {
          ...input,
          [side]: value,
        };
      }
      return input;
    });

    setInputs(updatedInputs);

    if (side === 'left' && value !== '') {
      debouncedTranslateText(id, value);
    }
  };

  const toggleInputList = () => {
    setShowInputList(!showInputList);
  };

  let navigate = useNavigate();

  const createCards = () => {
    const cardData = {
      name: CardsName,
      values: inputs,
    };
    localStorage.setItem('Cards', JSON.stringify(cardData));
    let path = `/cards`;
    navigate(path);
  };

  const translateText = async (id, text) => {
    const sourceLanguage = 'pl';
    const outputLanguage = 'en';
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?from=${sourceLanguage}&to=${outputLanguage}&api-version=3.0&profanityAction=NoAction&textType=plain`;
  
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '736d1f149cmshd12cf2eceb5ee96p184b4bjsn0117dfae2931',
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
        setInputs((prevInputs) => {
          return prevInputs.map((input) => {
            if (input.id === id) {
              return {
                ...input,
                right: data[0].translations[0].text,
              };
            }
            return input;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const debouncedTranslateText = _debounce(translateText, 500);

  return (
<div className=" p-8 max-w-3xl mx-auto flex flex-col justify-center items-center">
  <h1 className="text-3xl font-bold mb-4 text-center ">Create new fishcards!</h1>
  <input
    type="text"
    placeholder="Fishcards name"
    value={CardsName}
    onChange={handleNameChange}
    className="mb-4 p-2 border rounded  mr-4 "
  />
{/* mb-4 w-full border  text-gray-700 border-gray-300  p-2 rounded bg-slate-100	 */}
  {inputs.map((input) => (
    <div key={input.id} className="flex mb-4">
      <input
        type="text"
        placeholder="Type polish word"
        value={input.left}
        onChange={(e) => handleInputChange(input.id, 'left', e.target.value)}
        className="p-2 border rounded mr-4"
      />

      <input
        type="text"
        placeholder="English translation"
        value={input.right}
        readOnly
        className="p-2 border rounded mr-4"
      />

      <SpeachSynth text={input.right} />

      {/* Add Translate button if needed */}
      {/* <button
        onClick={() => debouncedTranslateText(input.id, input.left)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Translate
      </button> */}
    </div>
  ))}
  <div className=' flex justify-center items-center'>
  <button onClick={addInputPair} className="bg-[#71A9F7] text-white py-2 px-4 rounded mr-6 w-36">
    Add new
  </button>

  {/* <button onClick={toggleInputList} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
    {showInputList ? 'Hide Input List' : 'Show Input List'}
  </button> */}

  {showInputList && (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{CardsName}</h2>
      <ul>
        {inputs.map((input) => (
          <li key={input.id}>
            Left: {input.left}, Right: {input.right}
          </li>
        ))}
      </ul>
    </div>
  )}

  <button onClick={createCards} className="bg-[#71A9F7] text-white py-2 px-4 rounded mr-6 w-36">
    Create Cards
  </button>

  <button onClick={() => ExportPDF(CardsName, inputs)} className="bg-[#71A9F7] text-white py-2 px-4 rounded mr-6 w-36">
    ExportToPDF
  </button>
  </div>
</div>

  );
}

export default Cards;
