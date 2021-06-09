import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Input from "@rodrigosaint/input";
import Space from "@rodrigosaint/space";
import { Label, Text } from "@rodrigosaint/text-essentials";
import { useTranslation } from "react-i18next";

interface FieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  name: string;
  noLabel?: boolean;
  children?: any;
}

export default function Field({
  name,
  children,
  noLabel,
  ...extraProps
}: FieldProps) {
  const { register, formState } = useFormContext();
  const { ref: forwardRef, ...props } = register(name);
  const { t } = useTranslation();

  return (
    <div>
      {!noLabel && (
        <Space margin={{ bottom: 1 }}>
          <Label>{t(name)}</Label>
        </Space>
      )}
      {children || <Input {...extraProps} {...props} ref={forwardRef} />}
      <Space margin={{ top: 1 }}>
        <Text style={{ color: "error" }}>
          <ErrorMessage name={name} errors={formState.errors} />
        </Text>
      </Space>
    </div>
  );
}
