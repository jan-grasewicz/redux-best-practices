import { RootState } from '../store'
import { Filters } from '../types'

interface IFilterAction {
  type: 'filter/set'
  filter: Filters
}

const initialState = Filters.SHOW_ALL

const filterReducer = (state: Filters = initialState, action: IFilterAction) => {
  switch (action.type) {
    case 'filter/set':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter: Filters) => ({
  type: 'filter/set',
  filter,
})

export const selectFilter = (rootState: RootState) => rootState.filter

export default filterReducer
