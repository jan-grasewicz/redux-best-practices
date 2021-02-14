import React, { useState } from 'react'
import List from '@material-ui/core/List'
import { AppBar, Paper, Tab, Tabs } from '@material-ui/core'
import TodoListItem from './TodoListItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { ITodo, selectActiveTodos, selectCompletedTodos } from '../ducks/todos'
import { Filters, selectFilter, setFilter } from '../ducks/filters'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     divider: {},
//   })
// )
// const classes = useStyles()

const renderList = (todos: ITodo[]) => (
  <List>{!!todos.length && todos.map((todo) => <TodoListItem key={todo.id} {...todo} />)}</List>
)

const TodoList = () => {
  const dispatch = useDispatch()

  const activeFilter = useSelector(selectFilter)

  const allTodos = useSelector((state: RootState) => state.todos)
  const completedTodos = useSelector(selectCompletedTodos)
  const activeTodos = useSelector(selectActiveTodos)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: Filters) => {
    dispatch(setFilter(newValue))
  }

  const tabsArray = [
    { label: 'Completed', filter: Filters.SHOW_COMPLETED },
    { label: 'All', filter: Filters.SHOW_ALL },
    { label: 'Active', filter: Filters.SHOW_ACTIVE },
  ]

  return (
    <Paper>
      <AppBar position='static' color='default' elevation={0}>
        <Tabs
          value={activeFilter}
          onChange={handleChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
        >
          {tabsArray.map(({ label, filter }) => (
            <Tab label={label} value={filter} />
          ))}
        </Tabs>
      </AppBar>
      {renderList(
        activeFilter === Filters.SHOW_ACTIVE
          ? activeTodos
          : activeFilter === Filters.SHOW_COMPLETED
          ? completedTodos
          : allTodos
      )}
    </Paper>
  )
}

export default TodoList
