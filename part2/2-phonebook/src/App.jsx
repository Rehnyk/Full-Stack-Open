import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./components/Filter.jsx";
import SearchResult from "./components/SearchResult.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])


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

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const nameObj = { name: newName, number: newNumber };
            setPersons(persons.concat(nameObj));
            setNewName('');
            setNewNumber('');
        }
    };
    const searchNames = (name) => {
        const lowercaseSearchName = name.toLowerCase();
        setSearches(
            persons.filter(person =>
                lowercaseSearchName.length > 0 && person.name.toLowerCase().startsWith(lowercaseSearchName)
            )
        );
    };

        return (
            <div>
                <h1>Phonebook</h1>

                <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>

                <h3>Search results:</h3>
                <SearchResult searches={searches}/>

                <h2>Add New</h2>
                <PersonForm onClick={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

                <h2>All Numbers</h2>
               <Persons persons={persons}/>
            </div>
        );
    };

    export default App;