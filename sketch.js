function setup() {
    userInterface.createInterface();
    userInterface.generateBoard();
    userInterface.generateColorContrainer();

    noLoop();
}

function draw() {
    clear();

    for (let segment of userInterface.board) {
        segment.display();
    }
}

//Optymalizacja
function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}

function foo() {
    print(1);
}