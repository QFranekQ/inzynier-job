import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditCards(props) {
    const location = useLocation();
    const data = localStorage.getItem('Cards');
    const cardsData = JSON.parse(data);
    const valuesArray = cardsData.values;
    const [inputs, setInputs] = useState(valuesArray);
    let navigate = useNavigate();

    console.log(location.state)
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
      const handleEdit= async (id, Editdata) => {
        // You can add authentication logic here
        // if (username === 'yourusername' && password === 'yourpassword') {
        //     setAuthMessage('Login successful!');
        // } else {
        //     setAuthMessage('Login failed. Please check your credentials.');
        // }
    
        const url = `http://127.0.0.1:8000/update`;
    
        const data = {
            id: id,
            data: Editdata,
        };
      
        try {
          const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Edit successful!');
    
        } catch (error) {
            console.log('Failed!!!');
    
          console.error(error);
        }

      };
      const cardData = {
        name: cardsData.name,
        values: inputs,
      };
      localStorage.setItem('Cards', JSON.stringify(cardData));
    return (
        <div>
          <h1 className="mt-10 text-3xl font-bold text-center ">
            Edytuj swoje karty
          </h1>
        {inputs.map((input) => (
        <div key={input.id} className='flex flex-wrap justify-center items-center'>
          <input
            type="text"
            placeholder="Left Input"
            defaultValue={input.left}
            onChange={(e) => handleInputChange(input.id, 'left', e.target.value)}
            className='mr-60  mt-5 p-2 border rounded w-64'
            />

          {/* <button
            onClick={() => debouncedTranslateText(input.id, input.left)}
          >
            Translate
          </button> */}
          <input
            type="text"
            placeholder="Right Input"
            value={input.right}
            className='  mt-5 p-2 border rounded w-64'

            readOnly
          />
          {/* <SpeachSynth text={input.right} /> */}
        </div>
      ))}
      <div className='flex flex-wrap font-bold justify-center mt-5 items-center'>
        
        <button
              className="bg-[#71A9F7]  text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4 w-20"

         onClick={()=>{navigate('/profile');}}>Anuluj</button>
        <button
              className="bg-[#F48C56] text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4 w-20"

         onClick={()=>{handleEdit(location.state,JSON.stringify(cardData));navigate('/profile');}}>Edytuj</button>

<button
              className="bg-red-600	 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4 w-20"

         onClick={()=>{handleEdit(location.state,JSON.stringify(cardData));navigate('/profile');}}>Usuń</button>
      </div>
        </div>
    );
}

export default EditCards;