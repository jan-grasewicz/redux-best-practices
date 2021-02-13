export enum Filters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

interface IFiltersAction {
  type: 'SET_VISIBILITY_FILTER'
  filter: Filters
}

const initialState: Filters = Filters.SHOW_ALL

const filters = (state = initialState, action: IFiltersAction) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export const setVisibilityFilter = (filter: Filters) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
})

export default filters
