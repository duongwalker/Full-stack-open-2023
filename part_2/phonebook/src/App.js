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
      id: persons.length+1
    }
    const comparisons = persons.map((person) => {
      const areEqual=isEqual(person.name.trim(), newName.trim())
      return areEqual
    })

    if(comparisons.includes(true)) {
      if(window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        persons.map((person) => {
          if(person.name.trim()===newName.trim()) {
            personService
              .update(person.id,personObject)
              .catch(error => {
                setIsSuccess(false)
                setMessage(`Information of ${person.name.trim()} has already been removed from the server`)
                setTimeout(() => {
                  setMessage(null)
                }, 3000)
              })
          }
        })
      }
    }
    else {
      if(newName!=='' && newNumber!=='') {
      personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
    if(!e.target.value) {
      setShowAll(true)
      setFilter(e.target.value)
    }
    else {
      setShowAll(false)
      setFilter(e.target.value)
    }
  }

  const deleteName= (id) => {
    const person=persons.find(person => person.id===id)
    if(window.confirm(`Delete ${person.name.trim()}?` )) {
      personService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const updateName=(id, newObject) => {
    personService
      .update(id, newObject)
  }
  
  const handleMessage = () => {
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const numbersToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} isSuccess={isSuccess}/>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      
      <PersonForm  onSubmit={addName} handleMessage={handleMessage} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {numbersToShow.map((person) => 
        <Persons onClick={() => deleteName(person.id)} key={person.name} name={person.name} number={person.number}/>)}
      </div>
    </div>
  )
}

export default App