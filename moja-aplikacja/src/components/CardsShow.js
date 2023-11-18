import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import SpeachSynth from './SpeachSynth';
import SaveCards from './SaveCards';

// {mapa.map(mapp => <div>{mapp.left}</div>)}</p>


function CardsShow(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = localStorage.getItem('Cards');
    const cardsData = JSON.parse(data);
    const valuesArray = cardsData.values;

    // console.log(cardsData)
    const mapa=props.mapProp
    const [isLeft, setLeft] = useState(true)
    const [curentID,setCurentID]=useState(1)

    const filteredCards = valuesArray.filter(cards => cards.id === curentID);
    // console.log(valuesArray.length)
    const hanndleLeft=()=>{
        setLeft(isLeft? false: true)
    } 
    console.log(cardsData)
    return (
        <div
        className='flex flex-col justify-center mt-20 items-center'

        >
            {/* <h1>{cardsData.name}</h1> */}
            {filteredCards.map((cards) =>(
            <div key={cards.id}>
                <div
                className='flex '

                >
                <button
                className="bg-[#71A9F7] font-bold text-[32px] text-white py-2 px-4 rounded-lg  w-36  mb-10 w-[32rem] h-[21rem]"

                onClick={hanndleLeft}>                
                <p>{isLeft ? cards.left : cards.right}              
                </p>

                </button>

                <div
                className='absolute mt-72 ml-[247px]'

                >
                {isLeft?null:<SpeachSynth text={cards.right} />}
                </div>


                </div>

                <div
                className='flex  justify-center items-center '

                >
                    <button
                className="bg-[#71A9F7] text-white py-2  text-xl	 rounded-3xl		 mr-6 w-52 h-20"
                onClick={()=>setCurentID(curentID>1 ? curentID-1 : curentID)}>Previous</button>
                <button
                className="bg-[#71A9F7] text-white py-2 px-4 text-xl	 rounded-3xl  w-52 h-20"
                onClick={()=>setCurentID(curentID<valuesArray.length ? curentID+1:curentID)}>Next</button>
                
                </div>
   
            </div>
            ))}
                  <SaveCards userid={userData.id} data={cardsData} />

        </div>
    );
}

export default CardsShow;