import { createContext, useContext, useState } from "react";
import { Toast } from "./Toast";

export const ToastContext = createContext({
  showMessage: (_message: string) => {},
  message: "",
});

export const useToastContext = () => useContext(ToastContext);

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (_message: string) => {
    setShowToast(true);
    setMessage(_message);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  return (
    <ToastContext.Provider
      value={{
        showMessage,
        message,
      }}
    >
      <div className="relative">
        {showToast && <Toast />}
        {children}
      </div>
    </ToastContext.Provider>
  );
};
