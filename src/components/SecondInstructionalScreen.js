import React from "react";

function SecondInstructionalScreen() {
  return (
    <div className="first__screen_instruction_wrap">
      <div className="content__Box">
        <h3>Resuelve el problema</h3>
        <div className="instruction__sub_title">
          Normalmente, cuando añades líquido al vaso de laboratorio, el líquido
          se vuelve de color <span className="color__skyBlue">azul claro.</span>
        </div>
      </div>
      <div className="img__box">
        <img
          className="light_blue_beaker_img"
          src={`${process.env.PUBLIC_URL}/assets/lightBlue.png`}
          alt=""
        />
      </div>
    </div>
  );
}

export default SecondInstructionalScreen;
