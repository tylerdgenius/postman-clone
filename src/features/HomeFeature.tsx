"use client";

import { FormEvent, useState } from "react";
import { RequestTypeDropdown } from "./components";
import { Button } from "@/components";

export const HomeFeature = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [url, setUrl] = useState("");

  return (
    <div className="flex justify-center py-20">
      <div className="w-[1280px] flex gap-4 items-center">
        <div className="">
          <RequestTypeDropdown />
        </div>
        <div className="flex-auto">
          <form onSubmit={onSubmit}>
            <input
              placeholder="Enter url here"
              className="py-2 px-5 w-full rounded-md outline outline-slate-200"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </form>
        </div>
        <div className="hover:shadow-lg">
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};
