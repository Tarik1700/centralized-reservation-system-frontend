import React from "react";
import { Button, Modal } from "flowbite-react";
import { twMerge } from "tailwind-merge";

interface IModalGeneric {
  modalClassName?: string;
  modalHeaderClassName?: string;
  modalFooterClassName?: string;
  size?: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  header: string;
  buttonToOpenModal?: React.ReactNode;
  footer: React.ReactNode;
}

const ModalGeneric = ({
  isOpen,
  setOpen,
  children,
  header,
  buttonToOpenModal,
  footer,
  modalClassName,
  modalHeaderClassName,
  modalFooterClassName,
  size,
}: IModalGeneric) => {
  return (
    <React.Fragment>
      {buttonToOpenModal}
      <Modal
        /*  size can be: xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;  */
        size={size}
        className={twMerge("", modalClassName)}
        dismissible={true}
        show={isOpen}
        onClose={() => setOpen(false)}
      >
        <Modal.Header
          className={twMerge(
            "border-b-[1px] border-solid border-gray-200",
            modalHeaderClassName
          )}
        >
          {header}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer
          className={twMerge(
            "border-t-[1px] border-solid border-gray-200 justify-end",
            modalFooterClassName
          )}
        >
          {footer}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalGeneric;
