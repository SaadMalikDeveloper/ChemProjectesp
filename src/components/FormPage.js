import React, { useState } from "react";
import IKnowComponent from "./IKnowComponent";
import ChemMatchingGamePhaseT from "./ChemMatchingGamePhaseT";

const FormPage = () => {
  const [showIKnowComponent, setShowIKnowComponent] = useState(false);

  const handleBack = () => {
    window.location.href = "/";
  };

  const handleIKnowClick = () => {
    setShowIKnowComponent(true);
  };

  if (showIKnowComponent) {
    return <IKnowComponent />;
  }
  return (
    <>
      <div className="form__page_wrapper">
        <header>
          <h1>LOGO</h1>
        </header>
        <div className="first__screen_instruction_wrap">
          <div className="content__Box">
            <h3>¡La segunda {"(y última)"} parte del problema!</h3>
            <div className="instruction__sub_title">
              Ahora que ya sabes qué líquidos se combinan para formar el rojo,
              experimenta con los otros líquidos para ver qué efectos crean:
            </div>
            <ul className="form__page_content_list">
              <li>
                Mezcla diferentes combinaciones de líquidos vertiéndolos en el
                vaso de laboratorio.
              </li>
              <li>
                Cuando creas que entiendes lo que hace cada líquido y cómo
                interactúan los líquidos, haz clic en el botón «LO SÉ»
              </li>
            </ul>
          </div>
          <div className="img__box ChemMatchingGame">
            {/* <img src={`${process.env.PUBLIC_URL}/assets/flaskSet.png`} alt="" />
            <img src={`${process.env.PUBLIC_URL}/assets/fsBeaker.png`} alt="" /> */}
            <ChemMatchingGamePhaseT />
          </div>
        </div>
        <footer>
          <div className="left__footer_col">
            {/* <button className="back__btn_footer" onClick={handleBack}>
              <img src={`${process.env.PUBLIC_URL}/assets/arrow.png`} alt="" />
              Back
            </button> */}
          </div>
          <div className="right__footer_col">
            {/* <button className="giveup_button_form_page" onClick={handleBack}>
              Give Up
            </button> */}
            <button className="next__btn_footer" onClick={handleIKnowClick}>
              LO SÉ
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FormPage;
