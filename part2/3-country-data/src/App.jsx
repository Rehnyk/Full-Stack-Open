import {useState, useEffect} from 'react';
import axios from 'axios'

const SearchResult = ({searches, onClick}) => (
    <div>
        {searches.length > 10 ? (
            <div>
                Too many matches, specify another filter.
            </div>
        ) : searches.length === 1 ? (
            <Country {...searches[0]} />
        ) : (
            searches.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <br/>
                </div>
            )
        )}
    </div>
);


const Country = (country) => {
    const languageNames = Object.values(country.languages);
    const renderListIfMultiple = (label, array) => {
        if (array.length === 1) {
            return <p>{label}: {array[0]}</p>;
        } else if (array.length > 1) {
            return (
                <div>
                    <p>{label}s:</p>
                    <ul>
                        {array.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    };
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Official Name: {country.name.official}</p>

            {renderListIfMultiple('Capital', country.capital)}
            <p>Area: {country.area} km²</p>
            <p>Population: {country.population} </p>

            {renderListIfMultiple('Language', languageNames)}


            <img src={country.flags.svg} alt={country.flags.alt} className="flag" />


            {renderListIfMultiple('Timezone', country.timezones)}

        </div>
    )
}


const App = () => {

    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [resultCountries, setResultCountries] = useState([]);


   useEffect(() => {
        console.log('effect run')

        // skip if country is not defined
        if (countries) {
            console.log('fetching countries ... ')

            axios
                    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                    .then(response => {
          setCountries(response.data)
                    })
        }
    }, []);


        const handleSearchChange = (event) => {
            console.log(event.target.value);

            setSearchString(event.target.value);
            searchCountry(event.target.value);
        };


       const searchCountry = (str) => {

           setResultCountries(
               countries.filter(country =>
                   country.name.common.toLowerCase().includes(str.toLowerCase()) || country.name.official.toLowerCase().includes(str.toLowerCase())
               )
           );
       };


    return (
        <div>
            <div>
                Find countries: <input value={searchString} onChange={handleSearchChange}/>
            </div>

            <SearchResult searches={resultCountries} />

        </div>
    )
}

export default App