import React from 'react'

const FloatingInput = ({inputType, inputPlaceHolder, label, value, valueSetter}:{inputType:string, inputPlaceHolder:string, label?:string, value:any, valueSetter:(input:any) => void}) => {

    return (
        <div className="w-full sm:max-w-sm space-y-3">

            <div className="relative">
                <input type={inputType} id="hs-floating-input-email" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2" value={value} placeholder={inputPlaceHolder} onChange={(e)=>valueSetter(e.target.value)} />
                <label htmlFor="hs-floating-input-email" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0]  peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 ">{label || inputPlaceHolder}</label>
            </div>
        </div>
    )
}

export default FloatingInput