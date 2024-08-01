const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, sum) => {
    return acc + sum.exercises;
  }, 0)
  return (
    <p>The course has {totalExercises} exercises.</p>
  )
}


const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course