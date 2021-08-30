import { useState, useEffect } from "react";
import Form from "./components/Form"
import AllContacts from "./components/AllContacts";
import Filter from "./components/filter";
import personServices from "./services/persons"
import Notification from "./components/notification"
import ErrorMsg from "./components/errorMsg";

const App = () => {

  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMessage] = useState(null)


  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <Notification notification={message} />
      <ErrorMsg notification={errorMsg} />
      <h1>Phonebook</h1>
      <Filter persons={persons} />
      <h2>Add new</h2>
      <Form persons={persons} setPersons={setPersons} setMessage={setMessage} setErrorMessage={setErrorMessage} />
      <h1>Numbers</h1>
      <AllContacts persons={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  );
}

export default App;