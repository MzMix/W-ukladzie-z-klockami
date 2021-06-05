const utility = {
    formatSingleDigitNumbers: function (inputNumber) {
        let outputNumber;
        if (inputNumber >= 10) {
            return inputNumber;
        } else {
            outputNumber = '0' + inputNumber;
            return outputNumber;
        }
    }
}

class Board {

    constructor() {
        this.backgroundColor = "#D3D3D3"
    }

    handleBoardClick(cellID) {

        let boardCell = select(`#boardCell${cellID}`);
        let colorNumber = colorSets.colorNumber;
        // if(symetria){}


        boardCell.style('background-color', colorSets.pickedColor);
        boardCell.attribute('data-colorNumber', colorNumber);
    }

    clearBoard() {

        for (let i = 0; i < 144; i++) {

            let target = select('#boardCell' + i);

            if (target && !target.hasClass('indexCell')) {
                target.style('backgroundColor', colorSets.backgroundColor);
            }

        }

    }

    updateCells() {
        for (let i = 0; i < 144; i++) {

            let target = select('#boardCell' + i);

            if (target && !target.hasClass('indexCell')) {

                let colorId = target.attribute('data-colorNumber');
                let newColor = colorSets[`colorSet${colorContainer.colorSetId}`][colorId];

                target.style('backgroundColor', `backgroundColor = ${newColor};`);
            }

        }
    }
}

class boardCell {

    constructor(id, fillColor, text) {
        this.cellID = id;
        this.fillColor = fillColor;
        this.text = text;
        // this.previousColorID = 0;
    }

    chageFillColor(color) {

        if (color) {
            // this.previousColorID = 
            this.fillColor = color;
        } else {
            this.fillColor = board.backgroundColor;
        }

    }

}

class Axies {
    constructor(vertX, vertY, horX, horY) {
        this.visible = false;
        this.vertPos = {
            x: vertX,
            y: vertY
        }
        this.horPos = {
            x: horX,
            y: horY
        }

        this.vertHeight = (select('.boardContainer').height) - 25;
        this.vert = createDiv("");
        this.vert.style('border-left', '3px solid red');
        this.vert.style('height', `${this.vertHeight}px`);
        this.vert.position(this.vertPos.x, this.vertPos.y);
        this.vert.addClass('invisible');
        this.vert.id('verticalAxies');

        this.horWidtht = (select('.boardContainer').width) - 35;
        this.hor = createDiv("");
        this.hor.style('border-top', '3px solid red');
        this.hor.style('width', `${this.horWidtht}px`);
        this.hor.position(this.horPos.x, this.horPos.y);
        this.hor.addClass('invisible');
        this.hor.id('horizontalAxies');
    }

    toggleAxies() {

        if (this.visible) {
            this.visible = false;

            this.vert.removeClass('visible');
            this.vert.addClass('invisible');

            this.hor.removeClass('visible');
            this.hor.addClass('invisible');
        } else {
            this.visible = true;

            this.vert.removeClass('invisible');
            this.vert.addClass('visible');

            this.hor.removeClass('invisible');
            this.hor.addClass('visible');
        }

    }

    update(vertX, vertY, horX, horY) {
        this.vertHeight = (select('.boardContainer').height) - 25;
        this.vert.style('height', `${this.vertHeight}px`);
        this.vertPos.x = vertX;
        this.vertPos.y = vertY;
        this.vert.position(this.vertPos.x, this.vertPos.y);

        this.horWidtht = (select('.boardContainer').width) - 35;
        this.hor.style('width', `${this.horWidtht}px`);
        this.horPos.x = horX;
        this.horPos.y = horY;
        this.hor.position(this.horPos.x, this.horPos.y);
    }
}

class ColorSets {
    constructor(colorSet, colorSetName) {
        this.colorSet1 = colorSet;
        this.colorSet1Name = colorSetName;
        this.numberOfSets = 1;
        this.pickedColor = undefined;
        this.backgroundColor = "#D3D3D3";
        this.colorNumber = undefined;
    }

    addColorSet(colorSet, colorSetName) {
        this.numberOfSets++;
        let setName = `colorSet${this.numberOfSets}`;
        this[setName] = colorSet;
        this[setName + 'Name'] = colorSetName;
    }

    setColor(colorToSet, colorNumber) {
        this.pickedColor = colorToSet;
        this.colorNumber = colorNumber;
    }

    addCustomColorSet() {
        let setAvaliable = false;
        let colorArray = [];

        let setName = select("#newSetName").value();

        for (let i = 1; i <= colorSets.numberOfSets; i++) {
            if (setName == colorSets[`colorSet${i}Name`]) {
                alert("Zestaw o takiej nazwie już istnieje!")
                setAvaliable = false;
            } else {
                setAvaliable = true;
            }
        }

        if (setAvaliable) {
            for (let i = 0; i < 10; i++) {
                let input = select(`#colorPicker${i}`).value();
                colorArray.push(input);
            }

            colorSets.addColorSet(colorArray, setName);
            colorContainer.generateColorSelect();

            let myModalEl = document.getElementById('customColorSetModal')
            bootstrap.Modal.getInstance(myModalEl).hide();
        }
    }

    displayColorSetModal() {
        let basicColorSet = colorSets[`colorSet${colorContainer.colorSetId}`];
        let htmlInsert, colorPicker;
        let target = select('#customColorModalBody');

        target.html("");

        select("#newSetName").value(`Zestaw ${utility.formatSingleDigitNumbers(colorSets.numberOfSets-1)}`);

        for (let i = 0; i < colorSets[`colorSet${colorContainer.colorSetId}`].length; i++) {

            htmlInsert = createDiv(`Kolor ${utility.formatSingleDigitNumbers(i+1)}: <br>`);
            htmlInsert.addClass("customColorPickerDiv");
            colorPicker = createColorPicker(basicColorSet[i]);
            colorPicker.addClass("form-control form-control-color colorPicker");
            colorPicker.attribute("id", "colorPicker" + i);
            htmlInsert.child(colorPicker);

            target.child(htmlInsert);
        }

    }
}

class ColorContainer {

    constructor() {
        this.listOfDivs = [];
        this.colorSetId = 1;
    }

    generateColorContainer() {
        let setName = `colorSet${this.colorSetId}`;
        let listOfColors = colorSets[setName];
        let parent = select('#colorConatiner');

        let colorToInsert, div;

        for (let i = 0; i < listOfColors.length; i++) {

            colorToInsert = listOfColors[i];
            div = createDiv();
            div.addClass('colorContainerSquare ratio ratio-1x1');
            div.style('background-color', colorToInsert);
            div.attribute('onclick', `colorSets.setColor('${colorToInsert}',${i})`);
            div.parent(parent);
        }

        colorToInsert = colorSets.backgroundColor;
        div = createDiv();
        div.addClass('colorContainerSquare ratio ratio-1x1');
        div.style('background-color', colorToInsert);
        div.attribute('onclick', `colorSets.setColor('${colorToInsert}', 10)`);
        div.parent(parent);
    }

    generateColorSelect(firstGeneration) {

        let htmlContent = ""
        select("#colorSelectForm").html("");

        for (let i = 1; i <= colorSets.numberOfSets; i++) {

            let name = colorSets[`colorSet${i}Name`];

            if (firstGeneration && i == 1) htmlContent = `<option selected value='${i}'>Zestaw ${name}</option>`;
            else htmlContent = `<option value='${i}'>Zestaw ${name}</option>`;

            select("#colorSelectForm").html(htmlContent, true);
        }

    }

    switchColorSet() {

        let setNumber = select("#colorSelectForm").value();
        this.colorSetId = setNumber;

        select('#colorConatiner').html("");
        this.generateColorContainer();

        board.updateCells();
    }

}

const board = new Board();
const colorSets = new ColorSets(['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange'], 'Matematyczny');
const colorContainer = new ColorContainer();
var axies;

function positionAxies() {
    let verticalAxiesX = 0;
    let verticalAxiesY = 0;
    let horizontalAxiesX = 0;
    let horizontalAxiesY = 0;

    let vertX = select('#boardCell17').position().x;
    let vertY = select('#boardCell19').position().x;
    verticalAxiesX = ((vertX + vertY) / 2) - 3;
    verticalAxiesY = (select('#boardCell8').position().y) + 5;


    let horX = select('#boardCell60').position().y;
    let horY = select('#boardCell72').position().y;
    horizontalAxiesX = (select('#boardCell0').position().x) + 5;
    horizontalAxiesY = ((horX + horY) / 2) + 14.5;

    axies.update(verticalAxiesX, verticalAxiesY, horizontalAxiesX, horizontalAxiesY);
}

function setup() {
    noCanvas();
    noLoop();

    generateBoard();

    axies = new Axies(0, 0);
    positionAxies();

    colorSets.addColorSet(['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange'], "Kreatywny");

    colorContainer.generateColorContainer();
    colorContainer.generateColorSelect(true);
}

function windowResized() {
    positionAxies();
}

function generateBoard() {

    let insert = '';
    let destination = select(".boardContainer");
    let counter = 0;

    for (let i = 0; i <= 11; i++) {

        for (let j = 0; j <= 11; j++) {

            if ((i == 0 && j == 0) || (i == 0 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;
            else if ((i == 11 && j == 0) || (i == 11 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;

            else if (i == 0) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`;
            else if (i == 11) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j-11}</div></div>`;

            else if ((i != 0) && (i != 11) && (j == 0)) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}"><div class="contentBox">${i+j}</div></div>`
            else if ((i != 0) && (i != 11) && (j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 id="boardCell${counter}"><div class="contentBox">${i+j-11}</div></div>`

            else insert = `<div class="boardCell contentCell ratio ratio-1x1" id="boardCell${counter}" onclick="board.handleBoardClick(${counter})"><div class="contentBox">${i+j-1}</div></div>`

            destination.html(insert, true);
            counter++;
        }

    }

}