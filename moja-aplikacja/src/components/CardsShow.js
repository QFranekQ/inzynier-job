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
    return (
        <div>
            <h1>{cardsData.name}</h1>
            {filteredCards.map((cards) =>(
            <div key={cards.id}>
                <button onClick={hanndleLeft}>                
                <p>{isLeft ? cards.left : cards.right}</p>
                </button>
                {isLeft?null:<SpeachSynth text={cards.right} />}
                <button onClick={()=>setCurentID(curentID<valuesArray.length ? curentID+1:curentID)}></button>
                <button onClick={()=>setCurentID(curentID>1 ? curentID-1 : curentID)}></button>

   
            </div>
            ))}
                  <SaveCards userid={userData.id} data={cardsData} />

        </div>
    );
}

export default CardsShow;