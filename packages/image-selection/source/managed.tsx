import ImageSelection, { ImageSelectionProps } from "./base";
import { useFormContext } from "react-hook-form";
import React from "react";

export interface ManagedImageSelectionProps<T>
  extends Omit<ImageSelectionProps<T>, "onSelected" | "getImageUrl"> {
  name: string;
}

export default function ManagedImageSelection<T>({
  name,
  ...props
}: ManagedImageSelectionProps<T>) {
  const { setValue, getValues } = useFormContext();
  const setImage = React.useCallback((image: string) => setValue(name, image), [
    setValue,
    name,
  ]);
  const image = getValues(name);
  const getImageUrl = React.useCallback((image) => image, []);

  return (
    <ImageSelection
      {...props}
      onSelected={setImage}
      initialValue={image}
      getImageUrl={getImageUrl}
    />
  );
}
