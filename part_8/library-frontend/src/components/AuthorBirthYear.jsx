import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import Select from 'react-select';

const AuthorBirthYear = (authors) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    console.log(authors.authors)

    const [editAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const authorNames = authors.authors.map((a) => {
        return {
            value: a.name,
            label: a.name
        }
    })
    
    const submit = async (event) => {
        event.preventDefault()

        console.log('edit author...')
        editAuthor({ variables: { name, setBornTo: born } })
        setName('')
        setBorn('')
    }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <Select options={authorNames} onChange={(selectedOption) => setName(selectedOption.value)} />
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default AuthorBirthYear