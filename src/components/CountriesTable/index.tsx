'use client';

import Country from '@/types/countryType';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import TableItemSkeleton from './TableItemSkeleton';
import style from './style.module.scss';

type CountriesTableProps = {
    countries: Country[];
};

const CountriesTable = ({ countries }: CountriesTableProps) => {
    const perPage = 25;
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedCountries, setLoadedCountries] = useState<Country[]>([]);

    useEffect(() => {
        loadCountries();
    }, [countries, currentPage]);

    const loadCountries = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setLoadedCountries(countries.slice(0, perPage * currentPage));
            setLoadingMore(false);
        }, 500);
    };

    const handleScroll = () => {
        const table = document.getElementById("countryTable");
        if (!table) {
            return;
        }

        if (loadedCountries.length === countries.length) {
            setLoadingMore(false);
            return;
        }

        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        const distanciaAteOFim = scrollHeight - clientHeight - scrollTop;

        if (distanciaAteOFim === 0 && !loadingMore && loadedCountries.length !== countries.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [countries.length, loadedCountries.length, loadingMore]);

    const showSkeletons = (count = perPage) => {
        const skeletons = [];
        for (let i = 0; i < count; i++) {
            skeletons.push(<TableItemSkeleton key={i} />);
        }
        return skeletons;
    };

    if (!countries) {
        return null;
    }

    return (
        <table className={`${style.table} w-full text-left`}>
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Population</th>
                    <th>Area(km²)</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody id="countryTable">
                {loadedCountries.map(country => (
                    <tr key={country.cca2} data-cca2={country.cca2} data-cca3={country.cca3} className="text-white">
                        <td>
                            <ReactCountryFlag
                                countryCode={country.cca2}
                                aria-label={country.name.common}
                                svg
                                style={{
                                    width: '3em',
                                    height: '3em',
                                }}
                                title={country.name.common}
                            />
                        </td>
                        <td><Link href={`/country/${country.name.common}`}>{country.name.common}</Link></td>
                        <td>{new Intl.NumberFormat().format(country.population)}</td>
                        <td>{new Intl.NumberFormat().format(country.area)}</td>
                        <td>{country.region}</td>
                    </tr>
                ))}
                {loadingMore && showSkeletons()}
            </tbody>
        </table>
    );
};

export default CountriesTable;
