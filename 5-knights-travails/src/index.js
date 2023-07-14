import { Chessboard } from "./Modules/Chessboard.js";

const Board = new Chessboard();

const src = Board.createCell(2, 1);
const dest = Board.createCell(3, 5);

const result = Board.findShortestPath(src, [dest.x, dest.y]);
console.log(result);
