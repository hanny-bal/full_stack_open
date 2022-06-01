import Person from './Person'

/**
 * Displays a list of persons
 * @param {*} param0 
 */
const Persons = ({ persons }) => {
    return(
        <>
            {persons.map(person => <Person key={person.name} person={person} />)}
        </>
    )
}

export default Persons