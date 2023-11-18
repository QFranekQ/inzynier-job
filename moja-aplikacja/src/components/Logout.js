import React from 'react';

function Logout(props) {
    return (
        <div>
            <button                   className=" text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4" 
            onClick={()=>{localStorage.removeItem("userData");window.location.reload()}}>Logout</button>
        </div>
    );
}

export default Logout;