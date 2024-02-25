import { FormEvent, useState } from "react";
import { RequestMethodDropdown } from "./RequestMethodDropdown";
import { Button } from "@/components";

export const TopSection = () => {
  const [url, setUrl] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex gap-4 items-center">
      <div className="">
        <RequestMethodDropdown />
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
  );
};
