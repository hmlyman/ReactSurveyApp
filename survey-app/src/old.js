import React, { useState, useEffect } from "react";
import "./App.css";

class ClockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    console.log("constructor");
  }

  componentDidMount() {
    this.setState({
      date: this.props.current ? this.props.current : new Date(),
    });
    this.timerID = setInterval(
      () => {
        this.tick();
      },
      this.props.timer ? this.props.timer : 1000
    );
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    console.log("componentWillUnmount");
  }

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    const { date } = this.state;
    console.log("render");
    return (
      <div>
        <p> Hello World {date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

function Clock(props) {
  const [date, setDate] = useState(props.current ? props.current : new Date());

  useEffect(() => {
    let timerID = setInterval(
      function () {
        refreshClock();
      },
      props.timer ? props.timer : 1000
    );

    return () => {
      clearInterval(timerID);
    };
  });

  function refreshClock() {
    setDate(new Date());
  }
  return <div>The time is: {date.toLocaleTimeString()}</div>;
}

function LikeBtn(props) {
  const [value, setValue] = useState(0);
  console.log(props);
  const defaultVerb = props.verb ? props.verb : "Like";
  const initialVerb = props.children ? props.children : defaultVerb;
  const [verb, setVerb] = useState(initialVerb);

  function addOne() {
    setValue(value + 1);
    setVerb("Clicked");
  }
  return (
    <button onClick={addOne}>
      {verb} {value}
    </button>
  );
}

function App(props) {
  const nowDate = new Date();
  const tickTime = 1000;
  return (
    <div>
      <ClockClass current={nowDate} timer={tickTime} />
      <Clock current={nowDate} timer={tickTime} />
      <LikeBtn url="https//www.dog.com">Love</LikeBtn>
      <LikeBtn verb="Dislike" />
      <LikeBtn />
    </div>
  );
}

export default App;
