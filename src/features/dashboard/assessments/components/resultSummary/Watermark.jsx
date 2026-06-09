const Watermark = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0">

      <div className="text-[180px] font-black rotate-[-30deg]">

        CONFIDENTIAL

      </div>

    </div>
  );
};

export default Watermark;