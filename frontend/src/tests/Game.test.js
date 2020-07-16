import React from "react";
import { render } from "@testing-library/react";

import { Board, Square, calculateWinner } from "../components/Game.js";

describe("calculateWinner", () => {
  describe("Unfinished game", () => {
    it("Should not have a winner with empty board", () => {
      const board = ["", "", "", "", "", "", "", "", ""];
      const winner = calculateWinner(board);

      expect(winner).toBe(null);
    });
    it("Should not have a winner without a completed line", () => {
      const board = ["X", "O", "", "X", "O", "", "", "", "X"];
      const winner = calculateWinner(board);

      expect(winner).toBe(null);
    });
  });
  describe("Wins: ", () => {
    it("Should be a Win if line is horizontal", () => {
      const board = ["O", "O", "X", "X", "O", "O", "X", "X", "X"];
      const winner = calculateWinner(board);

      expect(winner).toBe("X");
    });
    it("Should be a Win if line is completed vertical", () => {
      const board = ["O", "O", "", "X", "O", "O", "X", "O", "X"];
      const winner = calculateWinner(board);

      expect(winner).toBe("O");
    });
    it("Should be a Win if line is completed diagonal", () => {
      const board = ["O", "x", "O", "X", "O", "", "X", "", "O"];
      const winner = calculateWinner(board);

      expect(winner).toBe("O");
    });
  });
});

describe("Square", () => {
  const renderSquare = squareProps => {
    const elem = render(<Square {...squareProps} />);
    return elem.queryByTestId("board-square");
  };

  it("Should render", () => {
    const square = renderSquare();

    expect(square).toMatchSnapshot();
  });
  it("Should display nothing if not set", () => {
    const square = renderSquare();

    expect(square.innerHTML).toBe("");
  });
  it("Should display O", () => {
    const square = renderSquare({ value: "O" });

    expect(square.innerHTML).toBe("O");
  });
  it("Should display X", () => {
    const square = renderSquare({ value: "X" });

    expect(square.innerHTML).toBe("X");
  });
});

describe("Board", () => {
  const renderBoard = () => render(<Board />);

  it("Should render", () => {
    const board = renderBoard().queryByTestId("game-board");

    expect(board).not.toBeNull();
  });
  it("Should have 9 squares", () => {
    const board = renderBoard();
    const squares = board.queryAllByTestId("board-square");

    expect(squares.length).toBe(9);
  });
});
