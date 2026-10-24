import React from "react";
export function BranchBankingHub({ className = "" }) {
  return (
    <section
      aria-label="Branch Banking infographic"
      className={`w-full max-w-[1600px] mx-auto ${className}`}
    >
      <div className="relative rounded-[24px] p-[2px] bg-gradient-to-r from-[#0A9C9C] to-[#00BF63] shadow-xl overflow-hidden">
        <div className="w-full bg-white rounded-[22px] p-6 sm:p-8 lg:p-[24px]">
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <div className="w-[90%] sm:w-[75%] lg:w-[56%] h-[72px] sm:h-[90px] lg:h-[110px] rounded-full border-2 border-black bg-transparent flex items-center justify-center px-4">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-[#111111] tracking-tight leading-none text-center select-none">
                Branch Banking
              </h2>
            </div>
          </div>
          <div className="hidden lg:block relative w-full h-[660px] select-none">
            <svg
              viewBox="0 0 1600 660"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              aria-hidden="true"
            >
              <circle
                cx="800"
                cy="330"
                r="155"
                fill="none"
                stroke="#EEEEF2"
                strokeWidth="2"
              />
              <path
                d="M 430 110 C 560 110, 600 230, 681 230"
                fill="none"
                stroke="#8DB53F"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 430 330 L 645 330"
                fill="none"
                stroke="#0A9C9C"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 430 550 C 560 550, 600 430, 681 430"
                fill="none"
                stroke="#00BF63"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 1170 110 C 1040 110, 1000 230, 919 230"
                fill="none"
                stroke="#00BF63"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 1170 330 L 955 330"
                fill="none"
                stroke="#0A9C9C"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 1170 550 C 1040 550, 1000 430, 919 430"
                fill="none"
                stroke="#8DB53F"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#F2F2F5] z-20 flex flex-col items-center justify-center shadow-xs"
              aria-hidden="true"
            >
              <svg
                className="w-16 h-16 text-[#111111] mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="21" x2="21" y2="21" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polygon points="12 2 3 9 21 9" />
                <line x1="5" y1="10" x2="5" y2="21" />
                <line x1="9" y1="10" x2="9" y2="21" />
                <line x1="15" y1="10" x2="15" y2="21" />
                <line x1="19" y1="10" x2="19" y2="21" />
              </svg>
              <span className="text-[32px] font-bold text-[#111111] tracking-tight leading-none">
                Functions
              </span>
            </div>
            <ul
              aria-label="Branch Banking functions"
              className="absolute inset-0 w-full h-full list-none p-0 m-0 z-20"
            >
              <li
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "40px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#8DB53F",
                }}
                className="rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Account</span>
                <span>Opening</span>
              </li>
              <li
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "260px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#0A9C9C",
                }}
                className="rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Accepting</span>
                <span>Deposits</span>
              </li>
              <li
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "480px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#00BF63",
                }}
                className="rounded-full flex items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Lending</span>
              </li>
              <li
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "40px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#00BF63",
                }}
                className="rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Fund</span>
                <span>Transfer</span>
              </li>
              <li
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "260px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#0A9C9C",
                }}
                className="rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Keep Your</span>
                <span>Money Safe</span>
              </li>
              <li
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "480px",
                  width: "390px",
                  height: "140px",
                  backgroundColor: "#8DB53F",
                }}
                className="rounded-full flex items-center justify-center text-center text-white font-bold text-[34px] leading-[1.15] shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer"
              >
                <span>Liquidity</span>
              </li>
            </ul>
          </div>
          <div className="lg:hidden flex flex-col items-center gap-6 sm:gap-8 w-full">
            <div
              className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] rounded-full bg-[#F2F2F5] border-4 border-[#EEEEF2] flex flex-col items-center justify-center shadow-sm shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14 text-[#111111] mb-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="21" x2="21" y2="21" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polygon points="12 2 3 9 21 9" />
                <line x1="5" y1="10" x2="5" y2="21" />
                <line x1="9" y1="10" x2="9" y2="21" />
                <line x1="15" y1="10" x2="15" y2="21" />
                <line x1="19" y1="10" x2="19" y2="21" />
              </svg>
              <span className="text-[22px] sm:text-[26px] font-bold text-[#111111] tracking-tight">
                Functions
              </span>
            </div>
            <div className="relative w-full max-w-2xl mx-auto">
              <div
                className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#0A9C9C] to-[#00BF63] pointer-events-none"
                aria-hidden="true"
              />
              <ul
                aria-label="Branch Banking functions"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full list-none p-0 m-0"
              >
                <li
                  style={{ backgroundColor: "#8DB53F" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Account</span>
                  <span>Opening</span>
                </li>
                <li
                  style={{ backgroundColor: "#00BF63" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Fund</span>
                  <span>Transfer</span>
                </li>
                <li
                  style={{ backgroundColor: "#0A9C9C" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Accepting</span>
                  <span>Deposits</span>
                </li>
                <li
                  style={{ backgroundColor: "#0A9C9C" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Keep Your</span>
                  <span>Money Safe</span>
                </li>
                <li
                  style={{ backgroundColor: "#00BF63" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Lending</span>
                </li>
                <li
                  style={{ backgroundColor: "#8DB53F" }}
                  className="w-full h-[90px] sm:h-[110px] rounded-full flex items-center justify-center text-center text-white font-bold text-[20px] sm:text-[22px] leading-tight shadow-md hover:opacity-90 transition-opacity duration-160 cursor-pointer px-4"
                >
                  <span>Liquidity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BranchBankingHub;
