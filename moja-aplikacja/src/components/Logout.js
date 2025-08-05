import React from 'react';

function Logout(props) {
    return (
        <div>
            <button                   className="text-[#8c56f4] font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-4" 
            onClick={()=>{localStorage.removeItem("userData");window.location.reload()}}>Wyloguj</button>
        </div>
    );
}

export default Logout;