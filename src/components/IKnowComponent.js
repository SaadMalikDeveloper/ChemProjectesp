import React, { useState } from "react";
import IncompleteFormData from "./IncompleteFormData";

const IKnowComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    textarea1: "",
    textarea2: "",
    textarea3: "",
    textarea4: "",
  });

  const validateInput = (value) => {
    return value.trim() === ""; // Return true if invalid (empty)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Hide popup on input change
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInvalid = [
      validateInput(formData.textarea1),
      validateInput(formData.textarea2),
      validateInput(formData.textarea3),
      validateInput(formData.textarea4),
    ].some((error) => error); // Check if any input is invalid

    if (isInvalid) {
      setShowPopup(true); // Show popup if there are errors
    } else {
      const participant_id = sessionStorage.getItem("participant_id");
      const SV_id = sessionStorage.getItem("SV_id");
      const successAttempts = sessionStorage.getItem("successAttempts");
      const failAttempts = sessionStorage.getItem("failAttempts");
      const userIP = sessionStorage.getItem("userIP");
      let flaskCombinationsPhaseF = sessionStorage.getItem(
        "flaskCombinationsPhaseF"
      );
      if (flaskCombinationsPhaseF) {
        flaskCombinationsPhaseF = JSON.parse(flaskCombinationsPhaseF);
      }
      let flaskCombinationsPhaseT = sessionStorage.getItem(
        "flaskCombinationsPhaseT"
      );
      if (flaskCombinationsPhaseT) {
        flaskCombinationsPhaseT = JSON.parse(flaskCombinationsPhaseT);
      }

      const payload = {
        participant_id,
        SV_id,
        attemptsgame: {
          id: Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0"),
          successAttempts,
          failAttempts,
        },
        answergame: {
          glass1: formData.textarea1,
          glass2: formData.textarea2,
          glass3: formData.textarea3,
          glass4: formData.textarea4,
        },
        flaskCombinationsPhaseF,
        flaskCombinationsPhaseT,
        userIP,
      };

      try {
        const response = await fetch(
          "https://chem-project-back-office-es.vercel.app/esp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result); // Handle success response
        setShowPopup(false); // Hide popup if form is valid

        // Reset form data if needed
        setFormData({
          textarea1: "",
          textarea2: "",
          textarea3: "",
          textarea4: "",
        });
        const redirectBack = `https://ucisocsci.az1.qualtrics.com/jfe/form/${SV_id}`;
        // const redirectBack = `https://google.com`;
        setTimeout(() => {
          window.location.href = redirectBack;
        }, 2000);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="form__page_wrapper iknow__component_wrap">
        <header>
          <h1>LOGO</h1>
        </header>
        <div className="first__screen_instruction_wrap">
          <div className="content__Box">
            <h3>Cuatro preguntas finales</h3>
            <div className="instruction__sub_title">
              Hay cuatro preguntas, cada una sobre una de las botellitas (G1,
              G2, G3, G4).
            </div>
          </div>
        </div>
        <div className="form__wrap_incom">
          <form>
            <div className="form__body">
              <div className="form__taxarea_box">
                <label>
                  Según lo que has visto, ¿qué hace el líquido de la botellita 1
                  sola o en interacción con los otros líquidos?.
                </label>
                <textarea
                  name="textarea1"
                  value={formData.textarea1}
                  onChange={handleChange}
                />
              </div>

              <div className="form__taxarea_box">
                <label>
                  Según lo que has visto, ¿qué hace el líquido de la botellita 2
                  sola o en interacción con los otros líquidos?
                </label>
                <textarea
                  name="textarea2"
                  value={formData.textarea2}
                  onChange={handleChange}
                />
              </div>

              <div className="form__taxarea_box">
                <label>
                  Según lo que has visto, ¿qué hace el líquido de la botellita 3
                  sola o en interacción con otros líquidos?
                </label>
                <textarea
                  name="textarea3"
                  value={formData.textarea3}
                  onChange={handleChange}
                />
              </div>

              <div className="form__taxarea_box">
                <label>
                  Basándote en lo que has visto, ¿qué hace el líquido de la
                  botellita 4 sola o en interacción con los otros líquidos?
                </label>
                <textarea
                  name="textarea4"
                  value={formData.textarea4}
                  onChange={handleChange}
                />
              </div>
            </div>

            <footer>
              <div className="left__footer_col">
                {/* <button className="back__btn_footer" onClick={handleBack}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/arrow.png`}
                    alt=""
                  />
                  Back
                </button> */}
              </div>
              <div className="right__footer_col">
                {/* <button
                  className="giveup_button_form_page"
                  onClick={handleBack}
                >
                  Give Up
                </button> */}
                <button className="next__btn_footer" onClick={handleSubmit}>
                  Entregar
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>
      {/* Show the popup if any field is invalid */}
      {showPopup && <IncompleteFormData setShowPopup={setShowPopup} />}
    </>
  );
};

export default IKnowComponent;
