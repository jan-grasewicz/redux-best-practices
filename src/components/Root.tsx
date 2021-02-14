import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { useDispatch } from 'react-redux'
import { fetchTodos, resetTodos } from '../ducks/todos'

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
