import { useEffect, useState } from "react";
import { SuccessPopup } from "../components";
import { SuccessMessageCtx } from "./SuccessMessageCtx";
interface IContextProps {
  children: any,
}
export default function SuccessMessageContainer(props: IContextProps) {
  const {
    children,
  } = props;

  // state
  const [message, setMessage] = useState<string>("")
  const [isMessageActive, setIsMessageActive] = useState<boolean>(false);

  const ctxValue = {
    setIsMessageActive: (value: boolean) => setIsMessageActive(value),
    isMessageActive: isMessageActive,
    message: message,
    setMessage: (value: string) => setMessage(value)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsMessageActive(false)
    }, 2000)

  }, [isMessageActive])

  return (
    <SuccessMessageCtx.Provider value={ctxValue} >
      {isMessageActive &&
        <SuccessPopup />
      }
      {children}
    </SuccessMessageCtx.Provider >
  )

}
