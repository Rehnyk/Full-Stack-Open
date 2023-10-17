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


            <img src={country.flags.svg} alt={country.flags.alt} className="flag"/>


            {renderListIfMultiple('Timezone', country.timezones)}

        </div>
    )
}

export default Country;