

const Person = ({index, name, number}) => {
  return (
    <p key={index}>{name} {number}</p>
  )
}

export default Person