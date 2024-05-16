import React, { useState } from "react";

export const TooltipButton = () => {
  return (
    <div className="absolute mb-[100px]">
      <div className="hs-tooltip-toggle flex justify-center items-center p-4 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-nonerelative">
        Add to Comparison
      </div>
    </div>
  );
};
