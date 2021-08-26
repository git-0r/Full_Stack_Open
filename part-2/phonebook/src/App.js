import { useState, useEffect } from "react";
import Form from "./components/Form"
import AllContacts from "./components/AllContacts";
import Filter from "./components/filter";
import axios from "axios"

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} />
      <h2>Add new</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h1>Numbers</h1>
      <AllContacts persons={persons} />
    </div>
  );
}

export default App;