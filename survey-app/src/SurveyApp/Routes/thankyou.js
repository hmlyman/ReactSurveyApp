import React from "react";
import { Link } from "react-router-dom";

class ThankYou extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="col-6 mx-auto text-center">
            <h1>Thank you for taking our survey!</h1>

            <Link
              name="BeginFromThankYouBtn"
              className="btn btn-primary my-5 mx-5"
              to="/"
            >
              Begin new survey
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default ThankYou;
