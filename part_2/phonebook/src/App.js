import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(true)

  const generateId = () => {
    const min = persons.length
    const max = 999999
    const id = Math.floor(Math.random() * (max - min + 1)) + min
    return id
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  })

  const addName = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    }
    const comparisons = persons.map((person) => {
      const areEqual = isEqual(person.name.trim(), newName.trim())
      return areEqual
    })

    if (comparisons.includes(true)) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        persons.map((person) => {
          if (person.name.trim() === newName.trim()) {
            console.log('Helooooooo')


            updateName(person.id, personObject)
          }
        })
      }
      else {
        setMessage(null)
      }
    }
    else {
      if (newName !== '' && newNumber !== '') {
        personService
          .create(personObject)
          .then((response) => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data.error)
            setIsSuccess(false)
            setMessage(error.response.data.error)
          })
      }

      else if (newNumber.length<8) {
        setMessage()
      }

      else {
        alert('Please fill in the name and number!')
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)

  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setShowAll(true)
      setFilter(e.target.value)
    }
    else {
      setShowAll(false)
      setFilter(e.target.value)
    }
  }

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name.trim()}?`)) {
      personService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const updateName = (id, newObject) => {
    personService
      .update(id, newObject)
      .then(returnedPerson => {
        if (returnedPerson.data === null) {
          setIsSuccess(false)
          setMessage(`Information of ${newObject.name.trim()} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        else {
          console.log(returnedPerson)
          setPersons(persons.map(person => {
            return person.id !== id ? person : returnedPerson
          }))
        }
      })
      .catch(error => {
        console.log(error.response.data.error)
        setIsSuccess(false)
        setMessage(error.response.data.error)
      })
  }

  const handleMessage = () => {
    if (newName.trim().length === 0) {
      setMessage(null)
    }
    else {
      setIsSuccess(true)
      setMessage(`Added ${newName}`)
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const numbersToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} isSuccess={isSuccess} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>

      <PersonForm onSubmit={addName} handleMessage={handleMessage} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {numbersToShow.map((person) =>
          <Persons onClick={() => deleteName(person.id)} key={person.name} name={person.name} number={person.number} />)}
      </div>
    </div>
  )
}

export default App