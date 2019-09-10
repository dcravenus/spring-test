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
    margin: 20px;
  }
`;

const Box = ({ hue, label }) => {
  const boxLength = 300;
  //Do some trig
  let x = Math.min(hue % 90, Math.abs(90 - (hue % 90)));
  let y = boxLength / (2 * Math.cos((x * Math.PI) / 180));
  y = y - 130; //Remove buffer pixels

  const [circleSize, setCircleSize] = React.useState(300)


  const handleClickBox = () => {
    if (circleSize === 300) {
      setCircleSize(0)
    } else {
      setCircleSize(300)
    }
  }

  return (
    <div css={styles}>
      <h1>{label}</h1>
      <animated.div
        onClick={handleClickBox}
        className="box"
        style={{
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
          transform: `rotate(${hue}deg)`,
          clipPath: `circle(${circleSize}px at 150px 150px)`
        }}
      ></animated.div>
      <p style={{ transform: `translateY(${y}px)` }}>{Number.parseInt(hue)}°</p>
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

  const circleSpring = useSpring({ to: { size: 300 }, from: { size: 0 }, config: config.slow });

  return (
    <div className="App">
      <AnimatedBox
        hue={defaultSpring.hue}
        label="Default"
        circleSize={circleSpring.size}
      ></AnimatedBox>
      <AnimatedBox hue={gentleSpring.hue} label="Gentle" circleSize={circleSpring.size}></AnimatedBox>
      <AnimatedBox hue={wobblySpring.hue} label="Wobbly" circleSize={circleSpring.size}></AnimatedBox>
      <AnimatedBox hue={stiffSpring.hue} label="Stiff" circleSize={circleSpring.size}></AnimatedBox>
      <AnimatedBox hue={slowSpring.hue} label="Slow" circleSize={circleSpring.size}></AnimatedBox>
      <AnimatedBox hue={molassesSpring.hue} label="Molasses" circleSize={circleSpring.size}></AnimatedBox>
      <Box hue={hue} label="No Spring" circleSize={300}></Box>

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
