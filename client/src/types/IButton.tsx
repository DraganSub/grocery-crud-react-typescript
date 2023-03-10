export interface IButtonTypes {
  children: any,
  type?: "submit" | "button" | "reset" | undefined,
  className?: string,
  rest?: any,
  onClick?: () => void
}