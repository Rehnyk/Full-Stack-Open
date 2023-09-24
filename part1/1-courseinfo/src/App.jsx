const Header = (props) => {

    return (
        <div>
            <p>
                {props.course}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.part1} exercises={props.exercises1} />
            <Part name={props.part2} exercises={props.exercises2} />
            <Part name={props.part3} exercises={props.exercises3} />
        </div>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};

const Total = (props) => {

    return (
        <div>
            <p>
                Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
            </p>
        </div>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>

            <Content part1={part1} exercises1={exercises1}/>
            <Content part2={part2} exercises2={exercises2}/>
            <Content part3={part3} exercises3={exercises3}/>

            <Total exercise1={exercises1} exercise2={exercises2} exercise3={exercises3}/>
        </div>
    )
}

export default App