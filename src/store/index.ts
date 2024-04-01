import { createStore, applyMiddleware, Middleware, Reducer } from 'redux'
import { thunk } from 'redux-thunk'
import { RootState, rootReducer } from './reducers'
import loggerMiddleware from './loggerMiddleware'

const middleware: Middleware[] = [thunk, loggerMiddleware]

export const store = createStore(
    rootReducer as unknown as Reducer<RootState>,
    applyMiddleware(...middleware),
)
