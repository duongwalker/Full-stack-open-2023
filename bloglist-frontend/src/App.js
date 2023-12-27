/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)


    useEffect(() => {
        blogService.getAll().then(blogs => {
            const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
            setBlogs(sortedBlogs)
        }
        )}, [blogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = (blogObject) => {
        console.log(blogObject)

        try {
            blogService
                .create(blogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog))
                })
            setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

        }
        catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        }
    }

    const deleteBlog = (id) => {
        try {
            blogService
                .remove(id)
                .then(() => {
                    setBlogs(blogs.filter((blog) => {
                        return blog.id !== id
                    }))
                })
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const logOutFunction = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const updateBlog = (id, newBlog) => {
        try {
            blogService
                .update(id, newBlog)
                .then(returnedBlog => {
                    console.log(returnedBlog)
                    setBlogs(blogs.map((blog) => {
                        return blog.id !== id ? blog : returnedBlog
                    }))
                })
            setSuccessMessage(`The blog ${newBlog.title} by ${newBlog.author} is updated`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        }
        catch (error) {
            console.log(error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification errorMessage={errorMessage} successMessage={successMessage} />
            {!user &&


        // </p>
        <Togglable buttonLabel="log in">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
            />
        </Togglable>
            }

            {user &&
              <div>
                  <p>{user.name} logged in <button onClick={logOutFunction}>log out</button></p>

                  <BlogForm createBlog={addBlog} />

                  {blogs.map(blog =>
                      <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
                  )}
              </div>
            }

        </div>
    )
}

export default App