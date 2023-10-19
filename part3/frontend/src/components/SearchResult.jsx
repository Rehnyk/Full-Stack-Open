const SearchResult = ({ searches, onClick }) => (
    <div>
        {searches.length === 0 ? (
            <p>No matches found.</p>
        ) : (
            searches.map(search => (
                <div key={search.name}>
                    {search.name} {search.number} <button onClick={() => onClick(search.name)} type="submit">delete</button>
                </div>
            ))
        )}
    </div>
);


export default SearchResult;