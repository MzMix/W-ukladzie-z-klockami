function addMethodsToObjects() {
    userInterface.generateColorContrainer = function () {

        this.palette = [];

        for (let col of settings.basicColorScheme) {

            let div = createDiv();

            div.addClass('paletteBtn');
            div.style('background-color', col);
            div.size(1.2 * settings.squareSize, 1.2 * settings.squareSize);
            div.attribute("onclick", `userInterface.pickColor('${col}')`);
            select(".colorSchemeContainer").child(div);
            this.palette.push(div);
        }
        return this;
    }

    userInterface.pickColor = function (color) {
        this.pickedColor = color;
    }

    Segment.prototype.colorSegment = function () {
        if (userInterface.pickedColor) {
            this.fill = userInterface.pickedColor;
        }
    }

}

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard().generateColorContrainer();

    noLoop();
}

function draw() {
    userInterface.refreshBoard();
}

//Optymalizacja
function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}

function foo() {
    print(1);
}