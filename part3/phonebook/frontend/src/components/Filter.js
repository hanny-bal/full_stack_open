/**
 * Filtering mechanism for the names.
 * @param {*} param0 
 * @returns 
 */
const Filter = ({ filterString, filterHandler }) => {
    return(
        <div>
            filter shown with <input value={filterString} onChange={filterHandler}/>
        </div>
    )
}

export default Filter