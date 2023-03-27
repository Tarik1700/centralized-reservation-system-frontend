import { toast, ToastOptions } from "react-toastify";
export enum ToastType {
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}

export enum ToastMessageType {
  CREATE,
  UPDATE,
  DELETE,
  CHANGE_STATUS,
  ERROR,
  CUSTOM,
}

const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
};

export class ToastHelper {
  public static showToast(
    object: string | string[],
    toastType: ToastType,
    messageType?: ToastMessageType,
    text?: string
  ) {
    const toastMessage: string = this.getMessage(object, messageType, text);

    switch (toastType) {
      case ToastType.SUCCESS:
        return toast.success(toastMessage, defaultToastOptions);
      case ToastType.INFO:
        return toast.info(toastMessage, defaultToastOptions);
      case ToastType.ERROR:
        return toast.error(toastMessage, defaultToastOptions);
      case ToastType.WARNING:
        return toast.warning(toastMessage, defaultToastOptions);
      default:
        return toast(toastMessage, defaultToastOptions);
    }
  }
  private static getMessage(
    object: string | string[],
    messageType?: ToastMessageType,
    toastText?: string
  ): string {
    if (toastText) {
      return toastText;
    }
    switch (messageType) {
      case ToastMessageType.CREATE:
        return `${object} creation succeeded!`;
      case ToastMessageType.UPDATE:
        return `${object} editing is successful!`;
      case ToastMessageType.DELETE:
        return `${object} deleting is successful!`;
      case ToastMessageType.CHANGE_STATUS:
        return `${object} status change is successful!`;
      case ToastMessageType.ERROR:
        return "An error occured. Please try again!";
      case ToastMessageType.CUSTOM:
        return `${object}`;
      default:
        return "Toast message!";
    }
  }
}
