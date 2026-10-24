import {countries} from "country-data-list";

export const countryOptions=countries.all
  .filter(country=>country.alpha2&&country.countryCallingCodes?.length)
  .map(country=>({
    name:country.name,
    code:country.alpha2,
    dialCode:country.countryCallingCodes[0],
    flag:country.alpha2
      ?country.alpha2
          .toUpperCase()
          .replace(/./g,char=>String.fromCodePoint(127397+char.charCodeAt(0)))
      :"",
  }))
  .filter(country=>country.dialCode)
  .sort((a,b)=>a.name.localeCompare(b.name));