const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('If blogs is empty return 0 likes', () => {
    const emptyBlogs = []

    const result = listHelper.totalLikes(emptyBlogs)
    assert.strictEqual(result, 0)
  })
  test('If only exists one blog return the likes of unique blog', () => {
    const blogs = [{
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 7)
  })
  test('If are more than 1 blog shows the total likes of all blogs', () => {
    const blogs = [
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 22)
  })
})
