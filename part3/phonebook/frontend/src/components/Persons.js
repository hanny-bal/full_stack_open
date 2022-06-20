import Person from './Person'

/**
 * Displays a list of persons
 * @param {*} param0 
 */
const Persons = ({ persons, handleDelete }) => {
    return(
        <>
            {persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
        </>
    )
}

export default Persons