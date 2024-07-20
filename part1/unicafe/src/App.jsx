import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Opinions = ({ text, quantity }) => {
  return (
    <>
      {/**Cantidad de opiniones */}
      <p>{text} {quantity}</p>
    </>
  );
};

const Statistics = ({total, average, positive}) => {
  return(
    <>
    <p>total {total}</p>
    <p>average {average}</p>
    <p>positive {positive}%</p>
    </>
  );
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    const newAverage = (newGood - bad) / newTotal;
    const newPositive = (newGood / newTotal) * 100;

    setGood(newGood);
    setTotal(newTotal);
    setAverage(newAverage);
    setPositive(newPositive);
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;

    setNeutral(newNeutral);
    setTotal(newTotal);
    setAverage((good - bad) / newTotal);
    setPositive((good / newTotal) * 100);
  }

  const handleBad = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    const newAverage = (good - newBad) / newTotal;
    const newPositive = (good / newTotal) * 100;

    setBad(newBad);
    setTotal(newTotal);
    setAverage(newAverage);
    setPositive(newPositive);
  }
  

  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>Statistics</h1>
      <Opinions text='good' quantity={good} />
      <Opinions text='neutral' quantity={neutral} />
      <Opinions text='bad' quantity={bad} />
      <Statistics total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App