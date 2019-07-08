new p5;

function preload() {
    settings.menuJsonPattern = loadJSON("./sideMenu.json", () => {
        console.log("Plik JSON załadowany pomyślnie!");
    }, () => {
        alert("Wystąpił bład! Nastąpi przekierowanie do strony głównej!");
        window.location.href = "https://mzmix.github.io/";
    }, "json")
}

Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

class UserInterface {

    createInterface() {
        let sizeW = settings.squareSize * (settings.squaresBySideW + 2) + 11 * settings.squareSpacer + 6;
        let sizeH = settings.squareSize * (settings.squaresBySideH + 2) + 11 * settings.squareSpacer + 6;
        this.canvas = createCanvas(sizeW, sizeH).parent(select('.canvasDiv'));

        this.generateSideMenu();

        return this;
    }

    generateSideMenu() {
        const data = settings.menuJsonPattern;

        let header;
        if (data.header[0].class) {
            header = (`<h3 class="${data.header[0].class}">${data.header[0].content}</h3>`);
        } else {
            header = (`<h3>${data.header[0].content}</h3>`);
        }


        let content = ` <!-- Opcje: --> <ul class="list-unstyled components">`;

        let part = "";
        let counter = 1;
        for (let submenu of data.sideMenuContent) {

            if (submenu.class) {
                part = `<li class="${submenu.class}">
            <a href="#submenu${counter}" data-toggle="collapse" aria-expanded="false"
               class="dropdown-toggle">${submenu.name}</a></li><ul class="collapse list-unstyled" id="submenu${counter}">`;
            } else {
                part = `<li>
            <a href="#submenu${counter}" data-toggle="collapse" aria-expanded="false"
               class="dropdown-toggle">${submenu.name}</a></li><ul class="collapse list-unstyled" id="submenu${counter}">`;
            }

            for (let opt of submenu.content) {
                part += `<li class="${opt.class}"><a href="#" onclick="${opt.fxn}">${opt.name}</a></li>`;
            }
            counter++;

            part += `</ul></li>`;

            content += part;
        }

        content += `</ul> <!-- Opcje END -->`;

        let footer;
        if (data.footer[0].class) {
            footer = `<a href="${data.footer[0].content.match(/\<(.*?)\>/)[1]}"><h3 class="${data.footer[0].class}">${data.footer[0].content.match(/\((.*?)\)/)[1]}</h3> </a>`;
        } else {
            footer = `<a href="${data.footer[0].content.match(/\<(.*?)\>/)[1]}"><h3>${data.footer[0].content.match(/\((.*?)\)/)[1]}</h3> </a>`;
        }

        select('.sidebar-header').html(header, true);
        select('.sidebar-content').html(content, true);
        select('.sidebar-footer').html(footer, true);
    }

    generateBoard() {

        this.board = [];
        let total = 1;

        for (let y = 0; y < settings.squaresBySideH + 2; y++) {
            for (let x = 0; x < settings.squaresBySideW + 2; x++) {

                let iteratorIndex = {
                    x: x,
                    y: y
                }

                let posKart = {
                    x: y - (settings.squaresBySideH + 2) / 2,
                    y: -x + (settings.squaresBySideW + 2) / 2
                }

                if (((y == 0 || y == settings.squaresBySideH + 1) && x > 0 && x < settings.squaresBySideW + 1) ||
                    ((x == 0 || x == settings.squaresBySideW + 1) && y > 0 && y < settings.squaresBySideH + 1)) {
                    //Index
                    this.board.push(new Index(iteratorIndex, posKart, total));
                } else if (y != 0 && y != settings.squaresBySideH + 1) {
                    this.board.push(new Segment(iteratorIndex, posKart, total));
                    total++;
                }



            }
        }
        return this;
    }

    checkBoardClicks() {
        for (let segment of this.board) {
            if (!(segment instanceof Index)) {
                if (segment.mousePointing()) segment.colorSegment();
            }
        }
    }

    refreshBoard() {
        clear();

        for (let segment of userInterface.board) {
            segment.display();
        }
    }

}

const userInterface = new UserInterface();

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
        this.round = settings.squareCurvature;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.stroke);
        fill(this.fill);

        rect(0, 0, settings.squareSize, settings.squareSize, this.round)

        if (this.txt) {
            textSize(15);
            fill(settings.squareTextColor);
            textAlign(CENTER, CENTER)
            strokeWeight(0);
            text(this.txt, 2, 2, settings.squareSize, settings.squareSize);
        }
        pop();
    }

    mousePointing() {
        return mouseX.between(this.pos.x, this.pos.x + settings.squareSize) &&
            mouseY.between(this.pos.y, this.pos.y + settings.squareSize);
    }
}

class Index extends Segment {
    constructor(iteratorIndex) {
        super(iteratorIndex, null, null);
        this.stroke = settings.indexStroke;
        this.fill = settings.indexFill;
        this.round = settings.indexCurvature;

        this.txt = this.iteratorIndex.x;
        if (this.iteratorIndex.x == 0 || this.iteratorIndex.x == 11) this.txt = this.iteratorIndex.y;
    }

    display() {
        super.display();
    }
}