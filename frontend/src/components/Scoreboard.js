import React from "react";
import axios from "axios";
import "./Scoreboard.css";

class Scoreboard extends React.Component {
  _state = {
    players: []
  };
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
  componentDidMount() {
    this.downloadPlayers();
    document.title = "Tic Tac Toe";
  }
  downloadPlayers() {
    axios
      .get("/api/v1/players.json")
      .then(response => {
        this.setState({
          players: response.data
        });
      })
      .catch(error => console.log(error));
  }
  createPlayer(name, result) {
    //Create a new player, sending result of their first match
    let [wins, losses, draws] = [0,0,0];

    if (result === "win") {
      wins++;
    } else if (result === "loss") {
      losses++;
    } else if (result === "draw") {
      draws++;
    } else {
      alert("Invalid game result passed!");
      return;
    }
    axios
      .post("/api/v1/players", { player: { name, wins, losses, draws } })
      .then(response => {
        const players = [...this.state.players, response.data];
        this.setState(state => {
          return { players: players };
        });
      });
  }
  
  updatePlayer(name, result) {
    const id = this.playerIndex(name);
    if (!id) {
      //New player, first create in database
      this.createPlayer(name, result);
    } else {
        const players = this.state.players.slice();
        const player = players[id - 1];
        let wins = player.wins;
        let losses = player.losses;
        let draws = player.draws;
        if (result === "win") {
          wins++;
        } else if (result === "loss") {
          losses++;
        } else if (result === "draw") {
          draws++;
        } else {
          alert("Invalid game result passed!");
          return;
        }
        axios
          .put("/api/v1/players/" + id, {
            player: {
              wins,
              losses,
              draws
            }
          })
          .then(response => {
            players[id - 1] = { id, name, wins, losses, draws };
            this.setState(() => ({
              players,
              editingPlayerId: null
            }));
          })
          .catch(error => console.log(error)
          );
    }
  }

  playerIndex(name) {
    const index = this.state.players.findIndex((player) => {return player.name === name});
    
    return index + 1;
  }

  render() {
    return (
      <>
        <h4 align="left">Scoreboard</h4>
        <div className="card-score" data-testid="game-scoreboard">
          <table className="blueTable">
            <tbody>
            <tr>
              <th className="row-name">Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
            </tr>
            {this.state.players.map(obj => (
              <tr key={obj.id}>
                <td> {obj.name} </td>
                <td> {obj.wins} </td>
                <td> {obj.losses} </td>
                <td> {obj.draws} </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Scoreboard;
