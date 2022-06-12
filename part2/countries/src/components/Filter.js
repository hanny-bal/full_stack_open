/**
 * Filtering mechanism for the names.
 * @param {*} param0 
 * @returns 
 */
 const Filter = ({ filterString, filterHandler }) => {
    return(
        <div>
            find countries <input value={filterString} onChange={filterHandler}/>
        </div>
    )
}

export default Filter