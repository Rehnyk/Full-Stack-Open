import {useState, useEffect} from 'react';
import Filter from "./components/Filter.jsx";
import SearchResult from "./components/SearchResult.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searches, setSearches] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [notification, setNotification] = useState(null)


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
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

        // Change the number
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with the new one?`)) {
                personService
                    .update(existingPerson.id, { ...existingPerson, number: newNumber })
                    .then(returnedPerson => {
                        setPersons(persons.map(person => (person.id !== existingPerson.id ? person : returnedPerson)));

                        setNotification(`Number for ${existingPerson.name} has been changed.`)
                        setTimeout(() => {setNotification(null)}, 5000)
                    })
                    .catch(error => {
                        alert('Failed to update the person. The person might have been deleted from the server.');
                    });
            }
        } else {
            personService
                .create({ name: newName, number: newNumber })
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');

                    setNotification(`${newName} has been added in the phonebook`)
                    setTimeout(() => {setNotification(null)}, 5000)

                })
                .catch(error => {
                    alert('Failed to add a new person.');
                });
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

    const deletePerson = (name) => {
        const findPerson = persons.find(person => person.name === name);


        personService
            .deletePerson(findPerson.id)
            .then(() =>    {
                setPersons(persons.filter(person => person.id !== findPerson.id));
                setSearches(searches.filter(person => person.id !== findPerson.id));
            })
            .catch(error => {
                alert('Failed to delete the person. The person might have been deleted from the server.');
            });
    };

    return (
        <div>
            <Notification message={notification} />
            <h1>Phonebook</h1>
            <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>

            <h3>Search results:</h3>
            <SearchResult searches={searches} onClick={(name) => deletePerson(name)}/>

            <h2>Add New</h2>
            <PersonForm onClick={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>

            <h2>All Numbers</h2>
            <Persons persons={persons} onClick={(name) => deletePerson(name)}/>
        </div>
    );
};

export default App;