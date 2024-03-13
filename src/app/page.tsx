import Countries from "@/components/Countries";
import CountriesTable from "@/components/CountriesTable";
import { countriesApi } from "@/services/api";
import Country from "@/types/countryType";
import { cache } from "react";

export const getData = cache(async ()=>{
  return countriesApi.get('all');
})

export default async function Home() {

  const countriesQ = await getData();
  const countries:Country[] = await countriesQ.data;

  return (
    <div className="container homePage">
      <Countries countries={countries}/>
    </div>
  );
}
