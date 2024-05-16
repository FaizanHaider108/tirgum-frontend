"use client"
import { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { useRouter } from 'next/navigation'
import { SearchBoxProps } from "@/types";
import { TooltipButton } from "./TooltipButton";
import { SearchboxTooltip } from "./SearchboxTooltip";

const SearchBox: React.FC<SearchBoxProps> = ({ size, brands, issteel, isdrive, istrailer, isretreaded, isincised, allBrands, allSizes, ispair, advance }) => {

  const [allFilteredSizes, setAllFilteredSizes] = useState(allSizes)
  const [sizeInputVal, setsizeInputVal] = useState<string>("")
  const [sizePartActive, setSizePartActive] = useState<boolean>(false)

  //  ----------
  const [activeBrands, setActiveBrands] = useState<number[]>([]);
  const [allBrandsShow, setAllBrandsShow] = useState<boolean>(false);
  const [advanceFiltersShow, setAdvanceFiltersShow] = useState<boolean>(false);


  // BTN FILTERS
  const [isSteel, setIsSteel] = useState<boolean>(false);
  const [isDrive, setIsDrive] = useState<boolean>(false);
  const [isTrailer, setIsTrailer] = useState<boolean>(false);
  const [isRetreaded, setIsRetreaded] = useState<boolean>(false);
  const [isIncised, setIsIncised] = useState<boolean>(false);

  // -------------
  const [isPair, setIsPair] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false)


  const brandsRef = useRef(null);


  const router = useRouter()

  function SearchBtn() {
    return (
      <button onClick={() => redirectFunc()} className={`p-2 px-4 rounded-md bg-orange-400 text-white mt-4 w-full text-center disabled:opacity-50 ${!(sizeInputVal) && ("cursor-not-allowed")}`} disabled={!(sizeInputVal)}>
        Szukaj
      </button>
    );
  }

  const redirectFunc = () => {

    const queryParams = {
      size: sizeInputVal,
      brands: activeBrands?.includes(0) ? "0" : activeBrands.join(','),
      issteel: isSteel ? isSteel.toString() : "",
      isdrive: isDrive ? isDrive.toString() : "",
      istrailer: isTrailer ? isTrailer.toString() : "",
      isretreaded: isRetreaded ? isRetreaded.toString() : "",
      isincised: isIncised ? isIncised.toString() : "",
      ispair: isPair.toString(),
      advance: advanceFiltersShow ? advanceFiltersShow.toString() : "false",
    };

    const queryString = new URLSearchParams(queryParams).toString();

    isPair ? router.push(`/products/pair?${queryString}`) : router.push(`/products?${queryString}`)

  }


  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setsizeInputVal(event.target.value);
    const filtered = allSizes?.filter(item => item.size?.toLowerCase().includes(event.target.value.toLowerCase()));
    setAllFilteredSizes(filtered)
  };



  const handleSingleBrandClick = (id: number) => {
    if (activeBrands?.includes(id)) {
      setActiveBrands(activeBrands.filter((divId) => divId !== id));
    } else {
      setActiveBrands([...activeBrands, id]);
    }
  };


  const advanceFiltersClosed = (input: boolean) => {
    setAdvanceFiltersShow(input)
    if (input === false) {
      setIsRetreaded(false)
      setIsIncised(false)
    }
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandsRef.current && !(brandsRef.current as HTMLElement).contains(event.target as Node)) {
        setAllBrandsShow(false);
      }

    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);




  useEffect(() => {
    setsizeInputVal(size);
  }, [size])

  useEffect(() => {
    setActiveBrands(brands ? brands.split(",").map(Number) : [])
  }, [brands])

  useEffect(() => {
    setIsSteel(issteel ? issteel === "true" : false);
  }, [issteel])

  useEffect(() => {
    setIsDrive(isdrive ? isdrive === "true" : false);
  }, [isdrive])

  useEffect(() => {
    setIsTrailer(istrailer ? istrailer === "true" : false);
  }, [istrailer])

  useEffect(() => {
    setIsPair(ispair ? ispair === "true" : false);
  }, [ispair])

  useEffect(() => {
    setIsRetreaded(isretreaded ? isretreaded === "true" : false);
  }, [isretreaded])

  useEffect(() => {
    setIsIncised(isincised ? isincised === "true" : false);
  }, [isincised])


  useEffect(() => {
    setAdvanceFiltersShow(advance)
  }, [advance])

  return (
    <div className="h-max bg-cover flex items-center justify-center">


      {/* Basic */}
      <div className="relative w-full top-0">

        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-gray-200 flex flex-col space-y-2 p-4 rounded-md mx-auto my-10">
          <div className="flex justify-start my-2">

            <label 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="inline-flex items-center cursor-pointer">
              <input
                onClick={() => setIsPair(!isPair)}
                type="checkbox"
                className="sr-only peer size-4"
                checked={isPair}
                onChange={e => { }}
              />
              <div className={`p-2 items-center relative w-[3.4rem] h-7 rounded-full peer ${isPair ? 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full bg-blue-700' : 'bg-slate-700'} peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all outline-none ring-0`} ></div>

              <span className="ms-3 text-lg font-medium text-gray-900">{isPair ? "Search Pairs" : "Search Single"}</span>

              {showTooltip && <SearchboxTooltip />}

            </label>





          </div>




          {/* Rozmiar */}
          <div className="size__main">


            <div id="size" className="w-[100%] " >
              <div className="relative">
                <label htmlFor="size__input" className="block mb-2 text-sm font-medium text-black">
                  <span>Choose a Size</span>
                  <span className="text-red-500 mx-2">*</span>
                </label>

                <input onBlur={() => setTimeout(() => { setSizePartActive(false) }, 200)} onFocus={() => setSizePartActive(true)} value={sizeInputVal} onChange={(e) => handleSizeChange(e)} type="text" id="size__input" className={`text-xl bg-gray-50 text-gray-900 rounded-lg block w-full p-2.5`} placeholder="385/55 R22.5" />

                <div className={`all_suggestions rounded-xl bg-slate-50 overflow-auto ${sizePartActive ? "opacity-100 visible max-h-40 w-full" : "opacity-0 invisible max-h-0 w-0"}  transition-height ease-in-out delay-150 duration-500 absolute  z-30 transition-all`}>
                  {allFilteredSizes && allFilteredSizes.map((data) => {
                    return <div key={data.id} className="hover:bg-slate-200 border-b border-slate-100 cursor-pointer w-[100%] text-black px-4 py-2 text-md" onClick={() => { setsizeInputVal(data.size), setAllFilteredSizes([]) }}>{data.size}</div>
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* brand Name */}
          <div ref={brandsRef} id="brand_name" className="w-[100%] relative">



            <label className={`mb-2 text-sm font-medium px-4 py-2 rounded-xl cursor-pointer flex justify-between hover:bg-opacity-80 items-center ${allBrandsShow ? "bg-orange-400 text-white" : "bg-slate-50 text-black"}`} onClick={() => setAllBrandsShow(!allBrandsShow)}>

              <span className="text-xl font-normal">{activeBrands.length > 0 ? `${activeBrands.includes(0) ? "All Brands Selected" : `${activeBrands.length} Brand Selected`}` : "Select a Brand"}</span>

              {!allBrandsShow ? (
                <span>
                  <BiDownArrowAlt />
                </span>
              ) : (
                <span>
                  <BiUpArrowAlt />
                </span>
              )}


            </label>



            <div className={`${allBrandsShow ? "opacity-100 visible max-h-40 w-full" : "opacity-0 invisible max-h-0 h-0 w-0"} rounded-xl bg-slate-50 p-4 cursor-pointer space-y-2 overflow-auto absolute z-20  transition-all duration-300`}>
              <div onClick={() => handleSingleBrandClick(0)} className={`hover:bg-slate-200 flex justify-between py-2 px-2 rounded-lg`}>
                {"All"}
                {activeBrands?.includes(0) && (
                  <span className=" inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-orange-400 dark:text-white">
                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                  </span>
                )}
              </div>
              {allBrands && allBrands.map((data) => {
                if (!activeBrands?.includes(0)) {

                  return <div key={data.id} onClick={() => handleSingleBrandClick(data.id)} className={`hover:bg-slate-200 flex justify-between py-2 px-2 rounded-lg`}>
                    {data.name}
                    {activeBrands?.includes(data.id) && (
                      <span className="inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-orange-400 dark:text-white">
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                      </span>
                    )}
                  </div>
                }

              })}
            </div>

          </div>

          <div className="w-[100%]  relative">

            <ul className="max-w-full w-full grid grid-cols-2 sm:grid-cols-4 items-stretch rounded-lg">

              <li className="flex p-1">
                <input onClick={() => setIsSteel(!isSteel)} type="checkbox" id="Sterujaca" value="" className="hidden peer" />
                <label htmlFor="Sterujaca" className={`justify-center inline-flex items-center text-center  p-5 bg-white border-2  rounded-lg cursor-pointer ${isSteel ? ("border-orange-400 text-gray-600") : ("border-gray-200 text-gray-500")} hover:text-gray-600 hover:bg-gray-50 max-w-[100%] w-[100%]`}>
                  <div className="block">
                    <div className="break-all text-xs font-semibold">Sterujaca</div>
                  </div>
                </label>
              </li>

              <li className="flex p-1">
                <input onClick={() => setIsDrive(!isDrive)} type="checkbox" id="Naped" value="" className="hidden peer" />
                <label htmlFor="Naped" className={`justify-center inline-flex items-center text-center  p-5 bg-white border-2  rounded-lg cursor-pointer ${isDrive ? ("border-orange-400 text-gray-600") : ("border-gray-200 text-gray-500")} hover:text-gray-600 hover:bg-gray-50 max-w-[100%] w-[100%]`}>
                  <div className="block">
                    <div className="break-all text-xs font-semibold">Naped</div>
                  </div>
                </label>
              </li>

              <li className="flex p-1">
                <input onClick={() => setIsTrailer(!isTrailer)} type="checkbox" id="Wleczona" value="" className="hidden peer" />
                <label htmlFor="Wleczona" className={`justify-center inline-flex items-center text-center  p-5 bg-white border-2  rounded-lg cursor-pointer ${isTrailer ? ("border-orange-400 text-gray-600") : ("border-gray-200 text-gray-500")} hover:text-gray-600 hover:bg-gray-50 max-w-[100%] w-[100%]`}>
                  <div className="block">
                    <div className="break-all text-xs font-semibold">Wleczona</div>
                  </div>
                </label>
              </li>
            </ul>
          </div>


          <div className="w-[100%]  relative">
            {/* <label htmlFor="osie" className="block text-sm font-medium text-black dark:text-black">Osie</label> */}


            <label className="inline-flex items-center cursor-pointer">
              <input
                onClick={() => advanceFiltersClosed(!advanceFiltersShow)}
                type="checkbox"
                className="sr-only peer size-4"
                checked={advanceFiltersShow}
                onChange={e => { }}
              />
              <div className={`p-2 items-center relative w-[3.4rem] h-7 rounded-full peer ${advanceFiltersShow ? 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full bg-blue-700' : 'bg-slate-700'} peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all outline-none ring-0`} ></div>
              <span className="ms-3 text-lg font-medium text-gray-900">Advance Filters</span>
            </label>



            <div className={`overflow-y-hidden  duration-700 transition-all z-10 ${advanceFiltersShow ? "opacity-100 visible w-full max-h-24" : "opacity-0 invisible max-h-0 w-0"}`}>
              <ul className="max-w-full w-full grid grid-cols-2 sm:grid-cols-3 items-stretch bg-slate-50 px-8 py-2 rounded-lg">

                <li className="flex p-1">
                  <input onClick={() => setIsRetreaded(!isRetreaded)} type="checkbox" id="Bieżnikowana" value="" className="hidden peer" />
                  <label htmlFor="Bieżnikowana" className={`justify-center inline-flex items-center text-center  p-5 bg-white border-2  rounded-lg cursor-pointer ${isRetreaded ? ("border-orange-400 text-gray-600") : ("border-gray-200 text-gray-500")} hover:text-gray-600 hover:bg-gray-50 max-w-[100%] w-[100%]`}>
                    <div className="block w-fit">
                      <div className="break-all text-xs font-semibold ">Bieznikowana</div>
                    </div>
                  </label>
                </li>

                <li className="flex p-1">
                  <input onClick={() => setIsIncised(!isIncised)} type="checkbox" id="isIncised" value="" className="hidden peer" />
                  <label htmlFor="isIncised" className={`justify-center inline-flex items-center text-center  p-5 bg-white border-2  rounded-lg cursor-pointer ${isIncised ? ("border-orange-400 text-gray-600") : ("border-gray-200 text-gray-500")} hover:text-gray-600 hover:bg-gray-50 max-w-[100%] w-[100%]`}>
                    <div className="block">
                      <div className="break-all text-xs font-semibold ">Nacinania</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>

          </div>

          <div></div>
          <SearchBtn />

        </div>

        <Image
          src="/termopres.jpg"
          alt="Tirgum main Image"
          width={100}
          height={100}
          unoptimized={true}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-90"
        />


      </div>


    </div>
  );
}

export default SearchBox;
