import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgRightChev = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 256}
    height={props.height || 256}
    viewBox="0 0 120 120"
    xmlSpace="preserve"
    {...props}
  >
    <Path
      fill="#B1B1B0"
      d="M102.296 59.957 42.264 119.99l-16.659-16.65 60.034-60.041z"
    />
    <Path
      fill="#B1B1B0"
      d="M85.74 76.71 25.715 16.653 42.373.011l60.018 60.056z"
    />
  </Svg>
);
export default SvgRightChev;
