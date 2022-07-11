const { sum } = require('lodash')
var _ = require('lodash')

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

/**
 * Receives a list of blogs and returns the one with the most likes
 * @param {*} blogs 
 */
const favoriteBlog = (blogs) => {
    // in case the list is empty
    if(blogs.length <= 0) {
        return {}
    } else if (blogs.length === 1) {
        return blogs[0]
    } else {
        // sort the array
        blogs.sort((a,b) => {
            let likesA = a.likes, likesB = b.likes

            // Compare the 2 dates
            if (likesA < likesB) return 1
            if (likesA > likesB) return -1
            return 0
        })
    
        // return the first element
        return blogs[0]
    }
}


/**
 * Returns the author with the most blogs
 * @param {*} blogs 
 */
const mostBlogs = (blogs) => {
    if(blogs.length <= 0) {
        return {}
    } else {
        return _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                author: key,
                blogs: objs.length
            }))
            .orderBy('blogs', 'desc')
            .value()[0]
    }
}

/**
 * Returns the author with the most likes
 * @param {*} blogs 
 */
 const mostLikes = (blogs) => {
    if(blogs.length <= 0) {
        return {}
    } else {
        return _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                author: key,
                likes: _.sumBy(objs, 'likes')
            }))
            .orderBy('likes', 'desc')
            .value()[0]
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}