import { useState } from "react";
import phonebookService from "./services/phonebook";

const PersonForm = ({ persons, setPersons }) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.lenght + 1,
    };
    if (persons.some((person) => person.name === personObject.name)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `)){
        const object = persons.filter((person) => person.name === newName);
        phonebookService.update(object[0].id, personObject).then((response) => {
          phonebookService.getAll().then((response) => {
            setPersons(response.data);
          })
        });
      }
    }
    else {
      phonebookService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
