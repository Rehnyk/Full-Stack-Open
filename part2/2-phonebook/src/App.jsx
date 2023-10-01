import {useState} from 'react';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');


    const addPerson = (event) => {
        event.preventDefault();

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const nameObj = {name: newName, number: newNumber};
            setPersons(persons.concat(nameObj));
            setNewName('');
            setNewNumber('');
        }
    };

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setSearchName(event.target.value);
        searchNames(event.target.value);
    };

    const searchNames = (name) => {
        const lowercaseSearchName = name.toLowerCase();
        setSearches(
            persons.filter(person =>
                person.name.toLowerCase().startsWith(lowercaseSearchName)
            )
        );
    };

        return (
            <div>
                <h1>Phonebook</h1>

                <div>
                    Search Name: <input value={searchName} onChange={handleSearchChange}/>
                </div>

                <h3>Search results:</h3>
                {searches.length === 0 ? (
                    <p>No matches found.</p>
                ) : (
                    searches.map(search => (
                        <div key={search.name}>
                            {search.name} {search.number}
                        </div>
                    ))
                )}

                <h2>Add New</h2>
                <form onSubmit={addPerson}>
                    <div>
                        Name: <input value={newName} onChange={handleNameChange}/>
                    </div>
                    <div>
                        Number: <input value={newNumber} onChange={handleNumberChange}/>
                    </div>
                    <div>
                        <button type="submit">Add</button>
                    </div>
                </form>

                <h2>All Numbers</h2>
                {persons.map(person =>
                    <div key={person.name}>
                        {person.name} {person.number}
                    </div>
                )}
            </div>
        );
    };

    export default App;