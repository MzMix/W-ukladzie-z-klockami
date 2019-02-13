class Segment {
    constructor(pos, kartPos, dim) {
        this.pos = pos;
        this.kartPosim = kartPos;
        this.dim = dim;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        fill('#C0C0C0');
        stroke('blue');
        rect(0, 0, this.dim.w, this.dim.h)

        pop();
    }

    checkPointing() {
        if (mouseX > this.pos.x && mouseX < this.pos.x + this.dim.w &&
            mouseY > this.pos.y && mouseY < this.pos.y + this.dim.w) {
            return true;
        } else {
            return false;
        }
    }
}

class Gui {

    constructor() {
        projectData['indexes'] = [];
        let w = projectData.size * projectData.segN + 1 + 2 * projectData.size + 50;
        select('.box').style('width', `${w}px`);

    }

    createOptions() {
        projectData['axis'] = true;

        return this;
    }

    createPalette() {

        projectData['palette'] = [];

        for (let col of projectData.colors) {

            let div = createDiv();
            div.addClass('paletteBtn');
            div.style('background-color', col);
            div.attribute("onclick", "pick(this)");
            select(".palette").child(div);
            projectData.palette.push(div);
        }

        return this;
    }

    generateindexes(val) {
        for (let i = 0; i < projectData.segN; i++) {
            let div = createDiv();
            div.addClass('indexDiv');
            div.style('background-color', projectData.colors[i]);
            div.style('width', `${projectData.size}px`);
            div.style('height', `${projectData.size}px`);
            select(".index" + val).child(div);
            projectData.indexes.push(div);
        }
    }

    createBox() {
        // this.generateindexes('UP');
        this.generateindexes('LEFT');
        projectData['canva'] = createCanvas(projectData.size * projectData.segN + 1, projectData.size * projectData.segN + 1);
        select(".canvasBox").child(projectData.canva);
        this.generateindexes('RIGHT');
        // this.generateindexes('BOTTOM');


        return this;
    }

    createBoard() {
        projectData['segments'] = [];

        for (let j = projectData.segN / -2; j < projectData.segN / 2; j++) {
            for (let i = projectData.segN / -2; i < projectData.segN / 2; i++) {

                let pos = {
                    x: (j + projectData.segN / 2) * projectData.size,
                    y: (i + projectData.segN / 2) * projectData.size
                }

                let kartPos = {
                    x: j,
                    y: i
                }

                let dim = {
                    w: projectData.size,
                    h: projectData.size
                }

                projectData.segments.push(new Segment(pos, kartPos, dim));
            }
        }

        return this;
    }

}

const projectData = {
    size: 55,
    segN: 10,
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange']
}

function pick(element) {
    print(element);
}

function setup() {
    projectData['gui'] = new Gui();
    projectData.gui.createPalette().createBox().createBoard().createOptions();

    noLoop();
}

function draw() {
    background(255);

    if (projectData.segments) {
        for (let s of projectData.segments) {
            s.display();
        }
    }

    if (projectData.axis) {
        stroke('red');
        strokeWeight(3);
        strokeCap(SQUARE);
        line(0, height / 2, width, height / 2);
        line(width / 2, 0, width / 2, height);
    }
}