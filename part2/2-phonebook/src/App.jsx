import {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from "./components/Filter.jsx";
import SearchResult from "./components/SearchResult.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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
            window.confirm( )

            alert(`${newName} is already added to phonebook`);
            personService
                .update(id, changedNote)
                .then(returnedNote => {
                    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
                })
                .catch(error => {
                    alert(
                        `the note '${note.content}' was already deleted from server`
                    )
                    setNotes(notes.filter(n => n.id !== id))
                })
        } else {
            personService
                .create({name: newName, number: newNumber})
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                })
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

    const deletePerson = () => {

    };

    return (
        <div>
            <h1>Phonebook</h1>

            <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>

            <h3>Search results:</h3>
            <SearchResult searches={searches} onClick{deletePerson}/>

            <h2>Add New</h2>
            <PersonForm onClick={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>

            <h2>All Numbers</h2>
            <Persons persons={persons} onClick{deletePerson}/>
        </div>
    );
};

export default App;