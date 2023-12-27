import { useEffect, useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {

    const [showDetails, setShowDetails] = useState(false)
    const [trueAuthor, setTrueAuthor] = useState(true)
    const userName = user.name

    useEffect(() => {
        if (userName === blog.user[0].name) {
            setTrueAuthor(true)
        }
        else {
            setTrueAuthor(false)
        }
    }, [])


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const increaseLike = () => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }
        updateBlog(blog.id, newBlog)

    }

    const removeBlog = () => {
        deleteBlog(blog.id)
    }

    return (
        <div style={blogStyle} className='blogInfo'>
            {!showDetails && <div>
                {blog.title} {blog.author}
                <button onClick={() => setShowDetails(!showDetails)}>view</button>
            </div>
            }

            {showDetails && trueAuthor &&
                <div className='blog'>
                    <div>
                        {blog.title}
                        <button onClick={() => setShowDetails(!showDetails)}>hide</button>
                    </div>
                    <div>{blog.url} </div>
                    <div className='likes-count'>likes {blog.likes} <button onClick={increaseLike} id='like-button'>like</button></div>
                    <div>{blog.user[0].name}</div>
                    <button onClick={removeBlog}>remove</button>
                </div>
            }
            {showDetails && !trueAuthor &&
                <div className='blog'>
                    <div>
                        {blog.title}
                        <button onClick={() => setShowDetails(!showDetails)}>hide</button>
                    </div>
                    <div>{blog.url} </div>
                    <div className='likes-count'>likes {blog.likes} <button onClick={increaseLike} id='like-button'>like</button></div>
                    <div>{blog.user[0].name}</div>
                </div>
            }
        </div>
    )
}

export default Blog