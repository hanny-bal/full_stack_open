import { useState } from 'react'
import Persons from './components/Persons'
import AddForm from './components/AddForm'
import Filter from './components/Filter'

/**
 * Main app component.
 * @returns 
 */
const App = () => {
  // array of persons
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ]) 
  const [filterString, setFilterString] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  // new name and number in the input field
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }


  // add a new name to the names list
  const addPerson = (event) => {
    event.preventDefault()

    // check if a name already exists
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterString={filterString} filterHandler={handleFilterChange} />

      <h2>add a new number</h2>
      <AddForm onSubmit={addPerson} name={newName} number={newNumber} 
        nameHandler={handleNameChange} numberHandler=    {handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App