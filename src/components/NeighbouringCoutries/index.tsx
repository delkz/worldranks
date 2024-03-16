"use client"

import { apiFields, countriesApi } from '@/services/api'
import getCountryCode from '@/services/countryCode'
import Country from '@/types/countryType'
import Link from 'next/link'
import React, { cache, useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

type NeighbouringCoutriesInterface = {
  borders: Country["borders"];
}

export const getData = cache(async (slug: String) => {
  return countriesApi.get('alpha/' + slug, {
    params: {
      fullText: true,
      fields: apiFields("capital,languages,currencies,continents")
    }
  })
})

const NeighbouringCoutries = ({ borders }: NeighbouringCoutriesInterface) => {

  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await Promise.all(borders.map(async country => {
        const response = await getData(getCountryCode(country));
        return response.data;
      }));
      setCountries(countryData);
    };

    fetchCountries();
  }, [])



  return (
    <>
      {countries && countries.map(country => {
        return <Link className='neighbouring_flag' key={country.cca2} href={`./${country.name.common}`}>
          <ReactCountryFlag
            countryCode={getCountryCode(country.cca3)}
            aria-label={country.name.common}
            svg
            style={{
              width: '100px',
              height: '75px',
              borderRadius: "10px"
            }}
            title={country.name.common} />
        </Link>
      })}</>
  )
}

export default NeighbouringCoutries