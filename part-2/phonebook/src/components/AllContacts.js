import personService from "../services/persons"

const AllContacts = ({ persons, setPersons, setMessage }) => {

    const removePerson = person => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.remove(person.id)
            personService
                .getAll()
                .then(response => {
                    setPersons(response.data)
                })
            setMessage('Number Deleted')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        persons.map(person => {
            return <p key={person.name}>
                {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
            </p>
        })
    )
}


export default AllContacts