import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer.js';
import { setNotification, removeNotification } from '../reducers/notificationReducer.js';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.includes(state.filter));
    });

    const vote = (id, content) => {
        dispatch(addVote(id));
        dispatch(setNotification(content));

        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    };

    return (
        <div>

            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default AnecdoteList