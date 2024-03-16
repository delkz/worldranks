import { apiFields, countriesApi } from '@/services/api';
import getCountryCode from '@/services/countryCode';
import { CountryInfo } from '@/types/countryType';
import React from 'react'
import ReactCountryFlag from 'react-country-flag';
import style from './style.module.scss';
import { cache } from 'react'

interface CountryProps {
    params: {
        slug: string;
    }
}

export const getData = cache(async (slug: String) => {
    return countriesApi.get('name/' + slug, {
        params: {
            fullText: true,
            fields: apiFields("capital,languages,currencies,continents")
        }
    })
})

const countryPage = async ({ params }: CountryProps) => {
    const { slug } = params;


    const countriesQ = await getData(slug);
    const country: CountryInfo = await countriesQ.data[0];

    if (!country) {
        return <></>
    }

    return <div className="container countryPage">
        <div className='text-center'>

            <div className={"flag " + style.flag}>
                <ReactCountryFlag
                    countryCode={country.cca2}
                    aria-label={country.name.common}
                    svg
                    style={{
                        width: '290px',
                        height: '220px',
                        borderRadius: "15px"
                    }}
                    title={country.name.common} />
            </div>

            <div className="names my-[28px]">
                <h1 className='names_common text-xl'>{country.name.common}</h1>
                <div className='names_official'>{country.name.official}</div>
            </div>

            <div className="infos flex gap-8 justify-center items-center">
                <div className={'infos_item ' + style.stats}>
                    <span className={'infos_item--label '}>Population</span>
                    <div className={style.divider}></div>
                    {new Intl.NumberFormat().format(
                        country.population,
                    )}

                </div>
                <div className={'infos_item ' + style.stats}>
                    <span className={'infos_item--label '}>Area (km²)</span>
                    <div className={style.divider}></div>
                    {new Intl.NumberFormat().format(
                        country.area,
                    )}
                </div>
            </div>

            <table className={style.infoTable + " mt-8"}>
                <tbody>
                    <tr>
                        <td>
                            Capital
                        </td>
                        <td>
                            {country.capital[0]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Subregion
                        </td>
                        <td>
                            {country.subregion}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Language
                        </td>
                        <td className={style.tdList}>
                            {Object.entries(country.languages).map(([key, language]) => {
                                return <span key={key}>{language}</span>
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Currencies
                        </td>
                        <td>
                            {Object.entries(country.currencies).map(([abreviation, currencie]) => {
                                return <span key={abreviation}>{currencie.name}</span>
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Continents
                        </td>
                        <td className={style.tdList}>
                            {country.continents.map(continent => {
                                return continent
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="neighbouring text-left mt-5">
                <span className='neighbouring_title'>
                    Neighbouring countries
                </span>

                <div className='flex gap-3 text-left mt-3'>


                    {country.borders.map(border => {
                        return <div className='neighbouring_flag' key={border}>
                            <ReactCountryFlag
                                countryCode={getCountryCode(border)}
                                aria-label={border}
                                svg
                                style={{
                                    width: '100px',
                                    height: '75px',
                                    borderRadius: "10px"
                                }}
                                title={border} />
                        </div>
                    })}


                </div>

            </div>
        </div>
    </div>



}

export default countryPage