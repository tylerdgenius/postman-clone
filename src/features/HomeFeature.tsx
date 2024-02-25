"use client";
import { useAppSelector } from "@/state";
import { RequestPayloadSection, TopSection } from "./components";

export const HomeFeature = () => {
  const {} = useAppSelector((state) => state.apiPostSliceReducer);

  return (
    <div className="flex justify-center py-20">
      <div className="w-[1280px] px-5">
        <TopSection />
        <RequestPayloadSection />
      </div>
    </div>
  );
};
