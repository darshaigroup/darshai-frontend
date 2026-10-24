import{useEffect,useMemo,useRef,useState}from"react";
import{ChevronDown,Search}from"lucide-react";
import{isValidPhoneNumber}from"libphonenumber-js";
import{countryOptions}from"../data/countries";

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EnquiryInput=({
  label,
  type="text",
  value="",
  onChange,
  required=false,
  error,
  placeholder
})=>{
  const[phoneCountry,setPhoneCountry]=useState("IN");
  const[phoneCountryOpen,setPhoneCountryOpen]=useState(false);
  const[phoneCountrySearch,setPhoneCountrySearch]=useState("");
  const[emailTouched,setEmailTouched]=useState(false);

  const countryWrapperRef=useRef(null);
  const countryButtonRef=useRef(null);
  const dropdownRef=useRef(null);

  const selectedPhoneCountry=useMemo(
    ()=>countryOptions.find(c=>c.code===phoneCountry)||countryOptions.find(c=>c.code==="IN"),
    [phoneCountry]
  );

  const filteredPhoneCountries=useMemo(()=>{
    const query=phoneCountrySearch.trim().toLowerCase();

    if(!query)return countryOptions;

    return countryOptions.filter(country=>
      country.name.toLowerCase().includes(query)||
      country.code.toLowerCase().includes(query)||
      country.dialCode.includes(query)
    );
  },[phoneCountrySearch]);

  useEffect(()=>{
    if(!phoneCountryOpen)return;

    const handleOutsideClick=e=>{
      if(
        countryWrapperRef.current &&
        !countryWrapperRef.current.contains(e.target)
      ){
        setPhoneCountryOpen(false);
        setPhoneCountrySearch("");
      }
    };

    document.addEventListener("mousedown",handleOutsideClick);

    return()=>{
      document.removeEventListener("mousedown",handleOutsideClick);
    };
  },[phoneCountryOpen]);

  useEffect(()=>{
    if(!phoneCountryOpen)return;

    const timer=setTimeout(()=>{
      const button=countryButtonRef.current;
      const dropdown=dropdownRef.current;

      if(!button||!dropdown)return;

      const buttonRect=button.getBoundingClientRect();
      const dropdownHeight=Math.min(dropdown.scrollHeight,380);
      const viewportHeight=window.innerHeight;
      const bottomSpace=viewportHeight-buttonRect.bottom;

      if(bottomSpace<dropdownHeight+20){
        button.scrollIntoView({
          behavior:"smooth",
          block:"center"
        });
      }
    },50);

    return()=>clearTimeout(timer);
  },[phoneCountryOpen]);

  if(type==="phone"){
    const dialCode=selectedPhoneCountry?.dialCode||"+91";
    const rawValue=String(value||"");

    const localValue=rawValue.startsWith(dialCode)
      ?rawValue.slice(dialCode.length)
      :rawValue.replace(/^\+\d{1,4}/,"");

    const handlePhoneCountry=nextCountry=>{
      setPhoneCountry(nextCountry.code);
      setPhoneCountryOpen(false);
      setPhoneCountrySearch("");

      const digits=localValue.replace(/\D/g,"");

      onChange(
        digits
          ?`${nextCountry.dialCode}${digits}`
          :""
      );
    };

    const handlePhone=e=>{
      const digits=e.target.value.replace(/\D/g,"");

      if(!digits){
        onChange("");
        return;
      }

      onChange(`${dialCode}${digits}`);
    };

    const phoneValid=
      localValue.length>0&&
      isValidPhoneNumber(
        `${dialCode}${localValue}`,
        selectedPhoneCountry?.code
      );

    return(
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#243126]">
          {label}
          {required&&<span className="ml-1 text-[#1e7a3a]">*</span>}
        </label>

        <div
          className={`relative flex w-full overflow-visible rounded-2xl border bg-white transition-all duration-200 focus-within:ring-4 focus-within:ring-[#1e7a3a]/10 ${
            error||(!phoneValid&&localValue)
              ?"border-red-300"
              :"border-[#d8e2d7] focus-within:border-[#1e7a3a]"
          }`}
        >
          <div
            ref={countryWrapperRef}
            className="relative z-30 shrink-0"
          >
            <button
              ref={countryButtonRef}
              type="button"
              onClick={()=>{
                setPhoneCountryOpen(prev=>!prev);
                setPhoneCountrySearch("");
              }}
              className={`flex h-full min-w-[110px] items-center gap-2 border-r border-[#d8e2d7] px-3 py-4 transition-colors duration-200 sm:min-w-[125px] sm:px-4 ${
                phoneCountryOpen
                  ?"bg-[#f4f8f5]"
                  :"bg-white hover:bg-[#f8faf8]"
              }`}
              aria-label="Select mobile country code"
              aria-expanded={phoneCountryOpen}
            >
              <span className="text-lg leading-none">
                {selectedPhoneCountry?.flag}
              </span>

              <span className="text-sm font-medium text-[#243126]">
                {selectedPhoneCountry?.dialCode}
              </span>

              <ChevronDown
                size={15}
                className={`ml-auto text-[#748078] transition-transform duration-200 ${
                  phoneCountryOpen?"rotate-180":""
                }`}
              />
            </button>

            {phoneCountryOpen&&(
              <div
                ref={dropdownRef}
                className="absolute left-0 top-[calc(100%+8px)] z-[9999] w-[310px] overflow-hidden rounded-2xl border border-[#d8e2d7] bg-white shadow-[0_20px_50px_rgba(20,50,30,0.18)]"
              >
                <div className="border-b border-[#e5ebe6] bg-white p-3">
                  <div className="flex items-center gap-2 rounded-xl border border-[#d8e2d7] bg-white px-3 transition-all focus-within:border-[#1e7a3a] focus-within:ring-4 focus-within:ring-[#1e7a3a]/10">
                    <Search
                      size={16}
                      className="shrink-0 text-[#89948c]"
                    />

                    <input
                      type="text"
                      value={phoneCountrySearch}
                      onChange={e=>setPhoneCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      autoFocus
                      className="w-full bg-transparent px-1 py-3 text-sm text-[#243126] outline-none placeholder:text-[#a0aaa3]"
                    />
                  </div>
                </div>

                <div className="max-h-[320px] overflow-y-auto overscroll-contain">
                  {filteredPhoneCountries.length>0?(
                    filteredPhoneCountries.map(country=>(
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        type="button"
                        onClick={()=>handlePhoneCountry(country)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                          selectedPhoneCountry?.code===country.code
                            ?"bg-[#edf6ef] text-[#163c25]"
                            :"text-[#344239] hover:bg-[#f4f7f3]"
                        }`}
                      >
                        <span className="w-7 shrink-0 text-lg">
                          {country.flag}
                        </span>

                        <span className="flex-1 truncate text-sm">
                          {country.name}
                        </span>

                        <span className="shrink-0 text-xs text-[#7a867d]">
                          {country.dialCode}
                        </span>
                      </button>
                    ))
                  ):(
                    <div className="px-4 py-8 text-center text-sm text-[#89948c]">
                      No countries found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <input
            type="tel"
            value={localValue}
            onChange={handlePhone}
            placeholder={placeholder||"Mobile number"}
            inputMode="numeric"
            autoComplete="tel-national"
            className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-[#243126] outline-none placeholder:text-[#9aa59d]"
          />
        </div>

        {!error&&localValue&&!phoneValid&&(
          <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">
            Enter a valid mobile number.
          </p>
        )}

        {error&&(
          <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }

  if(type==="email"){
    const emailValue=String(value||"").trim();
    const emailValid=emailRegex.test(emailValue);

    const showEmailError=
      emailTouched&&
      emailValue.length>0&&
      !emailValid;

    return(
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#243126]">
          {label}
          {required&&<span className="ml-1 text-[#1e7a3a]">*</span>}
        </label>

        <div className="relative">
          <input
            type="email"
            value={value||""}
            onChange={e=>onChange(e.target.value)}
            onBlur={()=>setEmailTouched(true)}
            placeholder={placeholder}
            autoComplete="email"
            className={`w-full rounded-2xl border bg-white px-4 py-4 text-sm text-[#243126] outline-none transition-all duration-200 placeholder:text-[#9aa59d] focus:ring-4 focus:ring-[#1e7a3a]/10 ${
              error||showEmailError
                ?"border-red-300 focus:border-red-400"
                :"border-[#d8e2d7] focus:border-[#1e7a3a]"
            }`}
          />
        </div>

        {!error&&showEmailError&&(
          <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">
            Enter a valid email address.
          </p>
        )}

        {error&&(
          <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }

  return(
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#243126]">
        {label}
        {required&&<span className="ml-1 text-[#1e7a3a]">*</span>}
      </label>

      <input
        type={type}
        value={value||""}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white px-4 py-4 text-sm text-[#243126] outline-none transition-all duration-200 placeholder:text-[#9aa59d] focus:ring-4 focus:ring-[#1e7a3a]/10 ${
          error
            ?"border-red-300"
            :"border-[#d8e2d7] focus:border-[#1e7a3a]"
        }`}
      />

      {error&&(
        <p className="animate-[fadeIn_0.2s_ease-out] text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default EnquiryInput;