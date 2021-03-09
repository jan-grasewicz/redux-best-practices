import React from 'react'
import { createStyles, List, makeStyles, Theme } from '@material-ui/core'
import { ITodo } from '../ducks/todos'
import TodoListItem from './TodoListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: { height: 'calc(100vh - 224px)', minHeight: '192px', overflowY: 'auto' },
  })
)

const TodoList: React.FC<{ todos: ITodo[] }> = ({ todos }) => {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      {!!todos.length && todos.map((todo) => <TodoListItem key={todo.id} {...todo} />)}
    </List>
  )
}

export default TodoList
