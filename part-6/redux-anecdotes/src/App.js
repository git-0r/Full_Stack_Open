import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initializeAnecdotes, set_anecdotes } from './reducers/anecdoteSlice';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {notification.content && <Notification notification={notification} />}
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App