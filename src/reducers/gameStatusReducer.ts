import { AppEvents } from "../actions/events";

const initialState: IStatusState = {
  playerTurn: 'X',
  lastSquare: null,
  gameWinner: null
};

export interface IStatusState {
  playerTurn: string;
  lastSquare: number | null;
  gameWinner: string | null;
}

export default (state: IStatusState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case AppEvents.NEXT_TURN: {
      const { lastSquare } = payload;
      const newState: IStatusState = Object.assign({}, state);
      newState.playerTurn = (newState.playerTurn === 'X' ? 'O' : 'X');
      newState.lastSquare = lastSquare;
      return newState;
    }
    case AppEvents.GLOBAL_WINNER: {
      const { mark } = payload;
      const newState: IStatusState = Object.assign({}, state);
      newState.gameWinner = mark;
      return newState;
    }
    default: {
      return state;
    }
  }
};