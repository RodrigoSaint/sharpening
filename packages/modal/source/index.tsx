import styled, { ThemeContext } from "styled-components";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import { getSpace, SpaceDefinition } from "@rodrigosaint/space";

interface ModalProps {
  isOpen?: boolean;
  header?: string;
  renderTrigger?: () => any;
  renderContent: (close: () => void) => any;
  style: ModalStyle;
}

interface ModalStyle {
  background?: string;
  borderRadius?: string;
  padding?: SpaceDefinition;
  wrapperBackground?: string;
}

const ModalBackground = styled.div<{ background: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div<{ background: string; borderRadius: string }>`
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
`;

const ModalContent = styled.div<{ padding: SpaceDefinition }>`
  padding: ${(props) => props.padding};
`;

const ModalHeader = styled.div<{ padding: SpaceDefinition }>`
  padding: ${(props) => props.padding};
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseIconStyle = {
  cursor: "pointer",
  color: "red",
  paddingLeft: getSpace(3),
};

const ModalDefaultStyle: ModalStyle = {
  background: "black",
  borderRadius: "12px",
  padding: 3,
  wrapperBackground: "white",
};

function getModalStyle(style?: ModalStyle): ModalStyle {
  const theme = React.useContext(ThemeContext);
  const compute = getComputedStyle(style, theme?.modal, ModalDefaultStyle);

  return {
    background: compute("background"),
    borderRadius: compute("borderRadius"),
    padding: getSpace(compute("padding")),
    wrapperBackground: compute("wrapperBackground"),
  };
}

export default function Modal({
  renderTrigger,
  renderContent,
  header,
  isOpen: isOpenProp,
  style: styleProp,
}: ModalProps) {
  const [isOpen, setOpen] = React.useState(isOpenProp || false);
  const open = React.useCallback(() => setOpen(true), []);
  const close = React.useCallback(() => setOpen(false), []);

  useEffect(() => setOpen(isOpenProp), [isOpenProp]);

  const style = getModalStyle(styleProp);

  return (
    <React.Fragment>
      {renderTrigger && <div onClick={open}>{renderTrigger()}</div>}
      {isOpen && (
        <ModalBackground background={style.background}>
          <ModalWrapper
            background={style.wrapperBackground}
            borderRadius={style.borderRadius}
          >
            {header && (
              <ModalHeader padding={style.padding}>
                {header}
                <FaTimes onClick={close} style={CloseIconStyle} />
              </ModalHeader>
            )}
            <ModalContent padding={style.padding}>
              {renderContent(close)}
            </ModalContent>
          </ModalWrapper>
        </ModalBackground>
      )}
    </React.Fragment>
  );
}
