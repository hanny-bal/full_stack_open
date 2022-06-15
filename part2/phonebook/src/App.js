import './index.css'

import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

/**
 * Main app component.
 * @returns 
 */
const App = () => {
  // array of persons
  const [persons, setPersons] = useState([]) 
  const [filterString, setFilterString] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // effect hook that loads the data from the json server
  useEffect(() => {
    personService.getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

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

  // delete a person
  const handleDelete = (event) => {
    if(window.confirm(`Delete ${event.target.name}?`)) {
      personService
        .deleteById(event.target.value)
        .then(response => {
          setPersons(persons.filter(person => person.id != event.target.value))
          setSuccessMessage(`Deleted ${event.target.name}`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${event.target.name} has already been removed from the server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          setPersons(persons.filter(person => person.id != event.target.value))
        })
    }
  }


  // add a new name to the names list
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    // check if a name already exists
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      if(window.confirm(`${newName} is already included in the phonebook. Do you want to replace the old number with a new one?`)) {
        const personId = persons.find(person => person.name === newName).id
        personService.update(personId, personObject)
          .then(changedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : changedPerson))
            setSuccessMessage(`Changed ${changedPerson.name }`)
            setTimeout(() => { setSuccessMessage(null) }, 5000)
          })
      }
    } else {
      // add it to the server
      personService.create(personObject)
        .then(newPerson => {
          // add it to the client list
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })     
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter filterString={filterString} filterHandler={handleFilterChange} />

      <h2>add a new number</h2>
      <AddForm onSubmit={addPerson} name={newName} number={newNumber} 
        nameHandler={handleNameChange} numberHandler=    {handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App