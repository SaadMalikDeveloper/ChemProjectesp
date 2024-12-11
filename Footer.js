import React, { useEffect, useState } from "react";
import FailComponent from "./FailComponent";
import GiveupComponent from "./GiveupComponent";
import GiveupTryAgain from "./GiveupTryAgain";

const Footer = ({
  currentStep,
  setCurrentStep,
  totalSteps,
  setGameBegin,
  gameFooter,
  setHelpPop,
  setGameGlobalReset,
  gameGlobalReset,
}) => {
  const [giveupFooter, setGiveupFooter] = useState(false);
  const [gameResetGiveup, setGameResetGiveup] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [showText, setShowText] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isFirstClickPopup, setIsFirstClickPopup] = useState(true);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (gameResetGiveup) {
    window.location.reload();
  }
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setGameBegin(false);
    }
  };
  const handleBegin = () => {
    setGameBegin(true);
  };
  const handleAbsPath = () => {
    window.location.reload();
    setGameBegin(false);
  };
  const handleRefresh = async () => {
    // Set give up footer state
    setGiveupFooter(true);
    setShowText(true);
    setGameGlobalReset(false);

    // Fetch necessary data from sessionStorage
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
        successAttempts: successAttempts || 0, // Replace null with 0
        failAttempts: failAttempts || 0,
      },
      answergame: {
        glass1: "Give Up from first Phase", // Add defaults if needed
        glass2: "Give Up from first Phase",
        glass3: "Give Up from first Phase",
        glass4: "Give Up from first Phase",
      },
      flaskCombinationsPhaseF: flaskCombinationsPhaseF || [], // Ensure it's an array
      flaskCombinationsPhaseT: flaskCombinationsPhaseT || [],
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

      // Redirect after successful API call
      const redirectBack = `https://ucisocsci.az1.qualtrics.com/jfe/form/${SV_id}`;
      // const redirectBack = `https://google.com`;

      if (isFirstClick) {
        sessionStorage.setItem("hasClickedAbandon", "true");
        setIsFirstClick(false);
      } else {
        setIsFirstClickPopup(false);
        setTimeout(() => {
          window.location.href = redirectBack;
        }, 5000);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const helpPop = () => {
    setHelpPop(true);
    setGameGlobalReset(false);
  };

  return (
    <footer>
      <div className="left__footer_col">
        {/* {currentStep >= 2 && !gameFooter && (
          <button className="back__btn_footer" onClick={handleBack}>
            <img src={`${process.env.PUBLIC_URL}/assets/arrow.png`} alt="" />
            Back
          </button>
        )}*/}
        {gameFooter && (
          <button
            className="back__btn_footer gameFooter__active"
            onClick={helpPop}
          >
            Ayuda
          </button>
        )}
      </div>
      <div className="right__footer_col">
        {currentStep < totalSteps && (
          <button className="next__btn_footer" onClick={handleNext}>
            Próxima
          </button>
        )}
        {currentStep === totalSteps && !gameFooter && (
          <button className="next__btn_footer final" onClick={handleBegin}>
            Comenzar
          </button>
        )}
        {gameFooter && (
          <button
            className="next__btn_footer gameFooter__active"
            onClick={handleRefresh}
          >
            Abandonar
          </button>
        )}
        {giveupFooter && (
          <>
            <div className="loaderBg">
              {/* <img src={`${process.env.PUBLIC_URL}/assets/loader.svg`} alt="" /> */}
            </div>

            {isFirstClickPopup ? (
              <GiveupTryAgain
                setGameResetGiveup={setGameResetGiveup}
                gameResetGiveup={gameResetGiveup}
                setGameReset={setGameReset}
                setShowText={setShowText}
                showText={showText}
                setGameGlobalReset={setGameGlobalReset}
                gameGlobalReset={gameGlobalReset}
              />
            ) : (
              <GiveupComponent
                setGameResetGiveup={setGameResetGiveup}
                gameResetGiveup={gameResetGiveup}
                setGameReset={setGameReset}
                setShowText={setShowText}
                showText={showText}
                setGameGlobalReset={setGameGlobalReset}
                gameGlobalReset={gameGlobalReset}
              />
            )}
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
