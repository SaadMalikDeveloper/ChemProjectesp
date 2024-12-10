import React, { useEffect, useState } from "react";

const FailComponent = ({
  setGameReset,
  setGameResetGiveup,
  gameResetGiveup,
}) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };
  const handletryagain = () => {
    setGameReset(true);
    setGameResetGiveup(true);
  };
  return (
    <>
      {showText && (
        <div className="cong__modal_wrap fail_comp_main_wrap">
          <div className="cong__modal_inner_container">
            <img src={`${process.env.PUBLIC_URL}/assets/caution.png`} alt="" />
            <h2>Almost Found the Solution</h2>
            <h5>You Want to Try Again?</h5>
            <p>
              It looks like you're close to finding the right combination! Why
              not give it another shot? Remember, the challenge is part of the
              fun, and every attempt gets you closer to success.
            </p>
            <div className="button__row_col">
              <button className="tgiveup__btn" onClick={handleRefresh}>
                Quit
              </button>
              <button className="try_again__btn" onClick={handletryagain}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FailComponent;
