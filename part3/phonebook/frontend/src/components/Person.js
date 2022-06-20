/**
 * Simple personinfo
 * @param {*} param0 
 * @returns 
 */
const Person = ({ person, handleDelete }) => {
    return(
        <div key={person.id}>{person.name} {person.number}<button value={person.id} name={person.name} onClick={handleDelete}>delete</button></div>
    )
}

export default Person