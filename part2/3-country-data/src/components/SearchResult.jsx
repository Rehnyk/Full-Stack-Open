import Country from "./Country.jsx";
const SearchResult = ({searches, onClick}) => (
    <div>
        {searches.length === 0 ? (
            <div>
                Query does not match any country.
            </div>
        ) : searches.length > 10 ? (
            <div>
                Too many matches, specify another filter.
            </div>
        ) : searches.length === 1 ? (
            <Country {...searches[0]} />
        ) : (
            searches.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => onClick(country)} type="submit">Show</button>
                    <br/>
                </div>
            )
        )}
    </div>
);

export default SearchResult;