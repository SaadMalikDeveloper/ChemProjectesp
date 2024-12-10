import React, { useState } from "react";
import ChemMatchingGame from "./ChemMatchingGame";

const GameScreenPlay = ({ setGameGlobalReset, gameGlobalReset }) => {
  return (
    <div className="first__screen_instruction_wrap">
      <div className="content__Box">
        <h3>¡El problema!</h3>
        <div className="instruction__sub_title">
          ¡Bueno! Comience a intentar hacer rojo haciendo clic en uno o más de
          los vasos y luego presionando el botón "Verter". Recuerda intentarlo
          nuevamente, primero debes hacer clic en el botón “Vaciar”
        </div>
      </div>
      <ChemMatchingGame
        setGameGlobalReset={setGameGlobalReset}
        gameGlobalReset={gameGlobalReset}
      />
    </div>
  );
};
export default GameScreenPlay;
