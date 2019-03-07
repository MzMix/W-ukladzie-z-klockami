Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

class Segment {
    constructor(pos, dim, iJ, kartPos, index, number) {
        this.pos = pos;
        this.dim = dim;
        this.kartPos = kartPos;
        this.index = index;
        this.iJ = iJ;
        this.fill = color('#C0C0C0');
        this.stroke = color(255, 255, 255, 125);
        this.textColor = color(255, 255, 255);
        this.number = number;
        this.txt = this.number;
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
            let txt;

            if (!Global.mult) {
                txt = Global.litery[this.iJ.i - 1]
            } else {
                txt = this.iJ.i;
            }

            if (this.iJ.i == 0 || this.iJ.i == 11) {
                txt = this.iJ.j;
            }

            textSize(15);
            fill(this.textColor);
            stroke(this.textColor);
            textAlign(CENTER, CENTER)
            strokeWeight(0);
            text(txt, 2, 2, this.dim.w, this.dim.h);

        } else {
            textSize(15);
            fill(0);
            stroke(255);
            textAlign(CENTER, CENTER)
            strokeWeight(0);
            text(this.txt, 2, 2, this.dim.w, this.dim.h);
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

    setColor() {
        this.fill = Global.picekedColor;

        if (!this.index && Global.symetry) {
            for (let s of Global.segments) {
                if (s.kartPos) {
                    let sx = s.kartPos.x;
                    let sy = s.kartPos.y;

                    if (Global.symX < 0 && Global.symY > 0) {
                        //Symetria X:
                        if (sx == Global.symY * (this.kartPos.x) && sy == Global.symX * (this.kartPos.y - 1)) {
                            s.fill = Global.picekedColor;
                            break;
                        }
                    }

                    if (Global.symY < 0 && Global.symX > 0) {
                        // Symetria Y:
                        if (sx == Global.symY * (this.kartPos.x + 1) && sy == Global.symX * (this.kartPos.y)) {
                            s.fill = Global.picekedColor;
                            break;
                        }
                    }

                    if (Global.symX < 0 && Global.symY < 0) {
                        // Symetria WŚ:
                        if (sx == Global.symY * (this.kartPos.x + 1) && sy == Global.symX * (this.kartPos.y - 1)) {
                            s.fill = Global.picekedColor;
                            break;
                        }
                    }

                }
            }
        }
    }
}

class Gui {

    createModal() {
        let modal = createDiv();
        select('body').child(modal);
        modal.addClass('modal');
        modal.id('modal1');

        modal.html('<div class="modal-content"><span class="close" id="closeBtn">&times;</span><h1>Opcje:</h1></div>');

        select('#closeBtn').mouseClicked(() => {
            select('#modal1').style('display', "none");
            Global.modalOpened = false;
        });

        return this;
    }

    generateOption(destination, dataStorage, spacerName, inputType, inputName, fxn, atr, listOptions) {
        let spacer, input;

        if (!Global.hasOwnProperty(dataStorage)) {
            Global[`${dataStorage}`] = [];
        }

        if (spacerName) {
            spacer = createDiv(spacerName);
            spacer.addClass('spacer');
            select(destination).child(spacer);
        }

        if (inputType == 'checkbox') {

            input = createCheckbox(inputName, false);
            if (fxn) {
                input.changed(fxn);
            }

            if (atr) {
                input.attribute('onchange', atr)
            }

        } else if (inputType == 'button') {
            input = createButton(inputName);
            input.mouseClicked(fxn);

            if (atr) {
                input.attribute('onclick', atr)
            }

        } else if (inputType == 'list') {
            input = createSelect();

            if (listOptions) {
                for (let opt of listOptions) {
                    input.option(opt);
                }
            }

            input.changed(fxn);
        }

        Global[dataStorage].push(input);
        select(destination).child(input);
    }

    createModalSection(name) {
        let section = createDiv();
        section.addClass('modalContentSection');
        section.id(name);
        select(".modal-content").child(section);

        return `#${name}`;
    }

    createOptions() {
        this.generateOption(".o1", "axles", "Osie układu:", 'checkbox', "Osie", this.axFlip);
        this.generateOption(".o1", 'symCh', "Symetria:", 'checkbox', "Symetria - oś X", this.symetry, 'Global.symY *= -1');
        this.generateOption(".o1", "symCh", undefined, 'checkbox', "Symetria - oś Y", this.symetry, 'Global.symX *= -1');
        this.generateOption(".o1", "colorIndex", "Zmiana opisu pól", 'button', "Zmiana opisu", this.colorindex);
        this.generateOption(".o1", "dropBtn", "Opcje:", 'button', "Pokaż opcje", function () {
            select('#modal1').style('display', 'block');
            Global.modalOpened = true;
        });

        this.generateOption(this.createModalSection('list'), "textFill", "Zmiana opisu pól", 'list', "Zmiana opisu", this.changeTxt, undefined, ['Numeracja', 'Adresowanie', 'Tabliczka mnożenia', 'Brak opisów']);
        this.generateOption(this.createModalSection('set'), "setSwitch", "Zmiana zestawu", 'list', "Zmiana zestawu", this.changeSet, undefined, ['MoreToMath', 'Zestaw Kreatywny']);
        this.generateOption(this.createModalSection('reset'), "resetBtn", "Reset planszy:", 'button', "Reset", this.reset);
        this.generateOption(this.createModalSection('saveImg'), "saveImgBtn", "Zapis planszy do pliku png:", 'button', "Zapisz", this.saveImg);

        return this;
    }

    saveImg() {
        let data = new Date();
        saveCanvas(`mata-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
    }

    createPalette() {

        Global['palette'] = [];

        for (let col of Global.colors) {

            let div = createDiv();

            if (col == '#C0C0C0') {
                div.html('G');
            }

            div.addClass('paletteBtn');
            div.style('background-color', col);
            div.attribute("onclick", `pick('${col}')`);
            select(".palette").child(div);
            Global.palette.push(div);
        }

        return this;
    }

    createBox() {
        let s = Global.size * (Global.segN + 2) + 11 * Global.spacer + 6;
        Global['canva'] = createCanvas(s, s);
        select(".box").child(Global.canva);

        return this;
    }

    createBoard() {
        Global['segments'] = [];
        let total = 1;
        for (let j = 0; j < Global.segN + 2; j++) {
            for (let i = 0; i < Global.segN + 2; i++) {

                let pos = {
                    x: i * Global.size + Global.spacer * i + 2,
                    y: j * Global.size + Global.spacer * j + 2
                }

                let dim = {
                    w: Global.size,
                    h: Global.size
                }

                let iJ = {
                    i: i,
                    j: j
                }

                let kartPos = {
                    x: j - (Global.segN + 2) / 2,
                    y: -i + (Global.segN + 2) / 2
                }

                if (((j == 0 || j == Global.segN + 1) && i > 0 && i < Global.segN + 1) ||
                    ((i == 0 || i == Global.segN + 1) && j > 0 && j < Global.segN + 1)) {
                    let s = new Segment(pos, dim, iJ, undefined, true);
                    s.fill = '#F64C72';
                    s.stroke = 'pink';
                    Global.segments.push(s);
                } else if (j != 0 && j != Global.segN + 1) {
                    let s = new Segment(pos, dim, iJ, kartPos, false, total);
                    Global.segments.push(s);
                    total++;
                }
            }
        }

        return this;
    }

    axFlip() {
        Global.axis = this.checked();
    }

    symetry() {
        if (Global.symCh[0].checked() || Global.symCh[1].checked()) {
            Global.symetry = true;
        } else {
            Global.symetry = false;
        }
    }

    reset() {
        for (let s of Global.segments) {
            if (!s.index) {
                s.fill = Global.colors[Global.colors.length - 1];
            } else {
                s.fill = '#F64C72'
                s.stroke = 'pink';
                s.textColor = color(255, 255, 255);
            }
        }
    }

    colorindex() {
        for (let s of Global.segments) {
            if (s.index) {
                if (s.iJ.i.between(0, 11)) {

                    if (s.fill == '#F64C72' && s.stroke == 'pink') {
                        s.fill = Global.colors[abs(s.iJ.i - 1)];
                        s.textColor = color(0, 0, 0, 0);
                    } else {
                        s.fill = '#F64C72'
                        s.stroke = 'pink';
                        s.textColor = color(255, 255, 255);
                    }
                } else if (s.iJ.j.between(0, 11)) {
                    if (s.fill == '#F64C72' && s.stroke == 'pink') {
                        s.fill = Global.colors[abs(s.iJ.j - 1)];
                        s.stroke = color(0, 0, 0, 0);
                        s.textColor = color(0, 0, 0, 0);
                    } else {
                        s.fill = '#F64C72'
                        s.stroke = 'pink';
                        s.textColor = color(255, 255, 255);
                    }
                }
            }
        }
    }

    changeTxt() {
        let type = this.value();
        let eql;

        switch (type) {
            case 'Numeracja':
                eql = 's.number';
                Global.mult = false;
                break;

            case 'Adresowanie':
                eql = 'Global.litery[s.iJ.i - 1] + s.iJ.j';
                Global.mult = false;
                break;

            case 'Tabliczka mnożenia':
                eql = 's.iJ.i * s.iJ.j'
                Global.mult = true;
                break;

            case 'Brak opisów':
                eql = 'undefined';
                Global.mult = false;
                break;

            default:
                eql = 's.number';
                Global.mult = false;
                break;
        }

        for (let s of Global.segments) {
            if (!s.index) {
                s.txt = eval(eql);
            }
        }
    }

    changeSet() {
        let type = this.value();

        if (type == "MoreToMath") {
            Global.colors = Global.mtmColors;
        } else if (type == "Zestaw Kreatywny") {
            Global.colors = Global.crColors;
        }

        let btns = selectAll('.paletteBtn');
        let i = 0;
        for (let b of btns) {
            b.style('background-color', Global.colors[i]);
            b.attribute("onclick", `pick('${Global.colors[i]}')`);
            i++;
        }

    }

}

const Global = {
    size: 40,
    segN: 10,
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
    mtmColors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
    crColors: ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange', '#C0C0C0'],
    litery: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    spacer: 7,
    picekedColor: '#C0C0C0',
    axis: false,
    symetry: false,
    symCh: [],
    symX: 1,
    symY: 1,
    indexColored: 0,
    modalOpened: false,
    mult: false
}

function pick(color) {
    Global.picekedColor = color;
}

function setup() {
    cursor('pointer');
    Global['gui'] = new Gui();
    Global.gui.createPalette().createBox().createBoard().createModal().createOptions();
}

function draw() {
    background(color('#553D67'));

    if (Global.segments) {
        for (let s of Global.segments) {
            s.display();
        }
    }

    if (Global.axis) {
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
    if (!Global.modalOpened) {
        for (s of Global.segments) {
            if (s.checkPointing() && !s.index) {
                s.setColor();
            }
        }
    }
}