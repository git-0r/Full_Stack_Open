import React from 'react'

const Heading = ({ courseName }) => <h1>{courseName}</h1>

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