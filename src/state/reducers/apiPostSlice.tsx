import { RequestTypes } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  requestType: RequestTypes;
};

const initialState: InitialState = {
  requestType: "Post",
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
      // url: action.payload,
      requestType: action.payload,
    }),
    clearRequestType: (state) => ({
      ...state,
    }),
  },
});

export const { updateRequestType, clearRequestType } = apiPostSlice.actions;
export const apiPostSliceReducer = apiPostSlice.reducer;
