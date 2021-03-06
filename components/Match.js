import { stepMachine, Card } from "../data/Wwe_2021_02_21";
import { useState, useEffect } from "react";
import Image from 'next/image'
import { useMachine } from '@xstate/react';
import {Machine, interpret} from 'xstate';
import { useContext } from "react";
import { GameStateContext } from "../data/Context";

function Match() {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [optionChosen, setOptionChosen] = useState([]);
  const { prediction, setPrediction, gameState, setGameState } = 
  
  useContext(
  GameStateContext
  );
  
  const [state, send] = useMachine(stepMachine);
 
  // states: {
  //   one: {
  //     meta: {

  const cardi = stepMachine.states
  
  //runs every time the user variable is changed
  useEffect(() => {
    // setPrediction(currentPrediction => {return  currentPrediction.map((item, itemI) => {if (itemI == currentMatch) { return [...optionChosen]} 
    // return [...item]})
    //   })
    //{state.meta[`spookydev.${state.value}`].story}
      console.log(optionChosen)
      
      console.log(state.value)
      //console.log(stepMachine.transition('two', 'NEXT').value);

    }, [])

  
  useEffect(() => {
      if(prediction[currentMatch]){
        setOptionChosen(prediction[currentMatch])
      }
        console.log(optionChosen)
      }, [prediction])    

  const chooseOption = (option) => {
    setOptionChosen(option);
    
  };

  const nextMatch = () => {
    setPrediction(prediction => [...prediction, optionChosen]);
    setOptionChosen([]);
    console.log("impresion next match");
    console.log(prediction)
    setCurrentMatch(currentMatch + 1);
    send('NEXT');
  };

  const prevMatch = () => {
    setPrediction(currentPrediction => currentPrediction.map((item, itemI) => itemI ===currentMatch? optionChosen : item));
    setOptionChosen([]);
    setCurrentMatch(currentMatch - 1);
    send('JUMP')
  };

  const finishPrediction = () => {
    setPrediction(prediction => [...prediction, optionChosen]);
    
    setGameState("gimmick1");
  };

  
  
//   return (
//     <div className="match">
//       <h1>{Card[currentMatch].matchName}</h1>
//       <div className="match" >
//         {Card[currentMatch].contenders.map((contender, contenderI) => (
//             <div className={(optionChosen == contender.name)?"wrestler current":"wrestler"} key={contender.name} onClick={() => {chooseOption(contender.name)}}>
//             {contender.name}
//             <Image
//             src={`/images/${contender.name}.png`}
//             alt=""
//             width="100"
//             height="100"
//             />
//             </div>
//             )         
//             )}      
//       </div>
//       <h2>Match {currentMatch}</h2>
//       <button onClick={prevMatch} className="prevMatch">
//           Previous Match
//       </button>

//       {currentMatch == Card.length - 1 ? (
//         <button onClick={finishPrediction} className="nextMatch">
//           Finish Prediction
//         </button>
//       ) : (
//         <button onClick={nextMatch} className="nextMatch">
//           Next Match
//         </button>
//        )}

//     </div>
//   );
// }
const example = 'one';

return (
  <div className="match">
    <h1>{cardi[state.value].meta.matchName}</h1>
    
    <div className="match" >
      {Card[state.value].contenders.map((contender, contenderI) => (
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
    <h2>Match {state.value}</h2>
    <button onClick={prevMatch} className="prevMatch">
        Previous Match
    </button>

    {currentMatch == Card.length - 1 ? (
      <button onClick={finishPrediction} className="nextMatch">
        Finish Prediction
      </button>
    ) : (
      <button onClick={nextMatch} className="nextMatch">
        Next Match
      </button>
     )}

  </div>
);
}

export default Match;
