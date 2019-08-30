import React from "react";
import "./App.css";

import { useSpring, animated, config } from "react-spring";

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Box = ({ hue, label }) => {
  const boxLength = 300;
  //Do some trig
  let x = Math.min(hue % 90, Math.abs(90 - (hue % 90)));
  let y = boxLength / (2 * Math.cos((x * Math.PI) / 180));
  y = y - 130; //Remove buffer pixels

  const styles = css`
    display: inline-block;
    .box {
      background-color: hsl(${hue}, 100%, 50%);
      width: ${boxLength}px;
      height: ${boxLength}px;
      border: 1px solid black;
      border-radius: 5px;
      margin: 20px;
      transform: rotate(${hue}deg);
    }
    p {
      transform: translateY(${y}px);
    }
  `;
  return (
    <div css={styles}>
      <h1>{label}</h1>
      <div className="box"></div>
      <p>{Number.parseInt(hue)}°</p>
    </div>
  );
};

const AnimatedBox = animated(Box);

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
      <AnimatedBox hue={defaultSpring.hue} label="Default"></AnimatedBox>
      <AnimatedBox hue={gentleSpring.hue} label="Gentle"></AnimatedBox>
      <AnimatedBox hue={wobblySpring.hue} label="Wobbly"></AnimatedBox>
      <AnimatedBox hue={stiffSpring.hue} label="Stiff"></AnimatedBox>
      <AnimatedBox hue={slowSpring.hue} label="Slow"></AnimatedBox>
      <AnimatedBox hue={molassesSpring.hue} label="Molasses"></AnimatedBox>
      <Box hue={hue} label="No Spring"></Box>

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
      ></input>
    </div>
  );
}

export default App;
