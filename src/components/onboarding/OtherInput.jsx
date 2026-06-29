export default function OtherInput({
  value,
  onChange,
  placeholder="Please specify",
}) {

  return (

    <input
      type="text"
      value={value || ""}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      placeholder={placeholder}
      className="w-full mt-4 px-5 py-4 rounded-[20px] border border-slate-200 outline-none focus:border-[#173C68] bg-white"
    />

  );

}