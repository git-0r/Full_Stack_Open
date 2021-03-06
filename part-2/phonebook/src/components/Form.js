import Button from "./Button"
import React, { useState } from "react";
import personService from "../services/persons"

const Form = ({ persons, setPersons, setMessage, setErrorMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault();

        persons.forEach(person => {

            if (person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber) {
                alert(`${newName} is already added to phonebook`)
            }
            else if (person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber) {

                const updateChoice = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

                if (updateChoice) {
                    const id = person.id

                    personService
                        .update(person.id, { name: person.name, number: newNumber })
                        .then(response => {
                            setPersons(persons.map(person => person.id !== id ? person : response.data))

                            setMessage('Number Updated')
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                        .catch(error => {
                            setErrorMessage(
                                `Information of ${person.name} has already been removed from server`
                            )
                        })
                }
            }
        })

        const namesArray = []
        persons.forEach(person => namesArray.push(person.name.toLowerCase()))

        if (!namesArray.includes(newName.toLowerCase())) {
            personService
                .create({ name: newName, number: newNumber })
                .then(response => {
                    setPersons([...persons].concat(response.data))
                    setMessage('Number Added')
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                name: <input value={newName} onChange={(e) => setNewName(e.target.value)} required />
            </div>
            <div>
                number: <input type="number" onChange={(e) => setNewNumber(e.target.value)} required />
            </div>
            <div>
                <Button text="add" type="submit" />
            </div>
        </form>
    )
}

export default Form