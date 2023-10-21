const PersonForm = ({ name, number, handleNameChange, handleNumberChange, onClick }) =>

    <div>
        <form onSubmit={onClick}>
            <div>
                Name: <input value={name} onChange={handleNameChange}/>
            </div>
            <div>
                Number: <input value={number} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </div>;


export default PersonForm;