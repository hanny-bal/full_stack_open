/**
 * Dummy function that always returns 1
 * @param {*} blogs 
 * @returns 
 */
const dummy = (blogs) => {
    return 1
}

/**
 * Receives a list of blogs and computes the total number of likes.
 * @param {*} blogs 
 */
const totalLikes = (blogs) => {
    const sum = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes;
    }, 0)

    return sum
}
  
module.exports = {
    dummy,
    totalLikes
}