"use client";

import { useAppDispatch, useAppSelector } from "@/state";
import { updateRequestType } from "@/state/reducers";
import { RequestTypes } from "@/types";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export const RequestTypeDropdown = () => {
  const requestTypes = ["Post", "Get", "Patch", "Put"];

  const { requestType } = useAppSelector((state) => state.apiPostSliceReducer);

  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownClasses = `absolute -bottom-25 bg-white rounded-md w-full shadow-md ${
    showDropdown ? "flex flex-col" : "hidden"
  }`;

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!mainRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    });

    return window.removeEventListener("click", () => {});
  }, []);

  const dispatch = useAppDispatch();

  return (
    <div className="relative" ref={mainRef}>
      <div
        className="flex gap-4 items-center outline py-2 px-5 rounded-md outline-slate-200 bg-gray-50 cursor-pointer"
        onClick={() => setShowDropdown(true)}
      >
        <p>{requestType?.toUpperCase()}</p>
        <IconCaretDownFilled size={16} />
      </div>
      <div className={dropdownClasses}>
        {requestTypes.map((request) => {
          const castedRequest = request as string;
          return (
            <button
              type="button"
              key={request}
              className="py-2 text-left hover:bg-slate-100 px-5 rounded-md cursor-pointer"
              onClick={() => {
                dispatch(updateRequestType(castedRequest as RequestTypes));
                setShowDropdown(false);
              }}
            >
              {request.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
