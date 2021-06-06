import React from "react";
import styled from "styled-components";

type Scale =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 20;

type SpaceGranularDefinition = {
  top?: Scale;
  bottom?: Scale;
  left?: Scale;
  right?: Scale;
};

type SpaceAxisDefinition = { vertical: Scale; horizontal: Scale };

type SpaceDefinition = Scale | SpaceAxisDefinition | SpaceGranularDefinition;

interface SpaceProps {
  children: any;
  margin?: SpaceDefinition;
  padding?: SpaceDefinition;
}

const SPACING_DEFAULT = 4;

export function getSpace(definition: SpaceDefinition = 0) {
  if (typeof definition === "number")
    return `${definition * SPACING_DEFAULT}px`;
  const verticalDefinition = definition as SpaceAxisDefinition;
  if (verticalDefinition.vertical !== undefined)
    return `${getSpace(verticalDefinition.vertical)} ${getSpace(
      verticalDefinition.horizontal
    )}`;
  const granularDefinition = definition as SpaceGranularDefinition;
  return `${getSpace(granularDefinition.top)} ${getSpace(
    granularDefinition.right
  )} ${getSpace(granularDefinition.bottom)} ${getSpace(
    granularDefinition.left
  )}`;
}

const BaseSpace = styled.div<SpaceProps>`
  margin: ${(props) => getSpace(props.margin)};
  padding: ${(props) => getSpace(props.padding)};
`;

export default function Space({ children, margin, padding }: SpaceProps) {
  return (
    <BaseSpace margin={margin} padding={padding}>
      {children}
    </BaseSpace>
  );
}
