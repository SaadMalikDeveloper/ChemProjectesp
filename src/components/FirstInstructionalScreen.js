import React from "react";

function FirstInstructionalScreen() {
  return (
    <div className="first__screen_instruction_wrap">
      <div className="content__Box">
        <h3>Solucione el problema!</h3>
        <div className="instruction__sub_title">
          Y ahora, algo completamente diferente. Aquí nos interesa saber cómo
          piensas en general. Así que nos gustaría que resolvieras un problema.
        </div>
        <div className="instruction__body_copy">
          Abajo puedes ver cuatro botellitas de líquido. Están numeradas como 1,
          2, 3 y 4. También hay un vaso de laboratorio grande. El vaso grande
          está lleno de una sustancia química.
        </div>
      </div>
      <div className="img__box">
        <img
          className="img_info_first"
          src={`${process.env.PUBLIC_URL}/assets/flaskSet.png`}
          alt=""
        />
        <img
          className="img_info_second"
          src={`${process.env.PUBLIC_URL}/assets/fsBeaker.png`}
          alt=""
        />
      </div>
    </div>
  );
}

export default FirstInstructionalScreen;
