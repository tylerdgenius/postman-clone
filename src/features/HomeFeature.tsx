"use client";
import { useAppSelector } from "@/state";
import {
  RequestPayloadSection,
  ResponsePayloadSection,
  TopSection,
} from "./components";

export const HomeFeature = () => {
  return (
    <div className="flex justify-center py-20">
      <div className="w-[1280px] px-5">
        <TopSection />
        <RequestPayloadSection />
        <ResponsePayloadSection />
      </div>
    </div>
  );
};
