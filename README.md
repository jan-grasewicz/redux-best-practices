# Redux best practices

Created to present Redux best practices based on [Redux Style Guide](https://redux.js.org/style-guide/style-guide).

I've decided to forgo the use of Redux Toolkit, because base redux is used in projects much more frequently.

### [Priority A Rules (Essential):](https://redux.js.org/style-guide/style-guide#priority-a-rules-essential)

- Do Not Mutate State
- Reducers Must Not Have Side Effects
- Do Not Put Non-Serializable Values in State or Actions
- Only One Redux Store Per App

### [Priority B Rules (Strongly Recommended):](https://redux.js.org/style-guide/style-guide#priority-b-rules-strongly-recommended)

- Use Redux Toolkit for Writing Redux Logic
- Use Immer for Writing Immutable Updates
- Structure Files as Feature Folders with Single-File Logic
- Put as Much Logic as Possible in Reducers
- Reducers Should Own the State Shape
- Name State Slices Based On the Stored Data
- Organize State Structure Based on Data Types, Not Components
- Treat Reducers as State Machines
- Normalize Complex Nested/Relational State
- Model Actions as Events, Not Setters
- Write Meaningful Action Names
- Allow Many Reducers to Respond to the Same Action
- Avoid Dispatching Many Actions Sequentially
- Evaluate Where Each Piece of State Should Live
- Use the React-Redux Hooks API
- Connect More Components to Read Data from the Store
- Use the Object Shorthand Form of mapDispatch with connect
- Call useSelector Multiple Times in Function Components
- Use Static Typing
- Use the Redux DevTools Extension for Debugging
- Use Plain JavaScript Objects for State

### [Priority C Rules (Recommended):](https://redux.js.org/style-guide/style-guide#priority-c-rules-recommended)

- Write Action Types as domain/eventName
- Write Actions Using the Flux Standard Action Convention
- Use Action Creators
- Use Thunks for Async Logic
- Move Complex Logic Outside Components
- Use Selector Functions to Read from Store State
- Name Selector Functions as selectThing
- Avoid Putting Form State In Redux
