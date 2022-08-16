import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteSlice";
import { notification } from "../reducers/notificationSlice";

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.notification({ text: `You voted: ${anecdote.content}`, ms: 5000 });
  };

  return props.filter
    ? [...props.anecdotes]
        .filter((anecdote) => anecdote.content.includes(props.filter))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))
    : [...props.anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ));
};

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
});

const mapDispatchToProps = {
  voteAnecdote,
  notification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
