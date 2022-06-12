import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Display from './components/Display'
import axios from 'axios'


const App = () => {
  // states of the app
  const [countryToShow, setCountryToShow] = useState(null)
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')  
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))

  // handle a filter change
  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
    setCountryToShow(null)
  }

  // effect hook that loads the country data from the server
  useEffect(() => {
    console.log("loading countries from server...")
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
    <>
      <Filter filterString={filterString} filterHandler={handleFilterChange} />
      <Display countries={countriesToShow} countryToShow={countryToShow} setCountryToShow={setCountryToShow} />
    </>
  )
}

export default App;
