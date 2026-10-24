const API = `${import.meta.env.VITE_API_URL}/api/countries`;

export const getCountries = async () => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Unable to load countries.");
  }

  const data = await response.json();

  return data
    .filter((c) => c?.name?.common && c?.cca2 && c?.idd?.root)
    .map((c) => ({
      name: c.name.common,
      code: c.cca2,
      dialCode: `${c.idd.root}${c.idd.suffixes?.[0] || ""}`,
      flag: c.flag || "",
    }))
    .filter((c) => c.dialCode)
    .sort((a, b) => a.name.localeCompare(b.name));
};