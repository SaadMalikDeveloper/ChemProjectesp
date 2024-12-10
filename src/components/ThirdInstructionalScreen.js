import React from "react";

function ThirdInstructionalScreen() {
  return (
    <div className="first__screen_instruction_wrap">
      <div className="content__Box">
        <h3>Solucione el problema!</h3>
        <div className="instruction__sub_title">
          Sin embargo, cuando añades algunos líquidos o combinaciones de
          líquidos, el vaso se vuelve <span className="color__red">rojo</span>.
          Tu tarea en este experimento es intentar que se vuelva{" "}
          <span className="color__red">rojo</span>.
        </div>
      </div>
      <div className="img__box">
        <img
          className="red__third_beaker_img"
          src={`${process.env.PUBLIC_URL}/assets/redBeaker.png`}
          alt=""
        />
      </div>
    </div>
  );
}

export default ThirdInstructionalScreen;
