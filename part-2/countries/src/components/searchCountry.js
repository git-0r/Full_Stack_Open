import React, { useState, useEffect } from "react"
import axios from "axios"
import Weather from "./weather"

const SearchCountry = () => {

    const [searchResults, setSearchResults] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const countriesData = response.data
                setCountries(countriesData)
            })
    }, [])

    const filterCountries = (e) => {
        let searchTerm;
        if (e.target.value !== '') searchTerm = e.target.value.toLowerCase()

        const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchTerm))

        showResults(filteredCountries)
    }

    const showResults = (filteredCountries) => {

        const results = filteredCountries.map(country => {

            return (<p key={country.name}>{country.name} <button onClick={() => showCountryInfo(country)}>show</button>
            </p>)
        })

        if (results.length === 1) {
            showCountryInfo(filteredCountries[0])
        }
        else if (results.length > 9) {
            setSearchResults([<p key="warn">Too many matches, specify another filter</p>])
        }
        else setSearchResults(results)
    }

    const showCountryInfo = (country) => {
        console.log("info", country)

        const name = country.name
        const capital = country.capital
        const population = country.population
        const languages = country.languages
        const flag = country.flag

        setSearchResults([
            <h1 key={name}>{name}</h1>,
            <p key={capital}>Capital - {capital}</p>,
            <p key={population}>Population - {population}</p>,
            <h2 key="heading">Languages</h2>,
            <Languages languagesArray={languages} key="languages" />,
            <img src={flag} alt="flag" key="flag" style={{ width: "200px" }}></img >,
            <Weather key="weather" capital={capital} />

        ])
    }

    const Languages = ({ languagesArray }) => {

        const languages = languagesArray.map(language => <li key={language.name}>{language.name}</li>)

        return <ul> {languages} </ul>
    }

    return (
        <div>
            find Countries <input type="text" onChange={filterCountries}></input>
            <div>
                {searchResults}
            </div>
        </div>
    )
}

export default SearchCountry