import React from 'react'
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { selectActiveTodos, selectCompletedTodos } from '../ducks/todos'
import { Filters, selectFilter, setFilter } from '../ducks/filters'
import TodoList from './TodoList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: theme.spacing(6),
    },
  })
)

const TodoListContainer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeFilter = useSelector(selectFilter)

  const allTodos = useSelector((state: RootState) => state.todos)
  const completedTodos = useSelector(selectCompletedTodos)
  const activeTodos = useSelector(selectActiveTodos)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: Filters) => {
    dispatch(setFilter(newValue))
  }

  const handleDeleteCompleted = () => {
    console.log('delete completed')
  }

  const handleDeleteAll = () => {
    console.log('delete all')
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
            <Tab key={filter} label={label} value={filter} />
          ))}
        </Tabs>
      </AppBar>
      <TodoList
        todos={
          activeFilter === Filters.SHOW_ACTIVE
            ? activeTodos
            : activeFilter === Filters.SHOW_COMPLETED
            ? completedTodos
            : allTodos
        }
      />
      <AppBar className={classes.bottomBar} position='static' color='default' elevation={0}>
        <Button color='primary' size='small' onClick={handleDeleteCompleted}>
          Delete Completed
        </Button>
        <Button color='primary' size='small' onClick={handleDeleteAll}>
          Delete All
        </Button>
      </AppBar>
    </Paper>
  )
}

export default TodoListContainer
