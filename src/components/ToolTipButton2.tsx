import React from 'react';

export const TooltipButton2 = () => {
    return (
        <div className="absolute top-0  hs-tooltip inline-block [--trigger:hover]">
            <div
                className="hs-tooltip-toggle flex justify-center items-center p-3 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-nonerelative"
            >
                Add to Chart
            </div>
        </div>
    );
}
