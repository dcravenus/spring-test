import React from "react";
import "./App.css";

import { useSpring, animated, config } from "react-spring";

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const styles = css`
  display: inline-block;
  .box {
    width: 300px;
    height: 300px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 60px 100px 20px;

  }
`;

const Box = ({ hue, label }) => {
  const boxLength = 300;
  //Do some trig
  let x = Math.min(hue % 90, Math.abs(90 - (hue % 90)));
  let y = boxLength / (2 * Math.cos((x * Math.PI) / 180));
  y = y - 130; //Remove buffer pixels

  return (
    <div css={styles}>
      <h1>{label}</h1>
      <div
        className="box"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)`, transform: `rotate(${hue}deg)` }}
      ></div>
      <p style={{ transform: `translateY(${y}px)` }}>{Number.parseInt(hue)}°</p>
    </div>
  );
};

const AnimatedBox = animated(Box);


const cssTransitionBoxStyles = css`
  display: inline-block;
  .box {
    width: 300px;
    height: 300px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 60px 100px 20px;

    transition: all 1s ease;
  }
`;

const CSSTransitionBox = ({ hue, label }) => {
  const boxLength = 300;
  //Do some trig
  let x = Math.min(hue % 90, Math.abs(90 - (hue % 90)));
  let y = boxLength / (2 * Math.cos((x * Math.PI) / 180));
  y = y - 130; //Remove buffer pixels

  return (
    <div css={cssTransitionBoxStyles}>
      <h1>{label}</h1>
      <div
        className="box"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)`, transform: `rotate(${hue}deg)` }}
      ></div>
      <p style={{ transform: `translateY(${y}px)` }}>{Number.parseInt(hue)}°</p>
    </div>
  );
};

function App() {
  const [hue, setHue] = React.useState(0);

  const getSpringConfig = configValue => {
    return {
      to: { hue: hue },
      from: { hue: 0 },
      config: configValue
    };
  };

  const defaultSpring = useSpring(getSpringConfig(config.default));
  const gentleSpring = useSpring(getSpringConfig(config.gentle));
  const wobblySpring = useSpring(getSpringConfig(config.wobbly));
  const stiffSpring = useSpring(getSpringConfig(config.stiff));
  const slowSpring = useSpring(getSpringConfig(config.slow));
  const molassesSpring = useSpring(getSpringConfig(config.molasses));

  return (
    <div className="App">
      <Box hue={hue} label="No Transition"></Box>

      <AnimatedBox hue={wobblySpring.hue} label="react-spring"></AnimatedBox>

      <CSSTransitionBox hue={hue} label="CSS Transition"></CSSTransitionBox>

      <br></br>
      <br></br>
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        step={1}
        onChange={e => {
          setHue(Number.parseInt(e.target.value));
        }}
        css={{ 'marginTop': '50px' }}
      ></input>
    </div>
  );
}

export default App;
