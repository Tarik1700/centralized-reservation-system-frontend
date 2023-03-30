import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  position?: "center" | "top" | "bottom";
  modalClassName?: string;
  modalHeaderClassName?: string;
  modalBodyClassName?: string;
  modalFooterClassName?: string;
  footer?: ReactNode;
}

export const ModalGenericNew: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  position = "center",
  modalClassName,
  modalHeaderClassName,
  modalBodyClassName,
  modalFooterClassName,
  footer,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const positionClasses = {
    center: "items-center",
    top: "items-start",
    bottom: "items-end",
  };

  return (
    <div
      className={twMerge(
        "fixed inset-0 flex justify-center z-49",
        modalClassName,
        positionClasses[position]
      )}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={twMerge(
          "bg-white rounded-lg p-5 relative w-full m-5",
          sizeClasses[size]
        )}
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <h2
          className={twMerge(
            "border-b-[1px] border-solid border-gray-200 pb-2 mb-4",
            modalHeaderClassName
          )}
        >
          {title}
        </h2>
        <div className={twMerge("modal-body", modalBodyClassName)}>
          {children}
        </div>
        {footer && (
          <div className={twMerge("modal-footer mt-4", modalFooterClassName)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
