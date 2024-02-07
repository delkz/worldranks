'use client';

import Country from '@/types/countryType';
import Link from 'next/link';
import React, { useState } from 'react'
import ReactCountryFlag from 'react-country-flag';

type CountriesTableProps = {
    countries: Country[]
}

const CountriesTable = ({ countries }: CountriesTableProps) => {
    return (
        <table className="w-full text-left">
            <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area(km²)</th>
                <th>Region</th>
            </tr>
            {countries && countries.map(country => {
                return <tr key={country.cca2} className="text-white">

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
                    <td><Link href={"/country/"+country.name.common}>{country.name.common}</Link></td>
                    <td>{country.population}</td>
                    <td>{country.area}</td>
                    <td>{country.region}</td>

                </tr>
            })}
        </table>
    )
}

export default CountriesTable