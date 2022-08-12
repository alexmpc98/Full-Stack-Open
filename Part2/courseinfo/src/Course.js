import React from 'react'

const Course = ({course}) => {
  console.log(course)
  console.log(course.parts)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)}
      />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Total of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part part={part} />)}
  </>
);

export default Course;
