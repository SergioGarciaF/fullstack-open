import Person from "./Person";

const Agenda = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person 
          key={person.id} 
          id={person.id} 
          name={person.name} 
          number={person.number} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Agenda;
