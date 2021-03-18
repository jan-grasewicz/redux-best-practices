import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Button,
  createStyles,
  List,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@material-ui/core'
import { RootState } from '../store'
import {
  deleteCompletedTodos,
  resetTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../reducers/todosReducer'
import { selectFilter, setFilter } from '../reducers/filterReducer'
import TodoListItem from './TodoListItem'
import { Filters } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'calc(100vh - 224px)',
      minHeight: '192px',
      overflowY: 'auto',
    },
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: theme.spacing(6),
    },
    info: {
      alignSelf: 'center',
    },
  })
)

const TodoList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeTodos = useSelector(selectActiveTodos)
  const completedTodos = useSelector(selectCompletedTodos)
  const allTodos = useSelector((state: RootState) => state.todos)
  const activeFilter = useSelector(selectFilter)

  const filteredTodos =
    activeFilter === Filters.SHOW_ACTIVE
      ? activeTodos
      : activeFilter === Filters.SHOW_COMPLETED
      ? completedTodos
      : allTodos

  const handleFilterChange = (event: React.ChangeEvent<{}>, newValue: Filters) => {
    dispatch(setFilter(newValue))
  }

  const handleDeleteAll = () => {
    dispatch(resetTodos())
  }

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTodos())
  }

  const tabsArray = [
    { label: 'Active', filter: Filters.SHOW_ACTIVE },
    { label: 'All', filter: Filters.SHOW_ALL },
    { label: 'Completed', filter: Filters.SHOW_COMPLETED },
  ]

  return (
    <Paper>
      <AppBar position='static' color='default' elevation={0}>
        <Tabs
          value={activeFilter}
          onChange={handleFilterChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
        >
          {tabsArray.map(({ label, filter }) => (
            <Tab key={filter} label={label} value={filter} />
          ))}
        </Tabs>
      </AppBar>

      <List className={classes.list}>
        {!filteredTodos.length ? (
          <Typography className={classes.info} color='textSecondary' variant='subtitle2'>
            No todos
          </Typography>
        ) : (
          filteredTodos.map((todo) => <TodoListItem key={todo.id} {...todo} />)
        )}
      </List>

      <AppBar className={classes.bottomBar} position='static' color='default' elevation={0}>
        <Button color='primary' size='small' onClick={handleDeleteAll}>
          Delete All
        </Button>
        <Button color='primary' size='small' onClick={handleDeleteCompleted}>
          Delete Completed
        </Button>
      </AppBar>
    </Paper>
  )
}

export default TodoList
