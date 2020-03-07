import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './userReducer'
import dataReducers from './dataReducers'
import uiReducer from './uiReducer'
const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducers,
    UI: uiReducer
})

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store