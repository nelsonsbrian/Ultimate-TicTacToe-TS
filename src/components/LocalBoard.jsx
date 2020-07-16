import React from 'react';
import { connect } from 'react-redux';
import { mark, nextTurn, localWinner } from '../actions/actions';

function LocalBoard(props) {
  function handleMark(square) {
    let devMode = false; // true = place mark anywhere. false = game mode.
    if (props.gameStatus.lastSquare === props.boardId || props.gameStatus.lastSquare === null || devMode) {
      if (props.localData.position[square] === null) {
        props.mark({
          squareId: square,
          boardId: props.boardId,
          mark: props.gameStatus.playerTurn
        });
        checkWin();
        props.globalCheckWin();
        let lastSquare = square;
        if (props.boardData[square].boardWinner) {
          lastSquare = null;
        }
        props.nextTurn({
          lastSquare
        })
      }
    }
  }

  function checkWin() {
    let square = props.localData.position;
    let winConditions = [
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
    let targetDiv = document.getElementById(`board${props.boardId}`);
    for (let i = 0; i < winConditions.length; i++) {
      let threeInARow = 0;
      for (let j = 0; j <= 2; j++) {
        if (square[winConditions[i][j]] === props.gameStatus.playerTurn) {
          threeInARow++;
        }
      }
      if (threeInARow === 3) {
        mark = props.gameStatus.playerTurn;
        targetDiv.appendChild(document.createTextNode(`${mark}`));
        if (mark === 'X') {
          targetDiv.classList.add('mark-x');
        } else {
          targetDiv.classList.add('mark-o');
        }
        return props.localWinner({ boardId: props.boardId, mark })
      } else if (!props.localData.position.includes(null)) {
        mark = 'cat';
        return props.localWinner({ boardId: props.boardId, mark })
      }
    }
  }

  return (
    <div className='local-wrapper' id='local-board'>
      <style jsx="true">{`
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
      {props.localData.position.map((square, index) => (
        <div className='square-wrapper' key={index} onClick={() => { handleMark(index); }}>
          <div className='board-winner' id={`board${props.boardId}`}>
          </div>
          <div className='player-mark square' id={'lc-board' + index}>
            {props.localData.boardWinner ? (
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

const mapDispatchToProps = {
  mark: mark,
  nextTurn: nextTurn,
  localWinner: localWinner,
}

export default connect(null, mapDispatchToProps)(LocalBoard);
