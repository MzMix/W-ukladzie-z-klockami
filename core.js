new p5;

Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

class UserInterface {

    createInterface() {
        let size = settings.squareSize * (settings.squaresBySide + 2) + 11 * settings.squareSpacer + 6;
        this.canvas = createCanvas(size, size).parent(select('.canvasDiv'));
    }

    generateBoard() {

        this.board = [];
        let total = 1;

        for (let y = 0; y < settings.squaresBySide + 2; y++) {
            for (let x = 0; x < settings.squaresBySide + 2; x++) {

                let iteratorIndex = {
                    x: x,
                    y: y
                }

                let posKart = {
                    x: y - (settings.squaresBySide + 2) / 2,
                    y: -x + (settings.squaresBySide + 2) / 2
                }

                if (((y == 0 || y == settings.squaresBySide + 1) && x > 0 && x < settings.squaresBySide + 1) ||
                    ((x == 0 || x == settings.squaresBySide + 1) && y > 0 && y < settings.squaresBySide + 1)) {
                    //Index
                    this.board.push(new Index(iteratorIndex, posKart, total));
                } else if (y != 0 && y != settings.squaresBySide + 1) {
                    this.board.push(new Segment(iteratorIndex, posKart, total));
                    total++;
                }



            }
        }
    }

    generateColorContrainer() {

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

    }

    pickColor(color) {
        this.pickedColor = color;
        print(this.pickedColor);
    }

    checkBoardClicks() {
        for (let segment of this.board) {
            if (!(segment instanceof Index)) {
                if (segment.mousePointing()) segment.colorSegment();
            }
        }
    }

}

class PresetSettings {
    constructor() {
        this.squareSize = 40;
        this.squareSpacer = 7;
        this.squaresBySide = 10

        this.squareFill = '#C0C0C0';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = color(255, 255, 255);

        this.indexFill = '#F64C72';
        this.indexStroke = 'pink';

        this.basicColorScheme = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];
    }
}

class Segment {
    constructor(iteratorIndex, posKart, num) {
        this.iteratorIndex = iteratorIndex;
        this.posKart = posKart;
        this.num = num;
        this.pos = createVector(
            this.iteratorIndex.x * settings.squareSize + settings.squareSpacer * this.iteratorIndex.x + 2,
            this.iteratorIndex.y * settings.squareSize + settings.squareSpacer * this.iteratorIndex.y + 2
        );
        this.stroke = settings.squareStroke;
        this.fill = settings.squareFill;
        this.round = 2;
        this.txt = '';
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.stroke);
        fill(this.fill);

        rect(0, 0, settings.squareSize, settings.squareSize, this.round)

        textSize(15);
        fill(0);
        stroke(255);
        textAlign(CENTER, CENTER)
        strokeWeight(0);
        text(this.txt, 2, 2, settings.squareSize, settings.squareSize);

        pop();
    }

    mousePointing() {
        return mouseX.between(this.pos.x, this.pos.x + settings.squareSize) &&
            mouseY.between(this.pos.y, this.pos.y + settings.squareSize);
    }

    colorSegment() {
        if (userInterface.pickedColor) {
            this.fill = userInterface.pickedColor;
        }
    }

}

class Index extends Segment {
    constructor(iteratorIndex) {
        super(iteratorIndex, null, null);
        this.stroke = settings.indexStroke;
        this.fill = settings.indexFill;
        this.round = 10;

        this.txt = this.iteratorIndex.x;
        if (this.iteratorIndex.x == 0 || this.iteratorIndex.x == 11) this.txt = this.iteratorIndex.y;
    }

    display() {
        super.display();
    }
}

const userInterface = new UserInterface();
const settings = new PresetSettings();