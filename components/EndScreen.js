import React from "react";
import { useContext } from "react";
import { GameStateContext } from "../data/Context";
import { Questions } from "../data/Nxt_2021_02_14";

const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );

  const restartQuiz = () => {
    setScore("");
    setGameState("menu");
  };
  return (
    <div className="EndScreen">
      <h1>Your predictions</h1>
      <h3>{userName}</h3>
      <h1>
        {score} 
      </h1>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;