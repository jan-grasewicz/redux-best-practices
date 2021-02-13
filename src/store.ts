import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import todos from './ducks/todos'
import filters from './ducks/filters'

const rootReducer = combineReducers({
  todos,
  filters,
})
const composeEnhancers = composeWithDevTools({})
const middleware = [thunk]

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
