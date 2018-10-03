import React from "react";

const Nav = ({ onRouteChange, isSingin }) => {
  if (isSingin === true) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("singin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return null;
  }
};

export default Nav;
