"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function LoadingButton({ className, buttonName }) {
  const { pending } = useFormStatus();
  return (
    <button className={`${className}`}>
      {pending ? <SpinnerMini /> : `${buttonName}`}
    </button>
  );
}

export default LoadingButton;
