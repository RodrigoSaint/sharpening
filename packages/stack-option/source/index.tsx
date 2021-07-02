import React from "react";
import styled from "styled-components";

type OptionPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface StackOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any;
  renderOption: () => any;
  position: OptionPosition;
  optionStyle?: {
    marginTop?: string;
    full?: boolean;
  };
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

const Option = styled.div<{
  position: OptionPosition;
  marginTop: string;
  full: boolean;
}>`
  position: absolute;
  z-index: 1;
  margin-top: ${(props) => props.marginTop || 0};
  width: ${(props) => (props.full ? "100%" : "initial")};
  ${(props) => getPosition(props.position)};
`;

const Main = styled.div`
  position: relative;
  display: inline-block;
`;

export default function StackOption({
  children,
  renderOption,
  position,
  optionStyle,
  ...props
}: StackOptionProps) {
  return (
    <Main {...props}>
      <Option
        position={position}
        marginTop={optionStyle?.marginTop}
        full={optionStyle?.full}
      >
        {renderOption()}
      </Option>
      {children}
    </Main>
  );
}
