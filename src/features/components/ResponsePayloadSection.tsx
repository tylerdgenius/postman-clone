import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/state";
import { updateErrorMessage } from "@/state/reducers";
import { useToastContext } from "@/toast";
import { IconClipboard, IconLoader } from "@tabler/icons-react";
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

  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess("Failed to copy :(");
    }
  };

  const { showMessage } = useToastContext();

  return (
    <div className="mt-10">
      <h3 className="font-bold">Response Payload</h3>
      <div className="w-full bg-gray-800 p-5 overflow-auto text-white rounded-md mt-2 relative">
        <Button
          variant="outline"
          className="absolute outline-white text-white right-5 top-5 flex"
          onClick={() => {
            copyToClipboard(responsePayload);
            showMessage("Successfully copied payload");
          }}
        >
          Copy
          <IconClipboard />
        </Button>
        {isLoadingResponse && (
          <div className="mb-5">
            <IconLoader className="animate-spin" />
          </div>
        )}
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            {validatedJson !== "" && typeof responsePayload === "string" ? (
              <pre>{responsePayload}</pre>
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
