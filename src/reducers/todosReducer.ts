import { AppThunk, RootState } from '../store'
import { ITodo } from '../types'

enum TodosTypeKeys {
  add = 'todos/add',
  toggle = 'todos/toggle',
  set = 'todos/set',
  delete = 'todos/delete',
  deleteCompleted = 'todos/deleteCompleted',
  stateReset = 'todos/stateReset',
}

interface TodosSetAction {
  type: TodosTypeKeys.set
  payload: { todos: ITodo[] }
}

interface TodoAddAction {
  type: TodosTypeKeys.add
  payload: { id: number; title: string }
}

interface TodoToggleAction {
  type: TodosTypeKeys.toggle
  payload: { id: number }
}

interface TodoDeleteAction {
  type: TodosTypeKeys.delete
  payload: { id: number }
}

interface TodosDeleteCompletedAction {
  type: TodosTypeKeys.deleteCompleted
}

interface TodosStateResetAction {
  type: TodosTypeKeys.stateReset
}

type TodoActionTypes =
  | TodosSetAction
  | TodoAddAction
  | TodoToggleAction
  | TodoDeleteAction
  | TodosDeleteCompletedAction
  | TodosStateResetAction

interface TodosState {
  todos: ITodo[]
}

const initialState: TodosState = { todos: [] }

const todosReducer = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case TodosTypeKeys.set:
      return { ...state, todos: action.payload.todos }
    case TodosTypeKeys.add:
      const { id, title } = action.payload
      return { ...state, todos: [...state.todos, { id, title, completed: false }] }
    case TodosTypeKeys.toggle:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      }
    case TodosTypeKeys.delete:
      return { ...state, todos: state.todos.filter(({ id }) => id !== action.payload.id) }
    case TodosTypeKeys.deleteCompleted:
      return { ...state, todos: state.todos.filter(({ completed }) => !completed) }
    case TodosTypeKeys.stateReset:
      return initialState
    default:
      return state
  }
}

export const setTodos = (todos: ITodo[]): TodosSetAction => {
  return {
    type: TodosTypeKeys.set,
    payload: { todos },
  }
}

export const addTodo = (title: string): TodoAddAction => {
  const nextTodoId = Number(
    String(Date.now()) + String(Math.floor(Math.random() * Math.pow(10, 5)))
  )
  return {
    type: TodosTypeKeys.add,
    payload: { id: nextTodoId, title },
  }
}

export const toggleTodo = (id: number): TodoToggleAction => ({
  type: TodosTypeKeys.toggle,
  payload: { id },
})

export const deleteTodo = (id: number): TodoDeleteAction => ({
  type: TodosTypeKeys.delete,
  payload: { id },
})

export const deleteCompletedTodos = (): TodosDeleteCompletedAction => ({
  type: TodosTypeKeys.deleteCompleted,
})

export const resetTodos = (): TodosStateResetAction => ({ type: TodosTypeKeys.stateReset })

export const fetchTodos = (): AppThunk => async (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((todos: ITodo[]) => {
      return dispatch(setTodos(todos))
    })
}

export const selectAllTodosIds = (rootState: RootState) => rootState.todos.todos.map(({ id }) => id)

export const selectCompletedTodosIds = (rootState: RootState) =>
  rootState.todos.todos.filter(({ completed }) => completed).map(({ id }) => id)

export const selectActiveTodosIds = (rootState: RootState) =>
  rootState.todos.todos.filter(({ completed }) => !completed).map(({ id }) => id)

export const selectTodoById = (id: number) => (rootState: RootState) =>
  rootState.todos.todos.find((todo) => todo.id === id)!

export default todosReducer
