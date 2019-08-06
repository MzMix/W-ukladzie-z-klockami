class Axis {
    constructor() {
        this.visible = false;
        // this.visible = true;
        this.axisWidth = settings.axisWidth;
        this.axisHeight = settings.axisHeight;
        this.axisColor = settings.axisColor;
    }

    update() {
        if (this.visible) this.draw();
        // print(this.visible)
    }

    draw() {
        push();
        stroke('red');
        strokeWeight(4)

        //Position of the axis do not change! They are static!

        line(width / 2 - 1, settings.squareSize + settings.squareSpacer, width / 2 - 1, height - settings.squareSize - settings.squareSpacer);

        line(settings.squareSize + settings.squareSpacer, height / 2 - 1, width - settings.squareSize - settings.squareSpacer, height / 2 - 1);

        pop();

    }

}
const axis = new Axis();

function addMethodsToObjects() {
    userInterface.generateColorContrainer = function () {
        this.palette = [];
        this.pickedColor = '';

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
        print(userInterface.pickedColor)
        if (userInterface.pickedColor) {
            this.fill = userInterface.pickedColor;
        }
    }

    action.symX = function () {

    }

    action.symY = function () {

    }

    action.togAxis = function () {
        axis.visible = !axis.visible;
        print("Axis switch!")
    }

    action.changeSegContent = function (type) {

    }

    // settings.basicColorScheme = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];

    settings.addValues({
        axisWidth: 5,
        axisHeight: 10,
        axisColor: 'red'
    })

    userInterface.executeQueue = {
        displayAxis: () => {
            axis.update()
        }
    }

}

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard().generateColorContrainer();
    for (let segment of userInterface.board) {
        segment.display();
    }
    noLoop();
}

function draw() {
    // userInterface.refreshBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
}

function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}