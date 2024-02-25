import { useAppDispatch, useAppSelector } from "@/state";
import { updateErrorMessage } from "@/state/reducers";
import { IconLoader } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export const ResponsePayloadSection = () => {
  const { responsePayload, isLoadingResponse, errorMessage } = useAppSelector(
    (state) => state.apiPostSliceReducer
  );

  const dispatch = useAppDispatch();

  const validatedJson = useMemo(() => {
    if (!responsePayload) return responsePayload;

    try {
      const parsedPayload = JSON.parse(responsePayload);
      return parsedPayload as string;
    } catch (error) {
      console.log(error);
      dispatch(
        updateErrorMessage(
          "There is currently an error with the parsed json or a malformed json format. Kindly check your response payload to confirm"
        )
      );

      return "";
    }
  }, [responsePayload]);

  return (
    <div className="mt-10">
      <h3 className="font-bold">Response Payload</h3>
      <div className="w-full bg-gray-800 p-5 text-white rounded-md mt-2">
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            {isLoadingResponse && (
              <div className="mb-5">
                <IconLoader className="animate-spin" />
              </div>
            )}
            {validatedJson !== "" && typeof responsePayload === "string" ? (
              <p>{responsePayload}</p>
            ) : (
              <p>
                There is currently no data to show. Run a query to show results
                here
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
