import { Card } from "../data/Nxt_2021_02_14";
import { useState } from "react";
import Image from 'next/image'

import { useContext } from "react";
import { GameStateContext } from "../data/Context";

function DependentMatch() {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [optionChosen, setOptionChosen] = useState([]);

  const { prediction, setPrediction, gameState, setGameState } = useContext(

    GameStateContext
  );
  

  const lastMatch = {
      matchName: "WWE",
      contenders:   [
                        {name: "Roman Reigns", status: "champion"}, 
                        {name: prediction[prediction.length-1][0].name, status: "challenger"}
                    ]
    }

  const chooseOption = (option) => {
    setOptionChosen(option);
    console.log("ya");
  };

  
  const finishPrediction = () => {
    setPrediction(prediction => [...prediction, optionChosen]);
    
    setGameState("finished");
  };


  return (
    <div className="match">
      <h1>{lastMatch.matchName}</h1>
      <div className="match">
        {lastMatch.contenders.map((contender, contenderI) => (
            <div className={(optionChosen == contender.name)?"wrestler current":"wrestler"} key={contender.name} onClick={() => {chooseOption(contender.name)}}>
            {contender.name}
            <Image
            src={`/images/${contender.name}.png`}
            alt=""
            width="100"
            height="100"
            />
            </div>
            )         
            )}      
      </div>
      
       
        <button onClick={finishPrediction} className="nextMatch">
          Finish Prediction
        </button>
     
       

    </div>
  );
}

export default DependentMatch;