import React from 'react';
import LocalBoard from './LocalBoard';
import { connect } from 'react-redux';
import { globalWinner } from '../actions/actions';

class GlobalBoard extends React.Component {
  constructor(props) {
    super(props);
    this.bgColor = '';
    this.checkWin = this.checkWin.bind(this);
  }

  componentDidUpdate() {
    for (let i = 0; i < this.props.boardData.length; i++) {
      let target = document.getElementById(`gl-board${i}`);
      if (this.props.boardData[i].boardWinner) {
        target.classList.remove('mark-playable');
        target.classList.add('not-playable');
      } else if (!(this.props.boardData[i].position.includes(null))) {
        target.classList.remove('mark-playable');
        target.classList.add('cat-condition');
      } else if (this.props.gameStatus.lastSquare === i || this.props.gameStatus.lastSquare === null) {
        target.classList.add('mark-playable');
      } else {
        target.classList.remove('mark-playable');
      }
    }
  }

  checkWin() {
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
    let targetDiv = document.getElementById('gameBoard');
    let boardWinnerCount = this.props.boardData.filter(lBoard => (lBoard.boardWinner !== null)).length;
    for (let i = 0; i < winConditions.length; i++) {
      let threeInARow = 0;
      for (let j = 0; j <= 2; j++) {
        if (this.props.boardData[winConditions[i][j]].boardWinner === this.props.gameStatus.playerTurn) {
          threeInARow++;
        }
      }
      if (threeInARow === 3) {
        mark = this.props.gameStatus.playerTurn;
        targetDiv.appendChild(document.createTextNode(`${mark}`));
        if (mark === 'X') {
          targetDiv.classList.add('mark-x', 'animated', 'flash', 'infinite');
        } else {
          targetDiv.classList.add('mark-o', 'animated', 'flash', 'infinite');
        }
        return globalWinner({ boardId: this.props.boardId, mark });
      } else if (boardWinnerCount >= 9) {
        mark = 'cat';
        return globalWinner({ boardId: this.props.boardId, mark });
      }
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <style jsx="true">{`
          h3 {
            text-align: center;
            margin-bottom: 5px;
          }
          .wrapper {
            width: 800px;
            margin: 0px auto 100px auto;
            background-color: white;
          }
          .local-board {
            background-color: rgba(0, 0, 0, .8);
            float: left;
            width: 260px;
            height: 260px;
          }
          #gl-board3, #gl-board4, #gl-board5 {
            border-top: 5px solid #97de00;
            border-bottom: 5px solid #97de00;
          }
          #gl-board1, #gl-board4, #gl-board7 {
            border-left: 5px solid #97de00;
            border-right: 5px solid #97de00;
          }
          #gl-board8 {
            margin-bottom: 80px;
          }  
          .global-winner {
            position: absolute;
            text-align: center;
            top: 340px;
            left: 0;
            right: auto;
            font-size: 800px;
            z-index: 2;
            line-height: 1;
            width: 100vw;
            cursor: pointer;
          }          
          .not-playable {
            background-color: rgba(100, 71, 109, .8);
          } 
          .cat-condition {
          }
          .x-condition {
            background-color: pink;
          }
          .o-condition {
            background-color: gold;
          }
          .mark-playable {
            background-color: rgba(254, 207, 135, .8);
            cursor: pointer;
          }
          .status-bar {
            float: right;
            text-align: right;
          }
          .mark-x {
            color: #FF217C;
            text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0 black, -1px -1px 0 black;
          }
          .mark-o {
            color: #0EFEE0;
            text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0 black, -1px -1px 0 black;
          }
  
        `}</style>
        <div className='global-winner' id='gameBoard' onClick={() => window.location.reload()}>
        </div>
        {this.props.boardData.map((board, index) => (
          <div key={index} className={`${this.bgColor} local-board mark-playable`} id={'gl-board' + index}>
            <LocalBoard
              gameStatus={this.props.gameStatus}
              dispatch={this.props.dispatch}
              localData={board}
              boardData={this.props.boardData}
              boardId={index}
              globalCheckWin={this.checkWin}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardData: state.boardData,
    gameStatus: state.gameStatus
  };
};

export default connect(mapStateToProps, { globalWinner })(GlobalBoard);