import React, { useState } from "react";

const Filter = ({ persons }) => {

    const [filtered, setFiltered] = useState([])

    const filterPersons = (e) => {

        const arr = persons.filter(person => {

            const check = person.name.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value !== '';

            return filter(check, person)
        })

        if (arr.length > 0) setFiltered(arr)
        else setFiltered([])
    }

    const filter = (check, person) => {
        if (check) {
            return person
        }
    }

    const Display = () => {
        return (
            filtered.map(x => <p key={x.name}>{x.name} {x.number}</p>)
        )
    }

    return (
        <div>
            filter by name <input onChange={filterPersons} />
            <Display />
        </div>
    )
}

export default Filter