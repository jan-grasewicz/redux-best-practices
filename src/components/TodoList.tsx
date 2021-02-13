import React from 'react'
import List from '@material-ui/core/List'
import { Paper } from '@material-ui/core'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectActiveTodos, selectCompletedTodos } from '../ducks/todos'

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos)
  const completedTodos = useSelector(selectCompletedTodos)
  const activeTodos = useSelector(selectActiveTodos)
  return (
    <Paper>
      <List>{!!todos.length && todos.map((todo) => <TodoListItem key={todo.id} {...todo} />)}</List>
    </Paper>
  )
}

export default TodoList
