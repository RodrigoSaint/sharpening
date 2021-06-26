import React from "react";
import { Meta } from "@storybook/react";

import ImageSelection from "../packages/image-selection/source";

export default {
  title: "ImageSelection",
  component: ImageSelection,
} as Meta;

export const DefaultImageSelection = () => (
  <ImageSelection
    renderWithoutImage={() => <span>Click here to add image</span>}
    query={() =>
      Promise.resolve({
        pageCount: 1,
        currentPage: 1,
        collection: [
          "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        ],
      })
    }
    render={(image, onSelected) => (
      <img
        style={{ width: 100, height: 100 }}
        src={image}
        onClick={onSelected}
      />
    )}
    getKey={(image) => image}
    getImageUrl={(image) => image}
    onSelected={console.log}
  />
);
