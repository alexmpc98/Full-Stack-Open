const Persons = ({persons, nameSearch}) => {
  return (
    <ul>
      {persons
        .filter(
          (p) =>
            p.name.toUpperCase().includes(nameSearch.toUpperCase()) ||
            nameSearch === ""
        )
        .map((person) => (
          <Person name={person.name} number={person.number} />
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