import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import SpeachSynth from './SpeachSynth';
import SaveCards from './SaveCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
            <h1 className='font-bold text-3xl mb-10'>{curentID} / {valuesArray.length}</h1>
            {filteredCards.map((cards) =>(
            <div key={cards.id}>
                <div
                className='flex '

                >
                <button
                className="bg-wghite text-white py-2  text-xl	 rounded-3xl	m-auto	 w-52 h-20"
                onClick={()=>setCurentID(curentID>1 ? curentID-1 : curentID)}><FontAwesomeIcon icon={faArrowLeft} className='text-5xl text-[#F48C56]'/></button>
                
                <button
                className="bg-[#8c56f4] font-bold text-[32px] text-white  rounded-lg  w-36  w-[32rem] h-[21rem]"
                onClick={hanndleLeft}>                
                <p>{isLeft ? cards.left : cards.right}              
                </p>
                </button>

                <div
                className='absolute mt-72 ml-[463px]'
                >
                {isLeft?null:<SpeachSynth text={cards.right} />}
                </div>
               
                <button
                className="bg-wghite text-white  text-xl	m-auto rounded-3xl  w-52 h-20"
                onClick={()=>setCurentID(curentID<valuesArray.length ? curentID+1:curentID)}><FontAwesomeIcon icon={faArrowRight} className='text-5xl text-[#F48C56]'/>
                </button>

                </div>

   
            </div>
            ))}
                  <SaveCards userid={userData.id} data={cardsData} />

        </div>
    );
}

export default CardsShow;