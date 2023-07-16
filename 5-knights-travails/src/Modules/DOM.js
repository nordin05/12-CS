const gridDiv = document.querySelector(".grid");
const instructDiv = document.querySelector(".instructions");
instructDiv.innerHTML = "Select the starting position";
const knight = document.querySelector(".knight");

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
        element.style.backgroundColor = "red";

        const cellPos = element.id.split(" ").map((str) => Number(str));
        const newCell = BoardClass.createCell(cellPos[0], cellPos[1]);

        instructDiv.innerHTML = "Select the target position";
        positionKnight(cellPos);

        BoardClass.src = newCell;
    } else if (BoardClass.src && !BoardClass.dest) {
        element.style.backgroundColor = "green";

        const cellPos = element.id.split(" ").map((str) => Number(str));
        const newCell = BoardClass.createCell(cellPos[0], cellPos[1]);

        BoardClass.dest = newCell;

        const pathArray = BoardClass.findShortestPath(BoardClass.src, [
            newCell.x,
            newCell.y,
        ]);
        console.log(pathArray);
        instructDiv.innerHTML = `The shortest path is ${
            pathArray.length - 1
        } moves`;
        showPathTaken(pathArray);
    }
}

function showPossibleMoves(BoardClass, currentPos) {
    for (let i = 0; i < 8; i++) {
        const x = currentPos[0] + BoardClass.possibleMoves["row"][i];
        const y = currentPos[1] + BoardClass.possibleMoves["column"][i];
        if (BoardClass.isValidCoord(x, y)) {
            const cell = findCellElement(x, y);
            cell.style.backgroundColor = "aquamarine";
        }
    }
}

function findCellElement(x, y) {
    const cell = document.getElementById(`${x} ${y}`);
    return cell;
}

function positionKnight(pos) {
    const coords = index_to_px(pos);

    knight.style.left = `${coords[0]}px`;
    knight.style.bottom = `${coords[1]}px`;
    knight.style.display = "block";
}

function index_to_px(pos) {
    const x = pos[0] * 88;
    const y = pos[1] * 88;
    return [x, y];
}

function showPathTaken(pathArray) {
    let i = 0;
    const knight = document.querySelector(".knight");

    moveBetween(pathArray, i);
    i = i + 1;

    // MAKE THIS FOR LOOP
    if (i < pathArray.length - 1) {
        console.log(i);
        knight.addEventListener("animationend", () => {
            const newKnight = knight.cloneNode(true);
            knight.parentNode.replaceChild(newKnight, knight);

            newKnight.className = "knight";
            moveBetween(pathArray, i);
            i = i + 1;
        });
    }
}

function moveBetween(array, i) {
    const pos1 = [array[i].x, array[i].y];
    const pos2 = [array[i + 1].x, array[i + 1].y];
    moveKnight(pos1, pos2);
}

function moveKnight(startPos, endPos) {
    console.log(startPos, "->", endPos);

    const start = index_to_px(startPos);
    const end = index_to_px(endPos);
    const knight = document.querySelector(".knight");

    knight.style.setProperty("--startLeft", `${start[0]}px`);
    knight.style.setProperty("--startBottom", `${start[1]}px`);
    knight.style.setProperty("--endLeft", `${end[0]}px`);
    knight.style.setProperty("--endBottom", `${end[1]}px`);

    knight.classList.add("moving");
}
