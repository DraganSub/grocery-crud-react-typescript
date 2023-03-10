import { createContext } from "react";

export const SuccessMessageCtx = createContext({
  setIsMessageActive: (value: boolean) => { },
  isMessageActive: false,
  message: "",
  setMessage: (value: string) => { }
})