import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');


    const addPerson = (event) => {
        event.preventDefault();

        if(persons.some(person => person.name === newName)){
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

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            {persons.map(person =>
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            )}
        </div>
    );
};

export default App;