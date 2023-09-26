import {useState} from 'react';

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const avg = (good - bad) / all;
    const percent = (good / all) * 100;

    return (
        <div>
            <h2>Statistics</h2>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>

            <br/>
            <p>All: {all}</p>
            <p>Average: {avg}</p>
            <p>Positive: {percent} %</p>
        </div>
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

            <Button handleClick={handleGoodClick} text="good"/>
            <Button handleClick={handleNeutralClick} text="neutral"/>
            <Button handleClick={handleBadClick} text="bad"/>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    );
};

export default App
