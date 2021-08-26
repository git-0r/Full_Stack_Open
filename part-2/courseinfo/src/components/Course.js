import React from 'react'

const Heading = ({ courseName }) => <h2>{courseName}</h2>

const Parts = ({ parts }) => {

    return (
        parts.map((part) => <p key={part.id}>{part.name} {part.exercises} </p>))
}

const TotalExercises = ({ parts }) => {

    const sum = parts.reduce((initialValue, part) => initialValue + part.exercises, 0)
    return <p> <b>total of {sum} exercises</b></p>
}

const Course = ({ course }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Heading courseName={course.name} />
            <Parts parts={course.parts} />
            <TotalExercises parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (courses.map((course) => <Course key={course.id} course={course} />))

}

export default Courses