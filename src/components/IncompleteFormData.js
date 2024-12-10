import React, { useState } from "react";

const IncompleteFormData = ({ setShowPopup }) => {
  const handleShowPopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="inComplete__pop_wrap">
      <div className="inComplete__pop_container">
        <img src={`${process.env.PUBLIC_URL}/assets/caution.png`} alt="" />
        <h3>Incomplete Submission</h3>
        <h5>Please answer all the questions before proceeding.</h5>
        <p>
          If you don't know an answer, please write ‘I DON'T KNOW’ in the
          respective box.
        </p>
        <button className="footer_btn_ok" onClick={handleShowPopup}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default IncompleteFormData;
