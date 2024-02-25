import { RequestTypes } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  requestType: RequestTypes;
  responsePayload: string;
  isLoadingResponse: boolean;
  errorMessage: string;
};

const initialState: InitialState = {
  requestType: "post",
  responsePayload: "",
  isLoadingResponse: false,
  errorMessage: "",
};

const apiPostSlice = createSlice({
  name: "apiPostReducer",
  initialState,
  reducers: {
    updateRequestType: (
      state,
      action: PayloadAction<InitialState["requestType"]>
    ) => ({
      ...state,
      requestType: action.payload,
    }),
    clearRequestType: (state) => ({
      ...state,
      requestType: "post",
    }),
    updateResponsePayload: (
      state,
      action: PayloadAction<InitialState["responsePayload"]>
    ) => ({
      ...state,
      responsePayload: action.payload,
    }),
    clearResponsePayload: (state) => ({
      ...state,
      responsePayload: "",
    }),
    updateLoadingProgress: (
      state,
      action: PayloadAction<InitialState["isLoadingResponse"]>
    ) => ({
      ...state,
      isLoadingResponse: action.payload,
    }),
    clearLoadingProgress: (state) => ({
      ...state,
      isLoadingResponse: false,
    }),
    updateErrorMessage: (
      state,
      action: PayloadAction<InitialState["errorMessage"]>
    ) => ({
      ...state,
      errorMessage: action.payload,
    }),
    clearErrorMessage: (state) => ({
      ...state,
      errorMessage: "",
    }),
  },
});

export const {
  updateRequestType,
  clearRequestType,
  clearResponsePayload,
  updateResponsePayload,
  clearLoadingProgress,
  updateLoadingProgress,
  clearErrorMessage,
  updateErrorMessage,
} = apiPostSlice.actions;
export const apiPostSliceReducer = apiPostSlice.reducer;
