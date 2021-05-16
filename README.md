# Redux best practices

ToDo App created to present Redux best practices based on [Redux Style Guide](https://redux.js.org/style-guide/style-guide).

I've decided to forgo the use of:

- Redux Toolkit
- Immer
- feature folders file structure
- Reducers as State Machines

because I found this setup in projects much more frequently.

## Rules summary with code examples:

---

## [#](https://redux.js.org/style-guide/style-guide#priority-a-rules-essential) Priority A Rules (Essential):

- ### Do Not Mutate State

  ```typescript
  // todosReducer.ts
  case 'todos/set':
    return [...action.todos]
  ```

  You can use [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant) to warn you against mutating state, or use [Immer](https://immerjs.github.io/immer/) to allow mutable methods.

- ### Reducers Must Not Have Side Effects

  ```typescript
  // todosReducer.ts
    case 'todos/toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
  ```

  No asynchronous logic and generating random values (`Date.now()`, `Math.random()`) in reducers.

- ### Do Not Put Non-Serializable Values in State or Actions

  ```typescript
  // Incorrect
    case 'todos/set':
      return new Map()
  ```

  Avoid putting Promises, Symbols, Maps/Sets, functions, or class instances into the Redux store state.

- ### Only One Redux Store Per App
  ```typescript
  // reducers/index.ts
  const rootReducer = combineReducers({
    todos: todosReducer,
    filter: filterReducer,
  })
  // store.ts
  const store = createStore(rootReducer)
  ```

## [#](https://redux.js.org/style-guide/style-guide#priority-b-rules-strongly-recommended) Priority B Rules (Strongly Recommended):

- ### Use Redux Toolkit for Writing Redux Logic - unused in this project

  RTK simplifies logic and promotes good practices.

- ### Use Immer for Writing Immutable Updates - unused in this project

  [Immer](https://immerjs.github.io/immer/) allows you to write simpler immutable updates using "mutative" logic.

- ### Structure Files as Feature Folders with Single-File Logic - unused in this project

<!-- TODO: add summary -->

- ### Put as Much Logic as Possible in Reducers

  ```typescript
  // todosReducer.ts
    case 'todos/toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
  ```

  Prefer logic in reducers instead of click handlers, for example.

- ### Reducers Should Own the State Shape

  <!-- TODO: add example in code and here -->

  Use of static typing does make "spread return" safer and somewhat more acceptable.
  <!-- TODO: make sure action type is PayloadAction<User> -->

- ### Name State Slices Based On the Stored Data

  ```typescript
  // reducers/index.ts
  const rootReducer = combineReducers({
    todos: todosReducer,
    filter: filterReducer,
  })
  ```

  Avoid use of the word "reducer" in the key names.

- ### Organize State Structure Based on Data Types, Not Components

  "Root state slices should be defined and named based on the major data types or areas of functionality in your application, not based on which specific components you have in your UI."

- ### Treat Reducers as State Machines - unused in this project
- ### Normalize Complex Nested/Relational State

  "Trying to update a deeply nested field can become very ugly very fast."

  [Normalizing State Shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)

- ### Model Actions as Events, Not Setters
  "We recommend trying to treat actions more as "describing events that occurred", rather than "setters"."
- ### Write Meaningful Action Names
  "You should be able to read through a list of dispatched action types, and have a good understanding of what happened in the application."
    <!-- TODO: rename action names -->
- ### Allow Many Reducers to Respond to the Same Action
    <!-- TODO: try creating this scenario in this app -->
- ### Avoid Dispatching Many Actions Sequentially

  ```typescript
  // avoid this
  const action = () => {
    dispatch(deleteCompletedTodos())
    dispatch(setFilter(Filters.SHOW_ACTIVE))
  }
  ```

- ### Evaluate Where Each Piece of State Should Live

  Not every value must be kept in redux. "Values that are "local" should generally be kept in the nearest UI component"

  ```typescript
  // TodoInput.tsx
  const [inputValue, setInputValue] = useState(INITIAL_INPUT_VALUE)
  ```

- ### Use the React-Redux Hooks API

  Prefer using `useSelector` and `useDispatch` as the default way to interact with a Redux store from your React components.

- ### Connect More Components to Read Data from the Store

  Reading data at a more granular level typically leads to better UI performance, as fewer components will need to render when a given piece of state changes.

  <!-- ```typescript
  // TodoList.tsx
  ``` -->

  <!-- TODO: use this strategy in TodoList.tsx -->

- ### Use the Object Shorthand Form of mapDispatch with connect
- ### Call useSelector Multiple Times in Function Components

  "Having selectors read smaller values means it is less likely that a given state change will cause this component to render."

  ```typescript
  // TodoList.tsx
  const activeTodos = useSelector(selectActiveTodos)
  const completedTodos = useSelector(selectCompletedTodos)
  const allTodos = useSelector(selectAllTodos)
  const activeFilter = useSelector(selectFilter)
  ```

- ### Use Static Typing

  "The type systems will catch many common mistakes, improve the documentation of your code, and ultimately lead to better long-term maintainability."

  ```typescript
  // store.ts
  export type RootState = ReturnType<typeof rootReducer>
  ```

- ### Use the Redux DevTools Extension for Debugging

  ```typescript
  // store.ts
  import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

  const composeEnhancers = composeWithDevTools({})
  const store = createStore(rootReducer, composeEnhancers())
  ```

- ### Use Plain JavaScript Objects for State
  "Prefer using plain JavaScript objects and arrays for your state tree."

## [#](https://redux.js.org/style-guide/style-guide#priority-c-rules-recommended) Priority C Rules (Recommended):

- ### Write Action Types as domain/eventName

  ```typescript
  // todosReducer.ts
  interface ITodoAction {
  type:
    | 'todos/add'
    | 'todos/toggle'
    | 'todos/set'
    | 'todos/delete'
    | 'todos/reset'
    | 'todos/deleteCompleted'
    (...)
    }
  ```

- ### Write Actions Using the Flux Standard Action Convention
  ```typescript
  {
    type: string
    payload?: any
    error?: boolean
    meta?: any
  }
  ```
  ["Flux Standard Actions"](https://github.com/redux-utilities/flux-standard-action)
- ### Use Action Creators

  "Using action creators provides consistency, especially in cases where some kind of preparation or additional logic is needed to fill in the contents of the action (such as generating a unique ID)."

  ```typescript
  //todosReducer.ts
  export const addTodo = (title: string) => {
    const nextTodoId = Number(
      String(Date.now()) + String(Math.floor(Math.random() * Math.pow(10, 5)))
    )
    return {
      type: 'todos/add',
      id: nextTodoId,
      title,
    }
  }
  ```

- ### Use Thunks for Async Logic

  ```typescript
  //todosReducer.ts
  export const fetchTodos = (): AppThunk => async (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((todos: ITodo[]) => {
        return dispatch(setTodos(todos))
      })
  }
  ```

- ### Move Complex Logic Outside Components

  "We encourage moving complex synchronous or async logic outside components, usually into thunks. This is especially true if the logic needs to read from the store state.

  However, the use of React hooks does make it somewhat easier to manage logic like data fetching directly inside a component, and this may replace the need for thunks in some cases."

- ### Use Selector Functions to Read from Store State

  ```typescript
  //todosReducer.ts
  export const selectCompletedTodos = (rootState: RootState) =>
    rootState.todos.filter(({ completed }) => completed)

  export const selectActiveTodos = (rootState: RootState) =>
    rootState.todos.filter(({ completed }) => !completed)
  ```

- ### Name Selector Functions as selectThing

  ```typescript
  // TodoList.tsx
  const activeTodos = useSelector(selectActiveTodos)
  const completedTodos = useSelector(selectCompletedTodos)
  const allTodos = useSelector(selectAllTodos)
  const activeFilter = useSelector(selectFilter)
  ```

- ### Avoid Putting Form State In Redux

  "Connecting forms to Redux often involves dispatching actions on every single change event, which causes performance overhead and provides no real benefit."

  ```typescript
  // TodoInput.tsx
  const [inputValue, setInputValue] = useState(INITIAL_INPUT_VALUE)
  ```
