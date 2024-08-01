import Person from "./Person"

const Agenda = ({persons}) => {
  return (
    <div>
        {persons.map((person, index) => (
          <Person key={index} name={person.name} number={person.number} />
        ))}
      </div>
  )
}

export default Agenda