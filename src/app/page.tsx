import Countries from "@/components/Countries";
import CountriesTable from "@/components/CountriesTable";
import { countriesApi } from "@/services/api";
import Country from "@/types/countryType";

export default async function Home() {

  const countriesQ = await countriesApi.get('all');
  const countries:Country[] = await countriesQ.data;

  return (
    <div className="container homePage">
      <Countries countries={countries}/>
    </div>
  );
}
