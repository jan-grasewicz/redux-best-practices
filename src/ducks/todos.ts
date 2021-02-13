import { AppThunk, RootState } from '../store'

interface ITodoAction {
  type: 'todos/add' | 'todos/toggle' | 'todos/set' | 'todos/remove' | 'todos/reset'
  id: number
  title: string
  todos: ITodo[]
}

export interface ITodo {
  id: number
  title: string
  completed: boolean
}
type IStateTodos = ITodo[]
const initialState: IStateTodos = []

const todos = (state = initialState, action: ITodoAction) => {
  switch (action.type) {
    case 'todos/set':
      return [...action.todos]
    case 'todos/add':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false,
        },
      ]
    case 'todos/toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case 'todos/remove':
      return state.filter(({ id }) => id !== action.id)
    case 'todos/reset':
      return initialState
    default:
      return state
  }
}

export const setTodos = (todos: ITodo[]) => {
  return {
    type: 'todos/set',
    todos,
  }
}

export const addTodo = (title: string) => {
  const nextTodoId = Date.now() + Math.floor(Math.random() * Math.pow(10, 8))
  return {
    type: 'todos/add',
    id: nextTodoId,
    title,
  }
}

export const toggleTodo = (id: number) => ({
  type: 'todos/toggle',
  id,
})

export const deleteTodo = (id: number) => ({
  type: 'todos/remove',
  id,
})

export const resetTodos = () => ({ type: 'todos/reset' })

export const fetchTodos = (): AppThunk => async (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((todos: ITodo[]) => {
      return dispatch(setTodos(todos))
    })
}

export const selectCompletedTodos = (rootState: RootState) =>
  rootState.todos.filter(({ completed }) => completed)

export const selectActiveTodos = (rootState: RootState) =>
  rootState.todos.filter(({ completed }) => !completed)

export default todos
