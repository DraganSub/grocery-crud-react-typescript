import { useFormContext } from "react-hook-form";
import { ErrorMessage } from ".";
import { IFormFieldProps } from "../../types";

export default function FormInputField(props: IFormFieldProps) {
  const {
    name,
    type = "text",
    value,
    placeholder,
    label,
    validate,
    defaultValue,
    className,
    ...rest
  } = props;

  const { register } = useFormContext();

  return (
    <>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        className={className}
        {...register(name, { validate: validate })}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      />
      <ErrorMessage name={name} />
    </>
  )
}