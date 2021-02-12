import { Questions } from "../data/Nxt_2021_02_14";
import { useState } from "react";
import Image from 'next/image'

import { useContext } from "react";
import { GameStateContext } from "../data/Context";

function Match() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState([]);

  let { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );


  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    setScore(score += `, ${optionChosen}`);
    
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    setScore(score += `, ${optionChosen}`);
    
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{Questions[currentQuestion].prompt}</h1>
      <div >
        {Questions[currentQuestion].contenders.map((contender, contenderI) => (
            <div className='wrestler'>
            <button key={contender} onClick={() => {chooseOption(contender.challenger)}}>
            {contender.challenger}
            </button>
            <Image
            src={`/images/${contender.challenger}.png`}
            alt=""
            width="100"
            height="100"
            />
            </div>
            )         
            )}      
      </div>

      {currentQuestion == Questions.length - 1 ? (
        <button onClick={finishQuiz} className="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} className="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Match;