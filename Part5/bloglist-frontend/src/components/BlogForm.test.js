import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Insert Title')
  const inputAuthor = screen.getByPlaceholderText('Insert Author')
  const inputUrl = screen.getByPlaceholderText('Insert URL')

  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'TitleTest')
  await user.type(inputAuthor, 'AuthorTest')
  await user.type(inputUrl, 'UrlTest')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('TitleTest')
  expect(createBlog.mock.calls[0][0].author).toBe('AuthorTest')
  expect(createBlog.mock.calls[0][0].url).toBe('UrlTest')
})