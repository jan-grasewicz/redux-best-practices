import { RootState } from '../store'

export enum Filters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

interface IFiltersAction {
  type: 'filters/set'
  filter: Filters
}

const initialState: Filters = Filters.SHOW_ALL

const filters = (state = initialState, action: IFiltersAction) => {
  switch (action.type) {
    case 'filters/set':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter: Filters) => ({
  type: 'filters/set',
  filter,
})

export const selectFilter = (rootState: RootState) => rootState.filters

export default filters
