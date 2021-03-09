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
} from '@material-ui/core'
import { RootState } from '../store'
import { selectActiveTodos, selectCompletedTodos } from '../ducks/todos'
import { Filters, selectFilter, setFilter } from '../ducks/filters'
import TodoListItem from './TodoListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: { height: 'calc(100vh - 224px)', minHeight: '192px', overflowY: 'auto' },
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: theme.spacing(6),
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

      <List className={classes.list}>
        {!!filteredTodos.length &&
          filteredTodos.map((todo) => <TodoListItem key={todo.id} {...todo} />)}
      </List>

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

export default TodoList
