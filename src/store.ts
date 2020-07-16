import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type IAppState = ReturnType<typeof rootReducer>;