import {
    userInterface
} from './core.js';

import settings from './settings.js';

const userInterface = new UserInterface();

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

Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};