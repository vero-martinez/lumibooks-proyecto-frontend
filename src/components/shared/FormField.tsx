/**
 * Wrapper de campo de formulario con label, mensaje de error y hint opcional.
 *
 * Uso:
 *   <FormField label="Email" name="email" error={errors.email} required>
 *     <input {...register("email")} />
 *   </FormField>
 */
import type { ReactNode } from "react";
import type { FieldError as FieldErrorType } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface FormFieldProps {
  label: ReactNode;
  name: string;
  error?: FieldErrorType;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, name, error, required, hint, children, className }: FormFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </FieldLabel>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      )}
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}