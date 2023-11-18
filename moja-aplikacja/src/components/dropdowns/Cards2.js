// Translation.js
import React, { useState } from 'react';
import axios from 'axios';

function Translation() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');

  const translateText = () => {
    const apiKey = '3c6ca0bc-f466-4884-b08d-8e688658dc1b'; // Replace with your Microsoft Translator API key

    const translateEndpoint = 'https://api.cognitive.microsofttranslator.com/translate';

    // Define the translation request payload
    const payload = [
      {
        text: inputText,
      },
    ];

    // Define the translation request parameters
    const params = {
      from: 'pl',  // Source language (e.g., Polish)
      to: 'en',   // Target language (e.g., English)
    };

    // Make a POST request to the translation endpoint
    axios
      .post('https://api.cognitive.microsofttranslator.com/',{
        params: {to: 'en', 'api-version': '3.0'},
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-ResourceId': '/subscriptions/3c6ca0bc-f466-4884-b08d-8e688658dc1b/resourceGroups/Praca_I/providers/Microsoft.CognitiveServices/accounts/Zut-region-21',
          'Ocp-Apim-Subscription-Region': 'westeurope',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const translatedText = response.data[0].translations[0].text;
        setTranslation(translatedText);
      })
      .catch((error) => {
        console.error(error);
        setTranslation('Translation error');
      });
  };

  return (
    <div>
      <h1>Translation</h1>
      <input
        type="text"
        placeholder="Type in Polish"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={translateText}>Translate</button>
      <div>
        <p>Translated to English:</p>
        <p>{translation}</p>
      </div>
    </div>
  );
}

export default Translation;
