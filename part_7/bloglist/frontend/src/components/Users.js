import { useEffect, useState } from 'react'
import userService from '../services/users'
import {
    Link
} from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        try {
            const fetchedUsers = await userService.getAll()
            setUsers(fetchedUsers)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <h1>Users</h1>
            <table>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id} className='left-align'>
                                <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default Users

// <Link to={`/notes/${note.id}`}>{note.content}</Link>