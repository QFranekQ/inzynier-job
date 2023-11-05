import React from 'react';

function Logout(props) {
    return (
        <div>
            <button onClick={()=>{localStorage.removeItem("userData");window.location.reload()}}>Logout</button>
        </div>
    );
}

export default Logout;