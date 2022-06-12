import WeatherReport from "./WeatherReport"

/**
 * Component for displaying all details of a country
 * @param {*} param0 
 * @returns 
 */
 const CountryDetails = ({ country }) => {
    if(country) {
        return(
            <>
                <h2>{country.name.common}</h2>
                <p>capital  {country.capital} <br></br>area {country.area}</p>
                <h4>languages: </h4>
                <ul>
                    {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li> )}
                </ul>
                <img src={country.flags.png} />
                <WeatherReport cityName={country.capital} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
            </>
        )
    }
}

export default CountryDetails