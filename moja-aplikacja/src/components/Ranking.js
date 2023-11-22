import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import JSON5 from 'json5';
function Ranking(props) {
    const [responseData, setResponseData] = useState([]);
    const [responseID, setResponseID] = useState([]);
    

        const { userid, data } = props;
        const url = `http://127.0.0.1:8000/ranking`;
    
        const Postdata = {
        };
    
        const fetchData = async () => {
          try {
            const response = await axios.post(url, Postdata, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            // Convert the individual objects into an array
            // const dataArray = JSON.parse(response.data);
            // console.log(response.data.filter((_, index) => index % 2 !== 0) )
            console.log(response.data)
            setResponseData(response.data);


          } catch (error) {
            console.error(error);
          }
        };
        useEffect(() => { 
        fetchData(); // Call the fetchData function when the component mounts
      }, []);

      console.log(responseData)
    return (
        <div
        className=' mt-40 w-screen h-max bg-rounded  flex  justify-center'
        >    
        <div
                className='  w-11/12 rounded-xl pt-10 pb-10 h-max  bg-slate-100 flex  justify-center'
                >
        <table className=' w-10/12 '>
          
          <thead >
            <tr >
              <th >Position</th>
              <th >User Name</th>
              <th >User Points</th>

            </tr>
          </thead>
          <tbody >
          {responseData.map((user, index) => (

            <tr key={index} className=' text-center border border-black'>
              <td>{user[2]}</td>
              <td>{user[1]}</td>
              <td>{user[0]}</td>

            </tr>
            ))}

          </tbody>
      </table>            
      </div>  
                {/* <ul className='flex flex-col   w-9/12 bg'>
                <h2 className='font-bold text-3xl flex justify-center items-center'>Ranking</h2>

                  <li className='flex font-bold justify-between border border-black mt-10	'>
                    <span>Position</span>
                    <span className=' ml-5 '>User Name</span>
                    <span>User Points</span>
                  </li>
                    {responseData.map((user, index) => (
                    <li key={index} className='flex justify-between  border border-black'>
                        <span> {user[2]}</span>
                        <span > {user[1]}</span>
                        <span > {user[0]}</span>
                    </li>
                    ))}
                </ul> */}
        </div>
    );
}

export default Ranking;