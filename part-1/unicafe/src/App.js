import React, { useState } from 'react'

const Heading = ({ heading }) => <h1>{heading}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ stats }) => {

  if (stats.all > 0) {
    return (
      <table>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />
        <StatisticLine text="all" value={stats.all} />
        <StatisticLine text="average" value={stats.average.toFixed(2)} />
        <StatisticLine text="positive" value={stats.positive.toFixed(2)} />
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  const statsObj = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  const goodClickHandler = newValue => {
    setGood(newValue)
  }
  const neutralClickHandler = newValue => {
    setNeutral(newValue)

  }
  const badClickHandler = newValue => {
    setBad(newValue)

  }

  return (
    <div>
      <Heading heading='give feedback' />
      <Button text='good' handleClick={() => goodClickHandler(good + 1)} />
      <Button text='neutral' handleClick={() => neutralClickHandler(neutral + 1)} />
      <Button text='bad' handleClick={() => badClickHandler(bad + 1)} />
      <Heading heading='statics' />
      <Statistics stats={statsObj} />
    </div>
  );
}

export default App;