import React from "react";
import { ReactComponent as Rocket } from "./Icons/Rocket.svg";
import { ReactComponent as Fire } from "./Icons/Fire.svg";
import "../scss/loader2.scss";

function Loader() {
  return (
    <div className="loading-container">
      <div className="loader">
        <Fire className="fire" />
        <Rocket className="rocket" />
      </div>
      <h2>Loading...</h2>
    </div>
  );
}

export default Loader;
