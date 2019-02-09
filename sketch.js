class Segment {
    constructor(pos, kartPos, dim) {
        this.pos = pos;
        this.kartPosim = kartPos;
        this.dim = dim;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        fill('#efefef');
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

const projectData = {
    cWidth: 401,
    cHeight: 401,
    size: 40,
    segN: 10
}

function createBoard() {
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

}

function setup() {
    let c = createCanvas(projectData.cWidth, projectData.cHeight);
    select(".box").child(c);
    createBoard();
    noLoop();
}

function draw() {
    background(255);

    if (projectData.segments) {
        for (let s of projectData.segments) {
            s.display();
        }
    }

}