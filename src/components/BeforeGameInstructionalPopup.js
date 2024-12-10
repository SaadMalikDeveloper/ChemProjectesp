import React, { useState, useEffect } from "react";
import GameScreenPlay from "./gameScreenPlay";

function BeforeGameInstructionalPopup({
  setGameFooter,
  setGameGlobalReset,
  gameGlobalReset,
}) {
  // State to manage visibility of the popup
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowPopup(false);
      setGameFooter(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const continueBtn = () => {
    setShowPopup(false);
    setGameFooter(true);
  };
  return (
    <>
      {showPopup && (
        <GameScreenPlay
          setGameGlobalReset={setGameGlobalReset}
          gameGlobalReset={gameGlobalReset}
        />
        //   <div className="begin_game_instruction_wrap">
        //     <div className="begin_game_instruction_popup_container">
        //       <img
        //         src={`${process.env.PUBLIC_URL}/assets/instructionIcon.png`}
        //         alt=""
        //       />
        //       <h3>Here's how to mix the liquids: </h3>
        //       <ul className="begin_game_instruction_popup_list">
        //         <li>Click on the small glass or glasses you want to use.</li>
        //         <li>
        //           Click the "Pour" button to transfer the liquid into the large
        //           beaker.
        //         </li>
        //         <li>
        //           If the liquid in the large beaker turns red, you've done it
        //           right!
        //         </li>
        //         <li>
        //           If the color isn't red, click the "Empty" button to clear the
        //           beaker and try again with the same or different liquids.
        //         </li>
        //       </ul>
        //       <h4>Good Luck!</h4>
        //       <button
        //         class="continue__btn_begin_game_instruction"
        //         onClick={continueBtn}
        //       >
        //         Continue
        //       </button>
        //     </div>
        //   </div>
        // ) : (
        //   <div className="game__screen">
        //     <GameScreenPlay />
        //   </div>
      )}
    </>
  );
}

export default BeforeGameInstructionalPopup;
