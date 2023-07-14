import "./Modules/style.css";
import { Chessboard } from "./Modules/Chessboard.js";

const Board = new Chessboard();
Board.init();

// const cells = document.querySelectorAll(".cell");

// const src = Board.createCell(2, 1);
// const dest = Board.createCell(3, 5);

// const result = Board.findShortestPath(src, [dest.x, dest.y]);
// console.log(result);
