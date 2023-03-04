import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgLeftChev = (props: SvgProps) => (
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
      d="m34.358 43.299 60.033 60.041-16.659 16.65L17.7 59.957z"
    />
    <Path
      fill="#B1B1B0"
      d="M17.606 60.067 77.623.011l16.658 16.642L34.256 76.71z"
    />
  </Svg>
);
export default SvgLeftChev;
