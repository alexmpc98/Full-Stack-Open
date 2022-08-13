import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import phonebookService from "./services/phonebook";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message,setMessage] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [nameSearch, setNameSearch] = useState("");

  return (
    <div>
      {message && <Notification message={message} error={error}></Notification>}
      <h2>Phonebook</h2>
      <Filter
        value={nameSearch}
        onChange={(event) => setNameSearch(event.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setError={setError}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameSearch={nameSearch} setPersons={setPersons}/>
    </div>
  );
};

export default App;
