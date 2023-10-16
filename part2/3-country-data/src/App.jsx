import {useState, useEffect} from 'react';
//import axios from 'axios';

const SearchResult = ({searches, onClick}) => (
    <div>
        {searches.length === 0 ? (
            <p>No matches found.</p>
        ) : (
            searches.map(search => (
                <div key={search.name}>
                    {search.name} {search.number}
                    <button onClick={() => onClick(search.name)} type="submit">delete</button>
                </div>
            ))
        )}
    </div>
);


const App = () => {

    const countriesArr = [
        {
            "name": {
                "common": "Kuwait",
                "official": "State of Kuwait",
                "nativeName": {
                    "ara": {
                        "official": "دولة الكويت",
                        "common": "الكويت"
                    }
                }
            }
        },
        {
            "name": {
                "common": "Austria",
                "official": "Republic of Austria",
                "nativeName": {
                    "bar": {
                        "official": "Republik Österreich",
                        "common": "Österreich"
                    }
                }
            }
        },
        {
            "name": {
                "common": "Australia",
                "official": "Australia",
                "nativeName": {
                    "bar": {
                        "official": "Australia",
                        "common": "Australia"
                    }
                }
            }
        }, {
            "name": {
                "common": "Canada",
                "official": "Canada",
                "nativeName": {
                    "bar": {
                        "official": "Canada",
                        "common": "Canada"
                    }
                }
            }
        }
    ]


    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [resultCountries, setResultCountries] = useState([]);


/*    useEffect(() => {
        console.log('effect run')

        // skip if country is not defined
        if (countries) {
            console.log('fetching countries ... ')

            setCountries(...countriesArr);
        }
    }, [countries]);*/

    /*    useEffect(() => {
            console.log('effect run')

            // skip if country is not defined
            if (country) {
                console.log('fetching countries ... ')
                axios
                    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                    .then(response => {
                        setCountry(response.data)
                    })
            }
        }, [])*/


        const handleSearchChange = (event) => {
            console.log(event.target.value);

            setSearchString(event.target.value);
            searchCountry(event.target.value);
        };


       const searchCountry = (str) => {
           setResultCountries(
               countriesArr.filter(country =>
                   country.name.common.toLowerCase().includes(str.toLowerCase())
               )
           );
       };


    return (
        <div>
            <div>
                Find countries: <input value={searchString} onChange={handleSearchChange}/>
            </div>

            {resultCountries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <br/>
                </div>
            )}
        </div>
    )
}

export default App