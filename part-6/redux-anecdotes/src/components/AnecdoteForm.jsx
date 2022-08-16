import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteSlice";
import { notification } from "../reducers/notificationSlice";

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    props.createAnecdote(content);
    props.notification({ text: `You added: ${content}`, ms: 5000 });
    e.target.content.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input required name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote, notification })(AnecdoteForm);
