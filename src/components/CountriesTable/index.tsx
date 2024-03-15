'use client';

import getCountryCode from '@/services/countryCode';
import Country from '@/types/countryType';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag';

type CountriesTableProps = {
    countries: Country[]
}

const CountriesTable = ({ countries }: CountriesTableProps) => {

    const perPage = 25;
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedCountries,setLoadedCountries] = useState(countries.slice(0,perPage));
    const quantityElements = countries.length;

    const handleLoadMoreCountries = ()=>{

        setLoadedCountries(countries.slice(0,perPage*(currentPage)));

        const remaingCountries = quantityElements - loadedCountries.length;

        if(remaingCountries == 0){
            return;
        }

        setCurrentPage(prevPage => prevPage + 1);

        console.log({currentPage,loadedCountries,quantityElements,remainingCountries : quantityElements - loadedCountries.length})
    }

    useEffect(() => {
        setLoadedCountries(countries.slice(0,perPage));
        setCurrentPage(1);
    }, [countries])
    


    if(!countries){
        return <></>;
    }


    return (
        <>
                <table className="w-full text-left">
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Population</th>
                    <th>Area(km²)</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
                {loadedCountries && loadedCountries.map(country => {
                    return <tr key={country.cca2} data-cca2={country.cca2} data-cca3={country.cca3} className="text-white">
                        <td>
                            <ReactCountryFlag
                                countryCode={country.cca2}
                                aria-label={country.name.common}
                                svg
                                style={{
                                    width: '3em',
                                    height: '3em',
                                }}
                                title={country.name.common} />
                        </td>
                        <td><Link href={"/country/" + country.name.common}>{country.name.common}</Link></td>
                        <td>
                            {new Intl.NumberFormat().format(
                                country.population,
                            )}
                        </td>
                        <td>
                            {new Intl.NumberFormat().format(
                                country.area,
                            )}
                        </td>
                        <td>{country.region}</td>
                    </tr>
                })}
             
            </tbody>
        </table>
        <button onClick={handleLoadMoreCountries}>Ver mais</button>
        </>

        
    )
}

export default CountriesTable