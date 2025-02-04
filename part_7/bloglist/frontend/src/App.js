/* eslint-disable no-unused-vars */
import { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './components/User'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState(null)
    const notiReducer = (state, action) => {
        switch (action.type) {
        case 'SUCCESS':
            return {
                noti: action.noti,
                type: 'success',
            }
        case 'ERROR':
            return {
                noti: action.noti,
                type: 'error',
            }
        default:
            return {
                noti: null,
                type: null,
            }
        }
    }

    const blogsReducer = (state, action) => {
        switch (action.type) {
        case 'SET':
            return action.blog
        case 'ADD':
            return state.concat(action.blog)
        case 'DELETE':
            return state.filter((blog) => blog.id !== action.id)
        case 'UPDATE':
            return state.map((blog) => {
                return blog.id !== action.id ? blog : action.blog
            })
        default:
            return null
        }
    }

    const userReducer = (state, action) => {
        switch (action.type) {
        case 'SET_USER':
            return action.payload
        }
    }

    const [noti, notiDispatch] = useReducer(notiReducer, {
        noti: null,
        type: null,
    })
    const [blogs, blogsDispatch] = useReducer(blogsReducer, [])
    const [user, userDispatch] = useReducer(userReducer, null)
    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
            blogsDispatch({ type: 'SET', blog: sortedBlogs })
        })
    }, [blogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET_USER', payload: user })
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            userDispatch({ type: 'SET_USER', payload: user })
            setUsername('')
            setPassword('')
        } catch (exception) {
            notiDispatch({ type: 'ERROR', noti: 'Wrong username or password' })
            setTimeout(() => {
                notiDispatch({ type: null, noti: null })
            }, 5000)
        }
    }

    const addBlog = (blogObject) => {
        console.log(blogObject)

        try {
            blogService.create(blogObject).then((returnedBlog) => {
                // setBlogs(blogs.concat(returnedBlog))
                blogsDispatch({ type: 'ADD', blog: returnedBlog })
            })
            notiDispatch({
                type: 'SUCCESS',
                noti: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            })
            setTimeout(() => {
                notiDispatch({ type: null, noti: null })
            }, 5000)
        } catch (error) {
            console.log(error.message)
            notiDispatch({ type: null, noti: null })
        }
    }

    const deleteBlog = (id) => {
        try {
            const deletedBlog = blogs.find((blog) => blog.id === id)
            if (
                window.confirm(
                    `Remove blog ${deletedBlog.title} by ${deletedBlog.author}`,
                )
            ) {
                blogService.remove(id).then(() => {
                    // setBlogs(blogs.filter((blog) => {
                    //     return blog.id !== id
                    // }))
                    blogsDispatch({ type: 'DELETE', id: id })
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const logOutFunction = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        userDispatch({ type: 'SET_USER', payload: null })
    }

    const updateBlog = (id, newBlog) => {
        try {
            blogService.update(id, newBlog).then((returnedBlog) => {
                console.log(returnedBlog)
                // setBlogs(blogs.map((blog) => {
                //     return blog.id !== id ? blog : returnedBlog
                // }))
                blogsDispatch({ type: 'UPDATE', id: id, blog: returnedBlog })
            })
            notiDispatch({
                type: 'SUCCESS',
                noti: `The blog ${newBlog.title} by ${newBlog.author} is updated`,
            })
            setTimeout(() => {
                notiDispatch({ type: null, noti: null })
            }, 5000)
        } catch (error) {
            console.log(error.message)
            notiDispatch({ type: 'ERROR', noti: error.message })
        }
    }

    return (
        <div>
            {/* {user && (
                <div>
                    <p>
                        {user.name} logged in{' '}
                        <button onClick={logOutFunction}>log out</button>
                    </p>

                    <BlogForm createBlog={addBlog} />

                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            updateBlog={updateBlog}
                            deleteBlog={deleteBlog}
                        />
                    ))}
                </div>
            )} */}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginPage
                                user={user}
                                username={username}
                                password={password}
                                setUsername={setUsername}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                noti={noti}
                                handleUsernameChange={({ target }) => setUsername(target.value)}
                                handlePasswordChange={({ target }) => setPassword(target.value)}
                            />
                        }
                    />
                    <Route path="/users" element={<Users />} />
                    <Route path='users/:id' element={<User loggedInUser={user}logOutFunction={logOutFunction} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
