import { AppEvents } from "./events"


export const mark = (payload: any) => (dispatch: any) => {
  console.log(payload, dispatch)
  return dispatch({
    type: AppEvents.MARK,
    payload
  })
}

export const localWinner = (payload: any) => (dispatch: any) => {
  return dispatch({
    type: AppEvents.LOCAL_WINNER,
    payload
  })
}

export const globalWinner = (payload: any) => (dispatch: any) => {
  return dispatch({
    type: AppEvents.GLOBAL_WINNER,
    payload
  })
}

export const nextTurn = (payload: any) => (dispatch: any) => {
  return dispatch({
    type: AppEvents.NEXT_TURN,
    payload
  })
}