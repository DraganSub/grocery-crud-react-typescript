import { IButtonTypes } from "../../types";

export default function Button(props: IButtonTypes) {
  const {
    type = "button",
    className,
    children,
    onClick
  } = props;

  return (
    <button type={type} className={className} onClick={onClick} >
      {children}
    </button>
  )
}