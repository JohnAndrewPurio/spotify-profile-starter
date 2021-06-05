import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import spotifyReducer from './spotifyReducer'

export const store = createStore(spotifyReducer, applyMiddleware(thunk, logger))