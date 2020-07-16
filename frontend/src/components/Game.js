import React from "react";
import Popup from "reactjs-popup";
import Scoreboard from "../components/Scoreboard";
import "./Game.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} data-testid="board-square">
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    //Left to right
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Up to down
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  //Game is won if all three squares on a line are the same
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function playersSet(player1, player2) {
  return player1 !== "" && player2 !== "" && player1 !== player2;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const firstTurn = Math.random() < 0.5; //Randomizes who goes first
    this.scoreboard = React.createRef(); //Allows parent to call child functions
    this.state = {
      squares: Array(9).fill(null),
      xTurn: firstTurn,
      player_one: "",
      player_two: ""
    };
    //Bind the form submit for setting player names
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Handle the clicking of board squares
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      // ignore click if square set or winner has been declared
      return;
    }
    if (!playersSet(this.state.player_one, this.state.player_two)) {
      //Ignore click if player names aren't set.
      return;
    }
    squares[i] = this.state.xTurn ? "X" : "O";
    this.setState({
      squares: squares,
      xTurn: !this.state.xTurn //toggle who's turn it is
    });
  }
  //Submit function on form for setting player names
  handleSubmit(event) {
    this.setState({
      player_one: event.target.player_one.value,
      player_two: event.target.player_two.value
    });
    event.preventDefault(); //Prevents page reloading
  }
  //draws a single square of the board
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  //new game button
  resetBoard = () => {
    const squares = Array(9).fill(null);
    const firstTurn = Math.random() < 0.5;
    this.setState({
      squares: squares,
      xTurn: firstTurn
    });
  };

  renderResetBoard() {
    return (
      <button className="btn btn-primary" onClick={() => this.resetBoard()}>
        New Game
      </button>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    const player_one = this.state.player_one;
    const player_two = this.state.player_two;
    const arePlayersSet = playersSet(player_one, player_two);

    const board_full = this.state.squares.findIndex((el) => {return el === null;});

    if (winner === "O") {
      status = "Winner: " + player_one;
      this.scoreboard.current.updatePlayer(player_one, "win");
      this.scoreboard.current.updatePlayer(player_two, "loss");
    } else if (winner === "X") {
      status = "Winner: " + player_two;
      this.scoreboard.current.updatePlayer(player_one, "loss");
      this.scoreboard.current.updatePlayer(player_two, "win");
    } else if (!arePlayersSet) {
      status = "";
    } else if (board_full === -1) {
      status = "The game is a draw!";
      this.child.scoreboard.updatePlayer(player_one, "draw");
      this.child.scoreboard.updatePlayer(player_two, "draw");
    } else if (this.state.xTurn === false) {
      status = player_one + "'s turn!";
    } else {
      status = player_two + "'s turn!";
    }

    let players;
    if (arePlayersSet) {
      players = player_one + " Vs. " + player_two;
    } else {
      players = "Set the names of both players.";
    }

    return (
      <>
        <div>
          <div className="row-head">
            <div className="card-head">
              <div className="players"> {players} </div>
              <div className="status"> {status} </div>
            </div>
          </div>
          <br />
          <div className="card-game" data-testid="game-board">
            <div className="board-row">
              <div className="col-sm-12 col-md-6 offset-md-3">
                {this.renderSquare(0)} {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
            </div>
            <div className="board-row">
              <div className="col-sm-12 col-md-6 offset-md-3">
                {this.renderSquare(3)} {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
            </div>
            <div className="board-row">
              <div className="col-sm-12 col-md-6 offset-md-3">
                {this.renderSquare(6)} {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
          </div>
          {this.renderResetBoard()} {/* New game button */}
          {/* Set Player names popup */}
          <Popup
            trigger={() => (
              <button className="btn btn-primary"> Set Names</button>
            )}
            modal
          >
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Player One
                  <input
                    type="text"
                    className="player-entry"
                    name="player_one"
                  />
                  Player Two
                  <input
                    type="text"
                    className="player-entry"
                    name="player_two"
                  />
                </label>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </Popup>
        </div>
        <br />
        <Scoreboard ref={this.scoreboard} />
      </>
    );
  }
}

class Game extends React.Component {
  _state = {};
  render() {
    return (
      <>
        <div className="game" data-testid="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
        <br />
      </>
    );
  }
}

export {Square, Board, Game, calculateWinner};
