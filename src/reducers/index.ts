
import boardReducer from './boardReducer';
import gameStatusReducer from './gameStatusReducer';
import { combineReducers } from 'redux';

// export interface IAction {
//   type:
// }

const rootReducer = combineReducers({
  boardData: boardReducer,
  gameStatus: gameStatusReducer
});

export default rootReducer;