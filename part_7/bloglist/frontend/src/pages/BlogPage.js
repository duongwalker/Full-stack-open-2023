const BlogPage = (user, logOutFunction, addBlog, blogs, updateBlog, deleteBlog) => {
    return (
        <div>
            {user && (
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
            )}
        </div>
    )
}

export default BlogPage