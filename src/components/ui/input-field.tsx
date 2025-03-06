import { ChangeEvent } from "react";

import type { BaseFormFieldProps } from "@/types";
import { Input } from "@/components/ui/input.tsx";
import { FormItem, FormField, FormMessage, FormLabel } from "@/components/ui/form.tsx";

type Props = BaseFormFieldProps & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  className,
  name,
  rules,
  label,
  disabled = false,
  showDirty = true,
  ...props
}: Props) => (
  <FormField
    name={name}
    rules={rules}
    render={({ field, fieldState }) => (
      <FormItem className={className}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Input
          className={`${fieldState.isDirty && showDirty ? "bg-primary text-primary-foreground" : ""}`}
          {...field}
          disabled={disabled}
          {...props}
          onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
        />
        <FormMessage />
      </FormItem>
    )}
  />
);
