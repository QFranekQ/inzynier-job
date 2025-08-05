import React from 'react';

function MainPage(props) {
  return (
    <div className="bg-gradient-to-r w-[100%] h-[80%] flex flex-col justify-center items-center">
      <div className="flex flex-col  w-[50%]">
      <div className="text-black text-center text-4xl flex justify-center items-center font-bold mb-0">Witaj w <p className='text-[#F48C56] text-center'>&nbsp;Foxint</p></div>
      <div className="text-black text-center text-2xl font-bold mb-6">Aplikacji wspomagającej naukę języka angielskiego</div>

      <p className="text-black text-2xl mb-4 font-bold">Jak zacząć?</p>
      <p className="text-black text-lg mb-4">Rozpocznij naukę na naszej stronie w prosty i wygodny sposób. Kliknij poniższy przycisk lub wybierz zakładkę "Stwórz karty". 
      Następnie nadaj swoim kartom nazwę, 
      wprowadź polskie frazy, a nasza strona dokona automatycznego tłumaczenia. Na zakończenie, potwierdź swoje dane, i voilà – strona wygeneruje dla Ciebie karty.</p>
      <div className="flex justify-center items-center">
      <button className="flex justify-center items-center mb-8 bg-[#F48C56] shadow-2xl 	border-b-8 border-[#f48056] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13">
        Stwórz swoje karty
        </button>
        </div>
      <p className="text-black text-2xl mb-4 font-bold">A co w przypadku gdy nie znam podstaw?</p>

      <p className="text-black text-lg mb-4">Przemyśleliśmy to! Wystarczy przejść do zakładki „Nasze karty” lub kliknąć poniższy przycisk, gdzie znajdują się zestawy przygotowane do nauki od podstaw.</p>
      <div className="flex justify-center items-center">

      <button className="flex justify-center items-center mb-8 bg-[#8c56f4] shadow-2xl 	border-b-8 border-[#7056f4] text-white py-2 px-4 rounded hover:bg-green-600 hover:border-green-800 transition duration-300 w-60 h-13">
        Skorzystaj z naszych kart
        </button>
        </div>

      </div>
    </div>
  );
}

export default MainPage;
