import {useState} from 'react';

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const avg = (good - bad) / all;
    const percent = (good / all) * 100;

    if (all === 0) {
        return (
            <div>
                No feedback given.
            </div>
        );
    }
    return (
        <div>
            <table>
                <tbody>
                <StatisticLine text="Good:" value={good}/>
                <StatisticLine text="Neutral:" value={neutral}/>
                <StatisticLine text="Bad:" value={bad}/>
                <StatisticLine text="All:" value={all}/>
                <StatisticLine text="Average:" value={avg}/>
                <StatisticLine text="Positive" value={percent}/>
                </tbody>
            </table>
        </div>
    );
};

const StatisticLine = ({text, value}) => {
    if (text === "Positive:") {
        return (
            <tr>
                <td>{text} </td>
                <td>{value} %</td>
            </tr>
        );
    }
    return (
        <tr>
            <td>{text} </td>
            <td>{value}</td>
        </tr>
    );
};

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    };

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };

    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>Give Us Feedback!</h1>

            <Button handleClick={handleGoodClick} text="Good"/>
            <Button handleClick={handleNeutralClick} text="Neutral"/>
            <Button handleClick={handleBadClick} text="Bad"/>

            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>


        </div>
    );
};

export default App
