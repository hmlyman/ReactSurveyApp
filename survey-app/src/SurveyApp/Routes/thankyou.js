import React from "react";
import { Link } from "react-router-dom";

class ThankYou extends React.Component {
  render() {
    return (
      <>
        <h1>Thank you for taking our survey!</h1>
        <button>
          <Link to="/">Begin new survey</Link>
        </button>
      </>
    );
  }
}

export default ThankYou;
