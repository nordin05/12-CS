const gridDiv = document.querySelector(".grid");

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
        BoardClass.src = newCell;
    } else if (BoardClass.src && !BoardClass.dest) {
        element.style.backgroundColor = "green";
        const cellPos = element.id.split(" ").map((str) => Number(str));
        const newCell = BoardClass.createCell(cellPos[0], cellPos[1]);
        BoardClass.dest = newCell;

        const result = BoardClass.findShortestPath(BoardClass.src, [
            newCell.x,
            newCell.y,
        ]);
        console.log(result);
    }
}
