import React from "react";
import { Meta } from "@storybook/react";

import ManagedImage from "../packages/managed-image/source";

export default {
  title: "ManagedImage",
  component: ManagedImage,
} as Meta;

export const DefaultManagedImage = () => (
  <ManagedImage
    src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    renderOnError={() => <span>Error Loading Image</span>}
  />
);

export const ManagedImageWithError = () => (
  <ManagedImage
    src="teste"
    renderOnError={() => <span>Error Loading Image</span>}
  />
);

export const ManagedImageWitoutImage = () => (
  <ManagedImage
    renderWithoutImage={() => <span>There is no image!</span>}
    renderOnError={() => <span>Error Loading Image</span>}
  />
);

export const ManagedImageCustom = () => (
  <ManagedImage
    src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    renderCustomImage={({ src }) => (
      <span>This is the custom image - {src}</span>
    )}
    renderOnError={() => <span>Error Loading Image</span>}
  />
);
