const Header = ({ course }) => <h2>{course}</h2>
const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part}/>
    )}
  </>


/**
 * Course component that displays the course details.
 * @param { course } param0 
 * @returns 
 */
const Course = ({ course }) => {
  // compute the sum of exercises
  const sum = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course