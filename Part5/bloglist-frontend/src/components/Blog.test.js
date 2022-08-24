import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
    author: 'Alex',
    title: 'abc',
    url: '123',
    likes: 0
  }

test('renders content', () => {
  const component = render(<Blog blog={blog} />)
  const div = component.container.querySelector('.blogVisible')
  expect(div).toBeDefined()
  expect(div).toBeVisible()
  expect(div).toHaveTextContent(blog.author, blog.title)
})

test('clicking the button calls event handler once', async () => {
    const component = render(<Blog blog={blog}/>)

    const user = userEvent.setup()

    const button = component.getByText('View More')
    await user.click(button)

    const showAll = component.container.querySelector('.showAll')
    expect(showAll).toBeVisible()
    expect(showAll).toHaveTextContent(`${blog.url}`)
    expect(showAll).toHaveTextContent(`${blog.likes}`)
})
  
test('click like button twice and likes add twice', async () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} addLikeBlog={mockHandler}/>)
  
    const user = userEvent.setup()

    const button = component.getByText('View More')
    await user.click(button)

    const showAll = component.container.querySelector('.showAll')
    expect(showAll).toBeVisible()

    const likeButton = component.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})