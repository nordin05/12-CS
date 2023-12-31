import { renderGrid, addListeners, setCellColors } from "./DOM.js";

export class Chessboard {
    constructor() {
        this.columns = 8;
        this.rows = 8;
        this.visited = [];
        this.possibleMoves = {
            row: [2, 2, -2, -2, 1, 1, -1, -1],
            column: [-1, 1, 1, -1, 2, -2, 2, -2],
        };
        this.src = null;
        this.dest = null;
    }

    init() {
        renderGrid();
        addListeners(this);
        setCellColors();
    }

    createCell(x, y, dist = 0, parentCell = null) {
        const newCell = new Cell(x, y, dist, parentCell);
        return newCell;
    }

    isValidCoord(x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.rows;
    }

    targetReached(currentPos, targetPos) {
        return currentPos[0] == targetPos[0] && currentPos[1] == targetPos[1];
    }

    solutionPathArray(finalCell) {
        let currentCell = finalCell;
        const arr = [];
        while (currentCell) {
            arr.push(currentCell);
            currentCell = currentCell.parentCell;
        }
        arr.reverse();
        this.printMoves(arr);
        return arr;
    }

    printMoves(arr) {
        let str = "";
        arr.forEach((element) => (str = str + `[${element.x}, ${element.y}] `));
        console.log("final path:", str);
    }

    findShortestPath(currentCell, targetPos) {
        const queue = [currentCell];
        while (queue.length > 0) {
            const currentNode = queue.shift();

            const currentPos = [currentNode.x, currentNode.y];
            const dist = currentNode.dist;
            if (this.targetReached(currentPos, targetPos)) {
                return this.solutionPathArray(currentNode);
            }

            if (!this.visited.includes(currentPos)) {
                this.visited.push(currentPos);

                for (let i = 0; i < 8; i++) {
                    const x = currentPos[0] + this.possibleMoves["row"][i];
                    const y = currentPos[1] + this.possibleMoves["column"][i];
                    if (this.isValidCoord(x, y)) {
                        const newCell = this.createCell(
                            x,
                            y,
                            dist + 1,
                            currentNode
                        );
                        queue.push(newCell);
                    }
                }
            }
        }
        return "Path not found";
    }
}

class Cell {
    constructor(x, y, dist = 0, parentCell = null) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.parentCell = parentCell;
    }
}
