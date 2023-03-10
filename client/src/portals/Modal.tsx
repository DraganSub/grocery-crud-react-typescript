import { Fragment } from "react";
import "./modal.css";

import ReactDom from "react-dom";

interface IClose {
  onClose: () => void
}

const Backdrop = ({ onClose }: IClose) => {
  return <div className="backdrop" onClick={onClose}></div>;
};

const ModalOverlay = (props: any) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

// Get the modal placeholder div from index.html
const modalPlaceholderElement = document.getElementById("modal");

const Modal = (props: any) => {
  return (
    <Fragment>


      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        modalPlaceholderElement!
      )}

      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalPlaceholderElement!
      )}

    </Fragment>
  );
};

export default Modal;