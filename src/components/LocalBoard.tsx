import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { mark, nextTurn, localWinner, IMark, INextTurn, ILocalWinner } from '../actions/actions';
import { IAppState } from '../store';

const LocalBoard: React.FC = (props: any): ReactElement => {
  const { gameStatus, boardId, globalCheckWin, localData, boardData } = props;
  function handleMark(square: number) {
    const devMode: boolean = false; // true = place mark anywhere. false = game mode.
    if (gameStatus.lastSquare === boardId || gameStatus.lastSquare === null || devMode) {
      if (localData.position[square] === null) {
        props.mark({
          squareId: square,
          boardId: boardId,
          mark: gameStatus.playerTurn
        });
        checkWin();
        globalCheckWin();
        let lastSquare: number | null = square;
        if (boardData[square].boardWinner) {
          lastSquare = null;
        }
        props.nextTurn({
          lastSquare
        })
      }
    }
  }

  function checkWin() {
    const square: Array<number> = localData.position;
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let mark = null;
    const targetDiv: HTMLElement | null | any = document.getElementById(`board${props.boardId}`);
    for (let i = 0; i < winConditions.length; i++) {
      let threeInARow = 0;
      for (let j = 0; j <= 2; j++) {
        if (square[winConditions[i][j]] === gameStatus.playerTurn) {
          threeInARow++;
        }
      }
      if (threeInARow === 3) {
        mark = gameStatus.playerTurn;
        targetDiv.appendChild(document.createTextNode(`${mark}`));
        if (mark === 'X') {
          targetDiv.classList.add('mark-x');
        } else {
          targetDiv.classList.add('mark-o');
        }
        return props.localWinner({ boardId: boardId, mark })
      } else if (!localData.position.includes(null)) {
        mark = 'cat';
        return props.localWinner({ boardId: boardId, mark })
      }
    }
  }

  return (
    <div className='local-wrapper' id='local-board'>
      <style>{`
        #lc-board3, #lc-board4, #lc-board5 {
          border-top: 2px solid #D90E79;
          border-bottom: 2px solid #D90E79;
        }
        #lc-board1, #lc-board4, #lc-board7 {
          border-left: 2px solid #D90E79;
          border-right: 2px solid #D90E79;
        }
        .player-mark {
          padding-top: 10px;
          font-size: 42px;
          color: #ccccc5;
        }
        .square {
          text-align: center;
          height: 80px;
          width: 80px;
          float: left;
        }
        #local-board {
          margin: 5px 0 0 5px;
        }
        .board-winner {
          position: absolute;
          text-align: center;
          top: -10px;
          left: 0;
          right: auto;
          font-size: 265px;
          z-index: 1;
          line-height: 1;
          width: 240px;
          cursor: default;
        }
        .square-wrapper {
          position: relative;
        }
        .cat {
          height: 200%;
        } 
        .mark-x {
          color: #FF217C;
          cursor: default;
        }
        .mark-o {
          color: #0EFEE0;
          cursor: default;
        }
      `}</style>
      {localData.position.map((square: string, index: number) => (
        <div className='square-wrapper' key={index} onClick={() => { handleMark(index); }}>
          <div className='board-winner' id={`board${boardId}`}>
          </div>
          <div className='player-mark square' id={'lc-board' + index}>
            {localData.boardWinner ? (
              <p>{square}</p>
            ) : (
                square === 'X' ? (
                  <p className='mark-x'>{square}</p>
                ) : (
                    <p className='mark-o'>{square}</p>
                  )
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state: IAppState) => {
  return {
    boardData: state.boardData,
    gameStatus: state.gameStatus
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    mark: (args: IMark) => dispatch(mark(args)),
    nextTurn: (args: INextTurn) => dispatch(nextTurn(args)),
    localWinner: (args: ILocalWinner) => dispatch(localWinner(args)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalBoard);
