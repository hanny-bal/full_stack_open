/**
 * Header Component
 * @param {course} props 
 * @returns 
 */
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

/**
 * Individual part that keeps the information for one course.
 * @param {part} props 
 * @returns 
 */
const Part = (props) => {
  return (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
  )
}

/**
 * Component that keeps the core content of the courses.
 * @param {parts} props 
 * @returns 
 */
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}


/**
 * Component that keeps the total number of exercises.
 * @param {*} props 
 * @returns 
 */
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

/**
 * Main app component
 * @returns  the main app HTML code */
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
      }
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

export default App