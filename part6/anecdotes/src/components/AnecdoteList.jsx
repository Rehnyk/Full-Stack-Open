import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer.js'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.includes(state.filter));
    })

    const vote = (id) => {
        dispatch(addVote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteForm