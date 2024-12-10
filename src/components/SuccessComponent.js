import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SuccessComponent = () => {
  const [showText, setShowText] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    if (location.pathname === "/form") {
      // Reload the page if the current path is /form
      window.location.reload();
    }
  };

  return (
    <>
      {showText && (
        <div className="cong__modal_wrap">
          <div className="cong__modal_inner_container">
            <img src={`${process.env.PUBLIC_URL}/assets/tick.png`} alt="" />
            <h2>¡Enhorabuena!</h2>
            <h5>¡Lo has conseguido!</h5>
            <p>Hay una segunda parte del problema.</p>
            <button className="cont__btn_footer" onClick={handleButtonClick}>
              {location.pathname === "/form" ? (
                <Link>Continuar</Link>
              ) : (
                <Link to="/form">Continuar</Link>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessComponent;
