import { AppEvents } from "../actions/events";

const initialState: IBoardState = [
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },
  {
    boardWinner: null,
    position: [null, null, null,
      null, null, null,
      null, null, null]
  },

];

interface IBoard {
  boardWinner: string | null;
  position: IPositions;
}

interface IPositions extends Array<string | null> { }

export interface IBoardState extends Array<IBoard> { }


export default (state: IBoardState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case AppEvents.MARK: {
      console.log(action)
      const { squareId, boardId, mark } = payload;
      const newState: IBoardState = state.slice();
      newState[boardId].position[squareId] = mark;
      return newState;
    }
    case AppEvents.LOCAL_WINNER: {
      const { boardId, mark } = payload;
      const newState: IBoardState = state.slice();
      newState[boardId].boardWinner = mark;
      return newState;
    }
    default: {
      return state;
    }
  }
};

