import React from "react";
import { Link } from "react-router-dom";

class LoadedSurvey extends React.Component {
  render() {
    return (
      <>
        {" "}
        <h1>Loaded Survey</h1>
        <Link name="LStoHome-btn" className="btn btn-primary my-5 mx-5" to="/">
          Home
        </Link>
      </>
    );
  }
}

export default LoadedSurvey;
