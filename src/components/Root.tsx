import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Container } from '@material-ui/core'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { fetchTodos, resetTodos } from '../reducers/todosReducer'

const Root = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    return () => {
      dispatch(resetTodos())
    }
  })

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <TodoInput />
        <TodoList />
      </Box>
    </Container>
  )
}

export default Root
