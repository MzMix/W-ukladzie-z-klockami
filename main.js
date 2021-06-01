class Board {

    constructor() {
        this.backgroundColor = "#D3D3D3"
        // this.
    }

    handleBoardClick(cellID) {
        print(cellID);
    }
}

class boardCell {

    constructor(id, fillColor, text) {
        this.cellID = id;
        this.fillColor = fillColor;
        this.text = text;
        // this.previousColorID = 0;
    }

    chageFillColor(color) {

        if (color) {
            // this.previousColorID = 
            this.fillColor = color;
        } else {
            this.fillColor = board.backgroundColor;
        }

    }

}

const board = new Board();

function setup() {
    generateBoard();
}


function draw() {

}

function generateBoard() {

    let insert = '';
    let destination = select(".boardContainer");
    let counter = 0;

    for (let i = 0; i <= 11; i++) {

        for (let j = 0; j <= 11; j++) {

            if ((i == 0 && j == 0) || (i == 0 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;
            else if ((i == 11 && j == 0) || (i == 11 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;

            else if (i == 0) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;
            else if (i == 11) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j-11}</div></div>`;

            else if ((i != 0) && (i != 11) && (j == 0)) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`
            else if ((i != 0) && (i != 11) && (j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 id="boardCell${counter}"><div class="contentBox">${i+j-11}</div></div>`

            else insert = `<div class="boardCell contentCell ratio ratio-1x1" id="boardCell${counter}" onclick="board.handleBoardClick(${counter})"><div class="contentBox">${i+j-1}</div></div>`

            destination.html(insert, true);
            counter++;
        }

    }

}