import React, { ImgHTMLAttributes } from "react";
import { useState } from "react";

interface ManagedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  renderWithoutImage?: () => React.ReactNode;
  renderOnError?: () => React.ReactNode;
  renderCustomImage?: (
    props: ImgHTMLAttributes<HTMLImageElement>
  ) => React.ReactNode;
}

export default function ManagedImage({
  renderCustomImage,
  renderWithoutImage,
  renderOnError,
  ...props
}: ManagedImageProps) {
  const [hasError, setError] = useState(false);
  const onError = React.useCallback(() => setError(true), []);

  if (!props.src && renderWithoutImage) return renderWithoutImage();
  if (hasError) return renderOnError();
  if (renderCustomImage) return renderCustomImage({ ...props, onError });

  return <img {...props} onError={onError} />;
}
