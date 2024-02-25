import { FormEvent, useState } from "react";
import { RequestMethodDropdown } from "./RequestMethodDropdown";
import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/state";
import {
  clearErrorMessage,
  updateErrorMessage,
  updateLoadingProgress,
  updateResponsePayload,
} from "@/state/reducers";
import { axiosInstance } from "@/config";

export const TopSection = () => {
  const [url, setUrl] = useState("");

  const { requestType } = useAppSelector((state) => state.apiPostSliceReducer);

  const dispatch = useAppDispatch();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateLoadingProgress(true));

    try {
      if (!url) {
        throw new Error("Url is required to proceed");
      }

      const { data } = await axiosInstance[requestType](url, {});
      dispatch(clearErrorMessage());
      dispatch(updateResponsePayload(JSON.stringify(data, null, 2)));
    } catch (error) {
      console.log(error);
      const err = error as unknown as Error;
      dispatch(updateErrorMessage(`An error occurred... ${err.message}`));
    } finally {
      dispatch(updateLoadingProgress(false));
    }
  };

  return (
    <div className="w-full flex gap-4 items-center">
      <div className="">
        <RequestMethodDropdown />
      </div>
      <form onSubmit={onSubmit} className="flex flex-auto gap-4">
        <div className="flex-auto">
          <input
            placeholder="Enter url here"
            className="py-2 px-5 w-full rounded-md outline outline-slate-200"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <div className="hover:shadow-lg">
          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
};
