const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8434',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  const blogList = [
    {
      
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      likes: 10
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blogList[1])
  })
})

describe('most blogs', () => {
  const blogList = [
    {
      
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Test',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual({ author: 'Alex', blogs: 3 })
  })
})

describe('most likes', () => {
  const blogList = [
    {
      
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Test',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
    {
      title: 'Go To Statement Considered Harmful2',
      author: 'Alex',
      likes: 10
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual({ author: 'Alex', likes: 40 })
  })
})