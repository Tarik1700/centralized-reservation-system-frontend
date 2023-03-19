import classNames from "classnames";

export const ErrorMessage = ({
  msg,
  className,
}: {
  msg?: string;
  className?: string;
}) => <p className={classNames(className, "text-red-600	 text-xs")}>{msg}</p>;
