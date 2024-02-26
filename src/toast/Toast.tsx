import { useToastContext } from "./ToastContext";

export const Toast = () => {
  const { message } = useToastContext();

  return (
    <div className="absolute top-5 bg-gray-800 shadow-lg pt-2 rounded-md right-5">
      <p className="mx-5 pb-2 text-white">{message}</p>
      <div className="bg-gray-300 w-full py-1 px-5 rounded-md"></div>
    </div>
  );
};
