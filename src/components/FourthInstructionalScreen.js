import React from "react";
import BeforeGameInstructionalPopup from "./BeforeGameInstructionalPopup";

function FourthInstructionalScreen() {
  return (
    <div className="first__screen_instruction_wrap fourth__screen_content">
      <div className="content__Box">
        <h3>Cómo resolver el problema</h3>
        <div className="instruction__sub_title">
          Ahora es el momento de averiguar cómo hacer que el líquido del vaso
          grande se vuelva rojo. Prueba a verter distintos líquidos de uno o
          varios de los vasos pequeños en el vaso grande. Puedes probar los
          líquidos de uno en uno y puedes probar combinaciones de líquidos.
        </div>
        <div className="instruction__body_copy">
          <div className="list__instruction_content">
            <p className="title__group">
              A continuación te explicamos cómo mezclar los líquidos:{" "}
            </p>
            <ul>
              <li>
                Haz clic en el vaso o vasos pequeños que quieras utilizar.
              </li>
              <li>
                Haz clic en el botón «Verter» para transferir el líquido al vaso
                grande.
              </li>
              <li>
                Si el líquido del vaso grande se vuelve rojo, ¡lo has hecho
                bien!
              </li>
              <li>
                Si el color no es rojo, haz clic en el botón «Vaciar» para
                vaciar el vaso de laboratorio y vuelve a intentarlo con el mismo
                líquido o con otros diferentes, de uno en uno o en combinaciones
                diferentes.
              </li>
            </ul>
            <p className="goodluck__content">
              Si la tarea te parece demasiado difícil, ¡no pasa nada! Puedes
              pulsar el botón «Abandonar». Pero asegúrate de intentarlo bien
              antes de hacerlo. <span>Que tengas suerte.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="img__box">
        <img src={`${process.env.PUBLIC_URL}/assets/flaskSet.png`} alt="" />
        <img src={`${process.env.PUBLIC_URL}/assets/fsBeaker.png`} alt="" />
      </div>
    </div>
  );
}

export default FourthInstructionalScreen;
