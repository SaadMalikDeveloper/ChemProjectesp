import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/customStyle.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FirstInstructionalScreen from "./components/FirstInstructionalScreen";
import SecondInstructionalScreen from "./components/SecondInstructionalScreen";
import ThirdInstructionalScreen from "./components/ThirdInstructionalScreen";
import FourthInstructionalScreen from "./components/FourthInstructionalScreen";
import ChemMatchingGame from "./components/ChemMatchingGame";
import BeforeGameInstructionalPopup from "./components/BeforeGameInstructionalPopup";
import HelpComponent from "./components/helpComponent";
import FormPage from "./components/FormPage"; // The new form component
import DataTable from "./components/DataTable";
import QGDataTable from "./components/QGDataTable";
import QualtricDataSurveyGameMerge from "./components/QualtricDataSurveyGameMerge";

import DataUploaderPage from "./components/DataUploader";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [gameBegin, setGameBegin] = useState(false);
  const [gameFooter, setGameFooter] = useState(false);
  const [helpPop, setHelpPop] = useState();
  const [gameGlobalReset, setGameGlobalReset] = useState();
  const totalSteps = 4;

  useEffect(() => {
    const url = new URL(window.location.href);
    const participantId = url.searchParams.get("participant_id");
    const svId = url.searchParams.get("SV_id");
    sessionStorage.setItem("participant_id", participantId || "0");
    sessionStorage.setItem("SV_id", svId || "0");

    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        sessionStorage.setItem("userIP", data.ip); // Save IP address to sessionStorage
      } catch (error) {
        console.error("Error fetching IP address:", error);
        sessionStorage.setItem("userIP", "0"); // Fallback if IP fetch fails
      }
    };

    fetchUserIP(); // Call the function to fetch the IP
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <div className="main__wrapper_game">
                <div className="header_game_row">
                  <Header currentStep={currentStep} totalSteps={totalSteps} />
                </div>
                <div
                  className={
                    currentStep === 4 && !gameBegin
                      ? "body__game_row  game__begin"
                      : "body__game_row"
                  }
                >
                  <main>
                    {currentStep === 1 && <FirstInstructionalScreen />}
                    {currentStep === 2 && <SecondInstructionalScreen />}
                    {currentStep === 3 && <ThirdInstructionalScreen />}
                    {currentStep === 4 && !gameBegin && (
                      <FourthInstructionalScreen />
                    )}
                    {gameBegin && (
                      <BeforeGameInstructionalPopup
                        setGameFooter={setGameFooter}
                        setGameGlobalReset={setGameGlobalReset}
                        gameGlobalReset={gameGlobalReset}
                      />
                    )}
                    {helpPop && (
                      <HelpComponent
                        setGameFooter={setGameFooter}
                        setHelpPop={setHelpPop}
                        helpPop={helpPop}
                        setGameGlobalReset={setGameGlobalReset}
                        gameGlobalReset={gameGlobalReset}
                      />
                    )}
                  </main>
                  <Footer
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    totalSteps={totalSteps}
                    setGameBegin={setGameBegin}
                    gameFooter={gameFooter}
                    setHelpPop={setHelpPop}
                    setGameGlobalReset={setGameGlobalReset}
                    gameGlobalReset={gameGlobalReset}
                  />
                </div>
              </div>
            </>
          }
        />
        <Route path="/form" element={<FormPage />} /> {/* Form Page Route */}
        <Route path="/users" element={<DataTable />} />
        <Route path="/overall-data" element={<QGDataTable />} />
        <Route
          path="/overall-data-survey-game-merge"
          element={<QualtricDataSurveyGameMerge />}
        />
        <Route path="/data-uploader" element={<DataUploaderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
