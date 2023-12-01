const header = document.getElementById("header");
const srn = document.getElementById("srn");
const cellcontainer = document.getElementById("cell-container");

const columns = 26,
    row = 100;

for (let i = 1; i <= columns; i++) {
    let headcell = document.createElement("div");
    headcell.className = "head-cell";
    if (i != 0) {
        headcell.innerText = String.fromCharCode(64 + i);
    }

    header.appendChild(headcell);
}

for (let i = 1; i <= row; i++) {
    let srncell = document.createElement("div");
    srncell.innerText = i;
    srncell.className = "srn-cell";

    srn.appendChild(srncell);
}

for (let i = 0; i < row; i++) {
    const brow = document.createElement("div");
    brow.className = "row";
    for (let j = 0; j < columns; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${String.fromCharCode(65 + j)}${i + 1}`;
        cell.setAttribute("contenteditable", true);
        brow.appendChild(cell);
        cell.addEventListener("focus", onfocuscell);
        cell.addEventListener("input", onchangetext);
    }
    cellcontainer.appendChild(brow);
}
