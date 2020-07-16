import { AppEvents } from "./events"


export interface IMark {
  squareId: number;
  boardId: number;
  mark: string;
}

export const mark = (payload: IMark) => (
  {
    type: AppEvents.MARK,
    payload
  }
)

export interface ILocalWinner {
  boardId: number;
  mark: string;
}

export const localWinner = (payload: any) => (
  {
    type: AppEvents.LOCAL_WINNER,
    payload
  }
)

export interface IGlobalWinner {
  mark: string;
}

export const globalWinner = (payload: any) => (
  {
    type: AppEvents.GLOBAL_WINNER,
    payload
  }
)

export interface INextTurn {
  lastSquare: number
}

export const nextTurn = (payload: any) => (
  {
    type: AppEvents.NEXT_TURN,
    payload
  }
)