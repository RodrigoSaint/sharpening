import React from "react";
import styled from "styled-components";

type OptionPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface StackOptionProps {
  children: any;
  renderOption: () => any;
  position: OptionPosition;
}

function getPosition(position: OptionPosition) {
  switch (position) {
    case "top-left":
      return "top: 0; left: 0";
    case "top-right":
      return "top: 0; right: 0";
    case "bottom-left":
      return "bottom: 0; left: 0";
    case "bottom-right":
      return "bottom: 0; right: 0";
    default:
      return "";
  }
}

const Option = styled.div<{ position: OptionPosition }>`
  position: absolute;
  z-index: 1;
  ${(props) => getPosition(props.position)}
`;

const Main = styled.div`
  position: relative;
  display: inline-block;
`;

export default function StackOption({
  children,
  renderOption,
  position,
}: StackOptionProps) {
  return (
    <Main>
      <Option position={position}>{renderOption()}</Option>
      {children}
    </Main>
  );
}
