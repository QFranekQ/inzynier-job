import React from 'react';
import axios from 'axios';

function SaveCards(props) {

    const handleSave = async () => {
        // You can add authentication logic here
        // if (username === 'yourusername' && password === 'yourpassword') {
        //     setAuthMessage('Login successful!');
        // } else {
        //     setAuthMessage('Login failed. Please check your credentials.');
        // }
        const {userid, data}=props;
        const url = `http://127.0.0.1:8000/save`;
    
        const Postdata = {
          userID: userid,
          dataCards: data,
        };
      
        try {
          const response = await axios.post(url, Postdata, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log(response.data);
    
        } catch (error) {
    
          console.error(error);
        }
      };
    

    return (
        <div>
            <button onClick={handleSave}>Save FishCards</button>

        </div>
    );
}

export default SaveCards;