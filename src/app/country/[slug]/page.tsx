import React from 'react'

interface CountryProps {
    params: {
        slug: string;
    }
}

const countryPage = ({ params }: CountryProps) => {
    const { slug } = params;
    return (
        <div>{slug}</div>
    )
}

export default countryPage