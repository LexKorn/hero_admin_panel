const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroesList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroesList
            }
        case 'HERO_ADDED':
            const newCreatedHeroesList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreatedHeroesList
                // heroes: state.heroes.push(action.payload)
            }
        default: return state
    }
}

export default reducer;