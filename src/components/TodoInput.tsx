import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createStyles,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { addTodo } from '../reducers/todosReducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputWrap: {
      display: 'flex',
      alignItems: 'center',
      padding: '2px 4px',
      marginBottom: theme.spacing(2),
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(1),
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
)

const TodoInput = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const INITIAL_VALUE = ''
  const [value, setValue] = useState(INITIAL_VALUE)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleAdd = () => {
    dispatch(addTodo(value))
    setValue(INITIAL_VALUE)
  }

  return (
    <Paper component='form' className={classes.inputWrap}>
      <InputBase
        className={classes.input}
        placeholder='Add Todo'
        value={value}
        onChange={handleChange}
      />
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton color='primary' className={classes.iconButton} onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default TodoInput
