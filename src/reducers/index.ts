
import boardReducer from './boardReducer';
import gameStatusReducer from './gameStatusReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  boardData: boardReducer,
  gameStatus: gameStatusReducer
});

export type RootState = ReturnType<typeof rootReducer>;


export default rootReducer;