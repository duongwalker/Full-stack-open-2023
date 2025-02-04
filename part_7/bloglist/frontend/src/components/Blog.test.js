/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render title and author', () => {
    const newBlog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is URL',
        likes: 3,
    }

    render(<Blog blog={newBlog} />)
    const checkedDisplay = screen.getByText('This is Title This is Author')
    expect(checkedDisplay).toBeDefined()
})

test('click the button to show URL and likes', async () => {
    const newBlog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is URL',
        likes: 3,
    }
    const userr = {
        name: 'Duong',
    }

    const component = render(<Blog blog={newBlog} user={userr} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText('This is Title')).toBeInTheDocument()
    expect(screen.getByText('likes 3')).toBeInTheDocument()
})

test('calls the like event handler twice when the like button is clicked twice', async () => {
    const newBlog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is URL',
        likes: 3,
    }
    const userr = {
        name: 'Duong',
    }
    const mockUpdateLike = jest.fn()
    const component = render(
        <Blog blog={newBlog} user={userr} updateBlog={mockUpdateLike} />,
    )
    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockUpdateLike).toHaveBeenCalledTimes(2)
})

test('calls the event handler with the right details when a new blog is created', () => {
    // Create a mock event handler function for creating a new blog
    const mockCreateBlog = jest.fn()

    const component = render(<BlogForm createBlog={mockCreateBlog} />)

    // Fill out the form fields with test data
    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const likesInput = screen.getByLabelText('likes:')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://example.com' } })
    fireEvent.change(likesInput, { target: { value: '5' } })

    // Simulate a form submission
    const createButton = screen.getByText('create')
    fireEvent.click(createButton)

    // Assert that the mock event handler has been called with the expected details
    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://example.com',
        likes: '5',
    })
})
