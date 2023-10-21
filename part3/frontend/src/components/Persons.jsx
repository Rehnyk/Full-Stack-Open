
const Persons = ({persons, onClick}) =>
    <div>
        {persons.map(person =>
            <div key={person.name}>
                {person.name} {person.number} <button onClick={() => onClick(person.name)} type="submit">Delete</button>
            </div>
        )}
    </div>

export default Persons;