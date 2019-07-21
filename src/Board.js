import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }
  

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0 ; i < this.props.nrows ; i ++ ) {
      let row = [];
      for (let j = 0 ; j < this.props.ncols ; j++ ) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y,x);
    flipCell(y++ ,x);
    flipCell(y-- ,x);
    flipCell(y, x--);
    flipCell(y, x++);
    // win when every cell is turned off
    // TODO: determine is the game has been won

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board, hasWon});
  }

  makeTable() {
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className='Board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }


  /** Render game board or winning message. */

  // render() {
  //   if (this.state.hasWon) {
  //     return <h1>YOU WON!!!</h1>
  //   }

  //   console.log(this.props);
  //   let tableBoard = [];
  //   for (let y = 0; y < this.props.nrows ; y++ ) {
  //     let row = [];
  //     for (let x = 0 ; x < this.props.ncols ; x++ ) {
  //       let coordinate = `${y}-${x}`
  //       row.push(<Cell key={coordinate} flipCellsAroundMe={() => this.flipCellsAround(coordinate)} isLit={this.state.board[y][x]} /> );
  //     }
  //     tableBoard.push(<tr>{row}</tr>);
  //   }

  //   console.table(this.state.board);

    render() {
      return (
        <div>
          {this.state.hasWon ? (
            <div className='winner'>
              <span className='neon-orange'>YOU</span>
              <span className='neon-blue'>WIN!</span>
            </div>
          ) : (
            <div>
              <div className='Board-title'>
                <div className='neon-orange'>Lights</div>
                <div className='neon-blue'>Out</div>
              </div>
              {this.makeTable()}
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Board;