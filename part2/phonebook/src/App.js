import { useState } from 'react'


/**
 * Main app component.
 * @returns 
 */
const App = () => {
  // array of persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  // new name in the input field
  const [newName, setNewName] = useState('')

  // handle a change of name in the input field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // add a new name to the names list
  const addPerson = (event) => {
    event.preventDefault()

    // check if a name already exists
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App