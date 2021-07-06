import React, { useState } from "react";
import Modal from "@rodrigosaint/modal";
import ManagedImage from "@rodrigosaint/managed-image";

import ImageSelectionModalContent, {
  ImageSelectionModalContentProps,
} from "./content";

export interface ImageSelectionProps<T>
  extends Omit<ImageSelectionModalContentProps<T>, "close"> {
  renderWithoutImage: () => React.ReactNode;
  getImageUrl: (item: T) => string;
  header: string | React.ReactNode;
  initialValue?: T;
}

export default function ImageSelection<T>(props: ImageSelectionProps<T>) {
  const [src, setSrc] = useState<string>(
    props.initialValue ? props.getImageUrl(props.initialValue) : undefined
  );

  const onSelected = React.useCallback(
    (item: T) => {
      setSrc(props.getImageUrl(item));
      props.onSelected(item);
    },
    [props.onSelected, props.getImageUrl]
  );

  return (
    <>
      <Modal
        renderTrigger={() => (
          // <ManagedImage
          //   src={src}
          //   renderWithoutImage={props.renderWithoutImage}
          //   renderOnError={props.renderWithoutImage}
          // />
          <span></span>
        )}
        renderContent={(close) => (
          <ImageSelectionModalContent
            {...props}
            onSelected={onSelected}
            close={close}
          />
        )}
        header={props.header}
      />
    </>
  );
}
