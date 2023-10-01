const SearchResult = ({ searches }) => (
    <div>
        {searches.length === 0 ? (
            <p>No matches found.</p>
        ) : (
            searches.map(search => (
                <div key={search.name}>
                    {search.name} {search.number}
                </div>
            ))
        )}
    </div>
);


export default SearchResult;