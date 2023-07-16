const gridDiv = document.querySelector(".grid");
const instructDiv = document.querySelector(".instructions");
instructDiv.innerHTML = "Select the starting position";

const knight = document.querySelector(".knight");
knight.style.zIndex = "2";

const darkCol = "hsl(229, 10%, 47%)";
const lightCol = "hsl(229, 26%, 90%)";

export function renderGrid() {
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const newCell = document.createElement("div");
            newCell.className = "cell";
            newCell.id = `${j} ${i}`;
            newCell.innerHTML = `${j}, ${i}`;
            gridDiv.appendChild(newCell);
        }
    }
}

export function addListeners(BoardClass) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(function (element) {
        element.addEventListener("click", function (event) {
            cellClicked(BoardClass, element);
        });
    });
}

function cellClicked(BoardClass, element) {
    if (!BoardClass.src) {
        element.style.zIndex = "1";
        element.style.backgroundColor = "hsl(27, 80%, 70%)";
        element.style.boxShadow = "0px 0px 20px 7px hsl(27, 80%, 70%, 50%)";

        const cellPos = element.id.split(" ").map((str) => Number(str));
        const newCell = BoardClass.createCell(cellPos[0], cellPos[1]);

        instructDiv.innerHTML = "Select the target position";
        positionKnight(cellPos);

        BoardClass.src = newCell;
    } else if (BoardClass.src && !BoardClass.dest) {
        element.style.zIndex = "1";
        element.style.backgroundColor = "hsl(120, 44%, 57%)";
        element.style.boxShadow = "0px 0px 20px 7px hsl(120, 44%, 57%, 50%)";

        const cellPos = element.id.split(" ").map((str) => Number(str));
        const newCell = BoardClass.createCell(cellPos[0], cellPos[1]);

        BoardClass.dest = newCell;

        const pathArray = BoardClass.findShortestPath(BoardClass.src, [
            newCell.x,
            newCell.y,
        ]);
        instructDiv.innerHTML = `The shortest path is ${
            pathArray.length - 1
        } moves`;
        showPathTaken(pathArray);
    }
}

async function showPathTaken(pathArray) {
    let knight = document.querySelector(".knight");
    let i = 0;

    for (let i = 0; i < pathArray.length - 1; i++) {
        knight = await animate(knight, pathArray, i);
    }

    const finalCell = pathArray[pathArray.length - 1];
    positionKnight([finalCell.x, finalCell.y]);
}

function animate(elem, pathArray, i) {
    return new Promise((resolve, reject) => {
        function handleAnimationEnd() {
            const newKnight = elem.cloneNode(true);
            elem.parentNode.replaceChild(newKnight, elem);
            newKnight.className = "knight";

            hidePossibleMoves();
            resolve(newKnight);
        }

        elem.addEventListener("animationend", handleAnimationEnd);
        moveBetween(pathArray, i);
    });
}

function moveBetween(array, i) {
    const pos1 = [array[i].x, array[i].y];
    const pos2 = [array[i + 1].x, array[i + 1].y];
    moveKnight(pos1, pos2);
}

function moveKnight(startPos, endPos) {
    console.log("moving", startPos, "->", endPos);

    const start = index_to_px(startPos);
    const end = index_to_px(endPos);
    const knight = document.querySelector(".knight");

    showPossibleMoves(startPos);
    knight.style.setProperty("--startLeft", `${start[0]}px`);
    knight.style.setProperty("--startBottom", `${start[1]}px`);
    knight.style.setProperty("--endLeft", `${end[0]}px`);
    knight.style.setProperty("--endBottom", `${end[1]}px`);

    knight.classList.add("moving");
}

function positionKnight(pos) {
    console.log("positioning", pos);
    const knight = document.querySelector(".knight");
    const coords = index_to_px(pos);

    knight.style.left = `${coords[0]}px`;
    knight.style.bottom = `${coords[1]}px`;
    knight.style.display = "block";
}

function showPossibleMoves(currentPos) {
    const dx = [2, 2, -2, -2, 1, 1, -1, -1];
    const dy = [-1, 1, 1, -1, 2, -2, 2, -2];

    for (let i = 0; i < 8; i++) {
        const x = currentPos[0] + dx[i];
        const y = currentPos[1] + dy[i];
        const cellDiv = findCellElement(x, y);
        if (cellDiv) {
            const bgCol = cellDiv.style.backgroundColor;
            if (
                bgCol == "rgb(223, 225, 236)" ||
                bgCol == "rgb(108, 112, 132)"
            ) {
                if (bgCol == "rgb(108, 112, 132)") {
                    cellDiv.style.backgroundColor = "hsl(197, 29%, 65%)";
                }
                if (bgCol == "rgb(223, 225, 236)") {
                    cellDiv.style.backgroundColor = "hsl(197, 49%, 79%)";
                }
            }
        }
    }
}

function hidePossibleMoves() {
    const cellsArray = [...document.querySelectorAll(".cell")];
    cellsArray.forEach((element) => {
        const bgCol = element.style.backgroundColor;
        if (bgCol == "rgb(140, 177, 192)") {
            element.style.backgroundColor = darkCol;
        }
        if (bgCol == "rgb(175, 213, 228)") {
            element.style.backgroundColor = lightCol;
        }
    });
}

function findCellElement(x, y) {
    const cell = document.getElementById(`${x} ${y}`);
    return cell;
}

function index_to_px(pos) {
    const x = pos[0] * 80;
    const y = pos[1] * 80;
    return [x, y];
}

export function setCellColors() {
    const cellsArray = [...document.querySelectorAll(".cell")];

    let row = 1;
    for (let i = 0; i < cellsArray.length; i++) {
        if (i % 8 == 0) {
            row = row + 1;
        }
        if (row % 2 == 0) {
            if (i % 2 == 0) {
                cellsArray[i].style.backgroundColor = lightCol;
            } else {
                cellsArray[i].style.backgroundColor = darkCol;
            }
        } else {
            if (i % 2 == 0) {
                cellsArray[i].style.backgroundColor = darkCol;
            } else {
                cellsArray[i].style.backgroundColor = lightCol;
            }
        }
    }
}
