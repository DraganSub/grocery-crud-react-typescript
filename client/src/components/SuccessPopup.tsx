import { useContext } from "react"
import { SuccessMessageCtx } from "../context/SuccessMessageCtx"

export default function SuccessPopup() {

  const { isMessageActive, message } = useContext(SuccessMessageCtx)

  if (!isMessageActive) {
    return null;
  }
  return (
    <div className="popup">
      <div className="success-msg">
        {message}
      </div>
    </div>
  )
}
