const AllContacts = ({ persons }) => {
    return (
        persons.map(person => {
            return <p key={person.name}>{person.name} {person.number}</p>
        })
    )
}


export default AllContacts