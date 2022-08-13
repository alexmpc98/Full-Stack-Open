import phonebookServices from "./services/phonebook";

const Persons = ({ persons, nameSearch, setPersons }) => {
  
  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      phonebookServices.delete(id).then(() => {
        phonebookServices.getAll().then((response) => {
          setPersons(response.data);
        })
      }).catch(error => {
        alert(
          name + " was already deleted from server"
        )
      });
    }
  };

  return (
    <ul>
      {persons
        .filter(
          (p) =>
            p.name.toUpperCase().includes(nameSearch.toUpperCase()) ||
            nameSearch === ""
        )
        .map((person) => (
          <div>
            <Person name={person.name} number={person.number} />
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </div>
        ))}
    </ul>
  );
};

const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

export default Persons;
