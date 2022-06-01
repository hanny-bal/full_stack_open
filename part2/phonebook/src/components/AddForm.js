/**
 * Simple form for adding persons
 * @param param0 
 * @returns 
 */
 const AddForm = ({ onSubmit, name, number, nameHandler, numberHandler }) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            name: <input value={name} onChange={nameHandler}/>
            </div>
            <div>
            number: <input value={number} onChange={numberHandler}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddForm