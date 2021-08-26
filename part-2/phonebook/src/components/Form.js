import Button from "./Button"
import React, { useState } from "react";

const Form = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault();

        const namesArray = []
        persons.forEach(person => namesArray.push(person.name.toLowerCase()))

        if (namesArray.includes(newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)

        } else {
            const allPersons = [...persons].concat({ name: newName, number: newNumber })
            setPersons(allPersons)
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