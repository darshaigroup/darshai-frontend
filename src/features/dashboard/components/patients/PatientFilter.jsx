import { useState } from "react";

const PatientFilter = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded w-64"
      />

      <select className="border p-2 rounded">
        <option>Status</option>
        <option>Recovered</option>
        <option>Under Treatment</option>
      </select>

      <select className="border p-2 rounded">
        <option>Age Group</option>
        <option>0-18</option>
        <option>18-40</option>
        <option>40+</option>
      </select>
    </div>
  );
};

export default PatientFilter;