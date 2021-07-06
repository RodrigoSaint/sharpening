import React, { CSSProperties } from "react";

interface PageFrameProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function PageFrame({
  header,
  footer,
  children,
  style,
}: PageFrameProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {header}
      <div style={{ ...style, flexGrow: 1 }}>{children}</div>
      {footer}
    </div>
  );
}
