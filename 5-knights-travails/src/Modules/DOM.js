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
