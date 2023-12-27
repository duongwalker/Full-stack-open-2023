/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const addBlog = (e) => {
        e.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
            likes: likes,
        }
        createBlog(blogObject)
    }

    return (
        <Togglable buttonLabel="new blog">
            <form onSubmit={addBlog}>
                <h2>create new</h2>
                <div>
                    <label htmlFor="title">title:</label>
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        id='title'
                    />
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        id='author'
                    />
                </div>
                <div>
                    <label htmlFor="url">url:</label>
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        id='url'
                    />
                </div>
                <div>
                    <label htmlFor='likes'>likes:</label>
                    <input
                        type='number'
                        value={likes}
                        name="Likes"
                        onChange={({ target }) => setLikes(target.value)}
                        id='likes'
                    />
                </div>
                <button type='submit' id='create'>create</button>
            </form>
        </Togglable>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm