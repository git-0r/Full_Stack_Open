import React from "react";

// header renders name of the course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// content renders the parts & no. of exercises
const Content = (props) => {
  return (
    <div>
      <Part info={props.parts[0]} />
      <Part info={props.parts[1]} />
      <Part info={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.info.name} {props.info.exercises}</p>
  )
}

// total renders the total no. of exercises
const Total = (props) => {
  const exercises1 = props.parts[0].exercises
  const exercises2 = props.parts[1].exercises
  const exercises3 = props.parts[2].exercises
  const total = exercises1 + exercises2 + exercises3

  return (
    <p>Total no. of exercises {total}</p>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
