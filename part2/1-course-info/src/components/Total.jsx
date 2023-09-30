const Total = ({parts}) => {

    const sum = parts.reduce((total, part) => total + part.exercises, 0);

    return (
        <p style={{ fontWeight: 'bold' }}>
            Number of exercises: {sum}
        </p>
    );
};
export default Total;