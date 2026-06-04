const OptionRadio = ({ name, value, selected, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={selected === value}
        onChange={() => onChange(value)}
      />
      {label}
    </label>
  );
};

export default OptionRadio;