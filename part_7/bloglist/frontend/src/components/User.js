import { useEffect, useState } from 'react'
import BlogForm from '../components/BlogForm'
import Blog from './Blog'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import {
    Link
} from 'react-router-dom'

const User = ({ loggedInUser, logOutFunction, addBlog, updateBlog, deleteBlog }) => {
    const id = useParams().id
    const[user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const users = await userService.getAll()
            const user = users.find((user) => user.id===id)
            setUser(user)
        }

        getUser()
    }, [id])
    return <div>
        {user && (
            <div>
                <p>
                    {loggedInUser.name} logged in{' '}
                    <button onClick={logOutFunction}><Link to={'/'}>log out</Link></button>
                </p>

                <BlogForm createBlog={addBlog} />

                {user.blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                    />
                ))}
            </div>
        )}
    </div>
}

export default User
