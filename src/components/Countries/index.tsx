'use client';

import React, { useState } from 'react'
import CountriesTable from '../CountriesTable'
import Country from '@/types/countryType'

type CountriesTableProps = {
    countries: Country[]
}
type SortDirection = "asc" | "desc";
type orderBy = "population" | "area" ;

const Countries = ({ countries }: CountriesTableProps) => {
    
    const [countriesData, setCountriesData] = useState(countries);
    const [orderBy, setOrderBy] = useState<orderBy>("population");
    const [orderDirection, setOrderDirection] = useState<SortDirection>("desc");

    function sortByProperty(countries: Country[], property: orderBy, direction: SortDirection = "desc"): Country[] {
        const multiplier = direction === "asc" ? 1 : -1;
        return countries.slice().sort((a, b) => {
          return (a[property] - b[property]) * multiplier;
        });
      }

    function filterCountries(countries: Country[], searchText: string): Country[] {
      const lowerSearchText = searchText.toLowerCase();
      return countries.filter(country =>
        country.name.common.toLowerCase().includes(lowerSearchText) ||
        country.region.toLowerCase().includes(lowerSearchText)
      );
    }

    return (
        <>
            <div className="flex items-center justify-between w-full">
                <span>
                    {countries ? "Found " + countries.length + " countries" : "Looking for countries"}
                </span>
                <input type="text" onChange={e=>{setCountriesData(filterCountries(countries,e.target.value))}} placeholder="Search by Name, Region, Subregion" />
            </div>
            <div className="homePage_content flex gap-6 mt-3">
                <div id="filters" className="flex flex-col w-full max-w-[25%]">
                    <div className="filters_item flex flex-col">
                        <label htmlFor="sortBy">sort by</label>
                        <select name="sortBy" onChange={e=>{setOrderBy(e.target.value as orderBy)}}>
                            <option value="population">Population</option>
                            <option value="area">Area</option>
                        </select>
                    </div>
                </div>
                <div className="w-full max-w-[75%]">
                    {countries && <CountriesTable countries={sortByProperty(countriesData,orderBy,orderDirection)} />}
                </div>
            </div>
        </>
    )
}

export default Countries