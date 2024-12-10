import React, { useEffect, useState } from "react";

const GiveupComponent = ({
  setGameReset,
  setGameResetGiveup,
  gameResetGiveup,
  setShowText,
  showText,
  setGameGlobalReset,
  gameGlobalReset,
}) => {
  useEffect(() => {
    setShowText(true);
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };
  const handletryagain = () => {
    setGameReset(true);
    setShowText(false);
    setGameGlobalReset(true);
  };
  return (
    <>
      {showText && (
        <div className="cong__modal_wrap fail_comp_main_wrap">
          <div className="cong__modal_inner_container">
            <img src={`${process.env.PUBLIC_URL}/assets/caution.png`} alt="" />
            <h2>Give Up</h2>
            <h5>Your participation is appriciation for us...</h5>
            <p>GoodLuck!</p>
            {/* <div className="button__row_col">
              <button className="tgiveup__btn" onClick={handleRefresh}>
                Give Up
              </button>
              <button className="try_again__btn" onClick={handletryagain}>
                Try Again
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default GiveupComponent;