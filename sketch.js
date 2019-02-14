class Segment {
    constructor(pos, dim, iJ, kartPos, index) {
        this.pos = pos;
        this.dim = dim;
        this.kartPosim = kartPos;
        this.index = index;
        this.iJ = iJ;
        this.fill = color('#C0C0C0');
        this.stroke = color(255, 255, 255, 125);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(this.fill);
        stroke(this.stroke);

        let r = 2;
        if (this.index) r = 10;

        rect(0, 0, this.dim.w, this.dim.h, r)

        if (this.index) {

            let txt = this.iJ.i

            if (this.iJ.i == 0 || this.iJ.i == 11) {
                txt = projectData.litery[this.iJ.j - 1];
            }

            textSize(15);
            fill(255);
            stroke(255);
            textAlign(CENTER, CENTER)
            strokeWeight(0);
            text(txt, 2, 2, this.dim.w, this.dim.h);
        }

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

    createOptions() {
        projectData['axis'] = true;

        return this;
    }

    createPalette() {

        projectData['palette'] = [];

        for (let col of projectData.colors) {

            let div = createDiv();

            if (col == '#C0C0C0') {
                div.html('G');
            }
            div.addClass('paletteBtn');
            div.style('background-color', col);
            div.attribute("onclick", `pick('${col}')`);
            select(".palette").child(div);
            projectData.palette.push(div);
        }

        return this;
    }

    createBox() {
        let s = projectData.size * (projectData.segN + 2) + 11 * projectData.spacer + 1;
        projectData['canva'] = createCanvas(s, s);
        select(".box").child(projectData.canva);

        return this;
    }

    createBoard() {
        projectData['segments'] = [];

        let jTrack = projectData.segN / -2;
        let iTrack = projectData.segN / -2;

        for (let j = 0; j < projectData.segN + 2; j++) {
            for (let i = 0; i < projectData.segN + 2; i++) {

                let pos = {
                    x: j * projectData.size + projectData.spacer * j,
                    y: i * projectData.size + projectData.spacer * i
                }

                let dim = {
                    w: projectData.size,
                    h: projectData.size
                }

                let iJ = {
                    i: i,
                    j: j
                }

                if (((j == 0 || j == projectData.segN + 1) && i > 0 && i < projectData.segN + 1) ||
                    ((i == 0 || i == projectData.segN + 1) && j > 0 && j < projectData.segN + 1)) {
                    let s = new Segment(pos, dim, iJ, undefined, true);
                    s.fill = '#F64C72';
                    s.stroke = 'pink';
                    projectData.segments.push(s);
                } else if (j != 0 && j != projectData.segN + 1) {

                    let kartPos = {
                        x: jTrack,
                        y: iTrack
                    }

                    projectData.segments.push(new Segment(pos, dim, iJ, kartPos, false));

                    jTrack++;
                    iTrack++;
                }

            }
        }

        return this;
    }

}

const projectData = {
    size: 40,
    segN: 10,
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
    litery: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    spacer: 7,
    picekedColor: '#C0C0C0'
}

function pick(color) {
    projectData.picekedColor = color;
}

function setup() {
    projectData['gui'] = new Gui();
    projectData.gui.createPalette().createBox().createBoard().createOptions();

    // noLoop();
}

function draw() {
    background(color('#553D67'));

    if (projectData.segments) {
        for (let s of projectData.segments) {
            s.display();
        }
    }

    if (projectData.axis) {
        push();
        translate(-1 / 2, -1 / 2);
        stroke('yellow');
        strokeWeight(3);
        line(0, height / 2, width, height / 2);
        line(width / 2, 0, width / 2, height);
        pop();
    }
}

function mouseClicked() {
    for (s of projectData.segments) {
        if (s.checkPointing() && !s.index) {
            s.fill = projectData.picekedColor;
            redraw();
        }
    }
}