const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    const listWithThreeBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'My own blog',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 4,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17e8',
            title: 'Another blog',
            author: 'unknown',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        }
    ]
  
    test('of a list of blogs is calculated right', () => {
      const result = listHelper.mostBlogs(listWithThreeBlogs)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2
      })
    })

    test('of empty list is none', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })
  })