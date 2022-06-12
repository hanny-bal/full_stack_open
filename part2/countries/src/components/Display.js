import CountryDetails from "./CountryDetails"
import { useState, useEffect } from 'react'

/**
 * Display country data.
 * @param {*} param0 
 * @returns 
 */
 const Display = ({ countries, countryToShow, setCountryToShow }) => {
    

    // handle a button click and show details
    const showDetails = (e) => {
        var cca3Code = e.target.value
        setCountryToShow(countries.filter(country => country.cca3==cca3Code)[0])
    }

    // only one country -> show its details

    // too many matches
    if(countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    // > 1 and <= 10 matches
    } else if(countries.length > 1) {
        return(
            <>
                {countries.map(country => 
                    <div key={country.name.common}>
                        {country.name.common} <button value={country.cca3} onClick={showDetails}>show</button>
                    </div>
                )}
                <CountryDetails country={countryToShow} />
            </>
        )
    }
    // only one match -> display data
    if(countries.length == 1) {
        return (
            <>
                <CountryDetails country={countries[0]} />
            </>
        )
    }

    
}

export default Display