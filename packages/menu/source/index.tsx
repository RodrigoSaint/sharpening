import styled, { ThemeContext } from "styled-components";
import { BiMenu } from "react-icons/bi";
import React, { useCallback, useState } from "react";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import { useContext } from "react";

interface MenuStyle {
  background?: string;
  padding?: string;
  height?: string;
  color?: string;
  mobileBreakPoint?: string;
}

interface MenuProps {
  style?: MenuStyle;
  logo: React.ReactElement;
  children: React.ReactElement;
}

const MenuHeader = styled.header<MenuStyle>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

const MenuContainer = styled.div<MenuStyle>`
  @media (${(props) => props.mobileBreakPoint}) {
    display: flex;
  }
`;

const MenuIcon = styled.div<MenuStyle>`
  cursor: pointer;
  padding-left: 10;
  @media (${(props) => props.mobileBreakPoint}) {
    display: none;
  }
`;

const MenuNav = styled.nav<{ isOpen: boolean } & MenuStyle>`
  flex-direction: column;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.5s ease-in;

  & > * {
    color: ${(props) => props.color};
    height: ${(props) => props.height};
    padding: ${(props) => props.padding};
    background: ${(props) => props.background};
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
    }
  }

  @media (${(props) => props.mobileBreakPoint}) {
    display: flex;
    flex-direction: row;
    opacity: 1;
  }
`;

const defaultMenuStyle: MenuStyle = {
  background: "#0366d6",
  color: "white",
  height: "50px",
  mobileBreakPoint: "min-width: 800px",
  padding: "0 20px",
};

function getMenuStyle(style?: MenuStyle): MenuStyle {
  const theme = useContext(ThemeContext);
  const compute = getComputedStyle(style, theme?.menu, defaultMenuStyle);
  return {
    background: compute("background"),
    color: compute("color"),
    height: compute("height"),
    mobileBreakPoint: compute("mobileBreakPoint"),
    padding: compute("padding"),
  };
}

export default function Menu({ logo, children, style }: MenuProps) {
  const [isOpen, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((r) => !r), []);
  const computedStyle = getMenuStyle(style);

  return (
    <MenuContainer {...computedStyle}>
      <MenuHeader {...computedStyle}>
        {logo}
        <MenuIcon {...computedStyle}>
          <BiMenu onClick={toggle} size={30} />
        </MenuIcon>
      </MenuHeader>
      <MenuNav isOpen={isOpen} {...computedStyle}>
        {children}
      </MenuNav>
    </MenuContainer>
  );
}
