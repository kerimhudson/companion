import { HTMLAttributes } from "react";
import { classNames } from "../utils/classNames";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isDark?: boolean;
}

const RoundButton = ({ isDark, ...rest }: Props) => {
  return (
    <button
      className={classNames([
        "p-2 rounded-full transition-colors duration-250",
        isDark
          ? "bg-white/10 text-white hover:bg-white/20 active:bg-white/50"
          : "bg-black/10 hover:bg-black/20 active:bg-black/50",
      ])}
      {...rest}
    />
  );
};

export default RoundButton;
