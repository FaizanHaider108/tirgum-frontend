import React from 'react';



export const ToolTip = ({ text }:{text:string}) => {
    return (
        <div className="absolute  bottom-10  hs-tooltip inline-block [--trigger:hover]">
            <div
                className="w-max hs-tooltip-toggle flex justify-center items-center p-3 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-nonerelative"
            >
                {text}
            </div>
        </div>
    );
}
