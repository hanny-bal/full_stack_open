import axios from "axios"
const baseUrl = '/api/persons'

/**
 * Get all persons from the server.
 * @returns a list of all persons
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Create a new person and save it to the server.
 * @param {*} newPerson 
 * @returns the new person
 */
const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

/**
 * Delete a person by its id.
 * @param {*} id 
 * @returns 
 */
const deleteById = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

/**
 * Change a person's number based on the id.
 * @param {*} id 
 * @param {*} changedPerson 
 * @returns the changed person
 */
const update = (id, changedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, deleteById, update }