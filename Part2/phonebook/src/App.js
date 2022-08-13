import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const [nameSearch, setNameSearch] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameSearch} onChange={event => setNameSearch(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameSearch={nameSearch}/>
    </div>
  );
};

export default App;
