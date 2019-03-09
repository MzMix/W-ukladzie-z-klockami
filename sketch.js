Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

class Segment {
    constructor(iJ, kartPos, number) {
        this.dim = Global.size;
        this.kartPos = kartPos;
        this.iJ = iJ;
        this.pos = {
            x: this.iJ.i * Global.size + Global.spacer * this.iJ.i + 2,
            y: this.iJ.j * Global.size + Global.spacer * this.iJ.j + 2
        };

        this.fill = '#C0C0C0';
        this.stroke = color(255, 255, 255, 125);
        this.textColor = color(255, 255, 255);
        this.number = number;
        this.txt = this.number;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.stroke);
        fill(this.fill);

        let r = 2;

        square(0, 0, Global.size, r)

        textSize(15);
        fill(0);
        stroke(255);
        textAlign(CENTER, CENTER)
        strokeWeight(0);
        text(this.txt, 2, 2, Global.size, Global.size);

        pop();
    }

    checkPointing() {
        return mouseX.between(this.pos.x, this.pos.x + this.dim) &&
            mouseY.between(this.pos.y, this.pos.y + this.dim);
    }

    setColor() {
        this.fill = Global.picekedColor;

        if (Global.symetry) {
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

class Index extends Segment {
    constructor(iJ) {
        super(iJ, undefined, undefined);
        this.fill = '#F64C72';
        this.stroke = 'pink';
    }

    display() {
        push();
        translate(this.iJ.i * Global.size + Global.spacer * this.iJ.i + 2, this.iJ.j * Global.size + Global.spacer * this.iJ.j + 2);
        fill(this.fill);
        stroke(this.stroke);

        let r = 10;

        rect(0, 0, Global.size, Global.size, r)

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
        text(txt, 2, 2, Global.size, Global.size);

        pop();
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
        this.generateOption(this.createModalSection('set'), "setSwitch", "Zmiana zestawu", 'list', "Zmiana zestawu", this.changeSet, undefined, ['Zestaw 1', 'Zestaw 2']);
        this.generateOption(this.createModalSection('reset'), "resetBtn", "Reset planszy:", 'button', "Reset", this.reset);
        this.generateOption(this.createModalSection('saveImg'), "saveImgBtn", "Zapis planszy do pliku png:", 'button', "Zapisz", this.saveImg);
        this.generateOption(this.createModalSection('saveUrl'), "saveUrlBtn", "Generowanie linku z zapisem planszy:", 'button', "Generuj", createUrl);

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
                    //Index
                    let s = new Index(iJ);
                    Global.segments.push(s);
                } else if (j != 0 && j != Global.segN + 1) {
                    //Segment
                    let s = new Segment(iJ, kartPos, total);
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
            if (s instanceof Index) {
                s.fill = '#F64C72'
                s.stroke = 'pink';
                s.textColor = color(255, 255, 255);
            } else {
                s.fill = Global.colors[Global.colors.length - 1];
            }
        }
    }

    colorindex() {
        for (let s of Global.segments) {
            if (s instanceof Index) {
                if (s.iJ.i.between(0, 11)) {

                    if (s.fill == '#F64C72' && s.stroke == 'pink') {
                        s.fill = Global.colors[abs(s.iJ.i - 1)];
                        s.stroke = color(0, 0, 0, 0);
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

        if (type == "Zestaw 1") {
            Global.colors = Global.mtmColors;
        } else if (type == "Zestaw 2") {
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

    loadBoard() {
        if (Global.seed) {

            let txt = Global.seed;
            let counter = 0;

            for (let s of Global.segments) {
                if (s instanceof Index == false) {

                    let char = txt.charAt(counter);

                    s.fill = Global.colors[Global.urlCodes.indexOf(char)];
                    counter++;
                }
            }
        }

        return this;
    }

}

const Global = {
    size: 40,
    segN: 10,
    colors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
    mtmColors: ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'],
    crColors: ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange', '#C0C0C0'],
    urlCodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    urlSpacer: '*',
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
    Global.gui.createPalette().createBox().createBoard().createModal().createOptions().loadBoard();
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
            if (s instanceof Segment && s.checkPointing()) {
                s.setColor();
            }
        }
    }
}