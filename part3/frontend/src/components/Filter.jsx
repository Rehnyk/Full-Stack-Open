
const Filter = ({ searchName, handleSearchChange }) =>
    <div>
            Search Name: <input value={searchName} onChange={handleSearchChange}/>
    </div>;

export default Filter;