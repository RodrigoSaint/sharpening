import React, { ImgHTMLAttributes } from "react";
import { useState } from "react";

interface ManagedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  renderWithoutImage?: () => React.ReactElement;
  renderOnError?: () => React.ReactElement;
  renderCustomImage?: (
    props: ImgHTMLAttributes<HTMLImageElement>
  ) => React.ReactElement;
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
