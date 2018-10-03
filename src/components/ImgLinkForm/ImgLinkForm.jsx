import React from "react";
import "./ImgLinkForm.css";

const ImgLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your pics. Give it a try."}
      </p>
      <div className="center">
        <div className="form pa4 center br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 ph4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImgLinkForm;
