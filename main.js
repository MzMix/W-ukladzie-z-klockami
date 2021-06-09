const utility = {
    formatSingleDigitNumbers: function (inputNumber) {
        let outputNumber;
        if (inputNumber >= 10) {
            return inputNumber;
        } else {
            outputNumber = '0' + inputNumber;
            return outputNumber;
        }
    },

    getLettersFromAlphabet: function () {
        const letters = (() => {
            return [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
        })();

        return letters;
    }
}

Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this >= minVal && this <= maxVal;
};

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
                target.attribute("data-colorNumber", 10);
            }

        }

    }

    updateCells() {
        for (let i = 0; i < 144; i++) {

            let target = select('#boardCell' + i);

            if (target && !target.hasClass('indexCell')) {

                let colorId = target.attribute('data-colorNumber');
                let newColor = colorSets[`colorSet${colorContainer.colorSetId}`][colorId];

                target.style('backgroundColor', newColor);
            }

        }
    }

    generateBoardSaveUrl() {
        //wygenerowanie zakodowanej listy kolorów
        let contentSequence = readBoardContent();
        let compressedContentSequence = compressBoardContent(contentSequence);
        let shortenedList = countSpaces(compressedContentSequence);
        let hexedList = hexList(shortenedList);

        if (hexedList.length > 0) {
            //utworzenie parametru URL
            let urlInsert = "";
            for (let i = 0; i < hexedList.length; i++) {
                if (i > 0) urlInsert += ',';
                urlInsert += hexedList[i];
            }

            let courrentURL = getURL();

            let cutPosition = courrentURL.indexOf("?");
            courrentURL = courrentURL.slice(0, cutPosition);

            print(`${courrentURL}?zapis=${urlInsert}`);
        } else alert("Plansza jest pusta!")
    }

    loadBoard(inputList) {

        if (inputList) {

            let listOfCommands = deCompressListOfCommands(inputList);

            let board = [];

            for (let element of listOfCommands) {

                //element zawiera [ - należy wypełnić planszę pustymi miejscami
                if (element.includes('[')) {
                    //Wyciągnij wartość z []
                    let value = element.substring(1, element.length - 1);

                    //Wypełnin pola 10 - puste pole
                    for (let i = 0; i < value; i++) {
                        board.push(10);
                    }

                } else {
                    //Dodaj kolor do listy
                    for (let numberColor of element) {
                        board.push(numberColor);
                    }

                }

            }
            //Ustaw kolory na planszy

            let iterator = 0;
            for (let i = 0; i < 144; i++) {
                let target = select('#boardCell' + i);

                if (target && !target.hasClass('indexCell')) {
                    let color = colorSets[`colorSet${colorContainer.colorSetId}`][board[iterator]]
                    target.style('backgroundColor', color);
                    target.attribute("data-colorNumber", board[iterator]);

                    iterator++;
                }

            }
        }

    }

    changeCellContent() {
        let formValue = select("#cellContentSelect").value();

        if (formValue == 1) {
            this.fillBoard("none");
        } else if (formValue == 2) {
            this.fillBoard("numbers");
        } else if (formValue == 3) {
            this.fillBoard("address");
        }

    }

    fillBoard(_input) {

        let iterator = 1;
        let cellPosition, cellPositionXY, insert;
        let targetParent, target;

        for (let i = 0; i < 144; i++) {
            targetParent = select('#boardCell' + i);
            target = select('.contentBox', '#boardCell' + i);

            if (targetParent && !targetParent.hasClass('indexCell')) {
                if (_input == "none") {
                    target.html("");
                } else if (_input == "numbers") {
                    target.html(iterator);
                    iterator++
                } else if (_input == "address") {
                    cellPosition = targetParent.attribute("data-position");
                    cellPositionXY = splitTokens(cellPosition, ',');
                    insert = `${alphabet[cellPositionXY[1]-1]}${cellPositionXY[0]}`
                    target.html(insert);
                }
            }

        }

    }

    fillIndex(_input) {

        let iterator = 1;
        let cellPosition, cellPositionXY;
        let targetParent, target;

        for (let i = 0; i < 144; i++) {
            targetParent = select('#boardCell' + i);
            target = select('.contentBox', '#boardCell' + i);

            if (targetParent && targetParent.hasClass('indexCell')) {
                targetParent.style("backgroundColor", "#EFEFEF")

                if (_input == "none") {
                    target.html("");
                } else if (_input == "numbers") {
                    target.html(targetParent.attribute('data-number'));
                } else if (_input == "address") {
                    cellPosition = targetParent.attribute("data-position");
                    cellPositionXY = splitTokens(cellPosition, ',');

                    if (cellPositionXY[0] != 0 && cellPositionXY[0] != 11) {
                        target.html(targetParent.attribute('data-number'));
                    } else {
                        target.html(alphabet[targetParent.attribute('data-number') - 1]);
                    }

                } else if (_input == "colors") {
                    let newColor = colorSets[`colorSet${colorContainer.colorSetId}`][targetParent.attribute("data-number") - 1];
                    targetParent.style('backgroundColor', newColor);
                    target.html("");
                }
            }

        }

    }

    changeIndex() {
        let formValue = select("#indexContentSelect").value();

        if (formValue == 1) {
            this.fillIndex("none");
        } else if (formValue == 2) {
            this.fillIndex("numbers");
        } else if (formValue == 3) {
            this.fillIndex("address");
        } else if (formValue == 4) {
            this.fillIndex("colors")
        }

    }
}

function deCompressListOfCommands(inputList) {
    //Podziel dostarczone dane w miejscach z ,
    let tempList = split(inputList, ',')

    let listOfCommands = [];

    for (let element of tempList) {
        //Dodaj elementy z [ do listy
        if (element.includes("[")) listOfCommands.push(element);

        else {
            //odszyfruj dostarczony hex
            let deliveredNumber = unhex(element);
            deliveredNumber = deliveredNumber.toString();
            let processedString = deliveredNumber.substring(1);

            listOfCommands.push(processedString);
        }

    }
    return listOfCommands;
}


function readBoardContent() {
    //Lista zawierająca wszystkie ciągi cyfr i liczbę pustych miejsc
    let contrentSequence = [];
    for (let i = 13; i <= 130; i++) {
        //wybranie pola z planszy
        let target = select('#boardCell' + i);

        //Sprawdzanie czy pole jest polem z zawartością (nie index)
        if (target && !target.hasClass('indexCell')) {
            let colorNumber = target.attribute("data-colorNumber");

            if (colorNumber == null) colorNumber = 10;
            else colorNumber = Number(colorNumber);

            if (colorNumber.between(0, 9)) contrentSequence.push(colorNumber)
            else contrentSequence.push("P")
        }

    }
    return contrentSequence;
}

function compressBoardContent(listofContent) {

    //usuwanie zbędnych zer na końcu listy
    //Przedź przez listę od tyłu
    for (let i = listofContent.length - 1; i >= 0; i--) {
        //Jeżeli element zawiera P to jest to puste miejsce
        if (listofContent[i] == "P") {
            listofContent.pop();
            //Jeżeli nie zawieara to znaleziono ciąg kolorów, koniec czyszczenia
        } else break;
    }

    return listofContent;
}

function countSpaces(listofContent) {

    let counter = 0;
    let outputList = [];
    let colorsString = ""

    //Przeszukaj całą listę
    for (let i = 0; i < listofContent.length; i++) {

        let element = listofContent[i];

        //Jeżeli pole jest puste to zwiększ licznik
        if (element == "P") {
            counter++;
        } else {
            //Pole ma zawartość

            //Licznik większy od zera, czyli naliczono puste miejsca - dodaj je do listy i wyzeruj licznik
            //dodaj ciąg kolorów do listy
            if (counter > 0) {
                outputList.push(`!${colorsString}`);
                colorsString = "";

                outputList.push(`[${counter}]`);
                counter = 0;
            }

            colorsString += element;
        }

        //Ostatnia iteracja - dodaj ciąg kolorów do listy
        if (i == listofContent.length - 1) {
            outputList.push(`!${colorsString}`);
        }
    }
    return outputList;
}

function hexList(inputList) {
    let outputList = [];

    for (let element of inputList) {

        //element zawiera [ - określenie ilości pustych pól
        if (element.includes("[")) {
            outputList.push(element);
        } else {
            //Element zawiera ciąg kolorów

            //konwersja na hex, dodanie 1 na początku
            let tempString = element.replace('!', '1');
            let number = Number(tempString, 10);
            let hexed = hex(number);

            //Usunięcie zer
            while (hexed.charAt(0) === "0")
                hexed = hexed.slice(1);

            //dodanie do listy
            outputList.push(hexed);
        }

    }

    return outputList;
}

// class boardCell {

//     constructor(id, fillColor, text) {
//         this.cellID = id;
//         this.fillColor = fillColor;
//         this.text = text;
//         // this.previousColorID = 0;
//     }

//     chageFillColor(color) {

//         if (color) {
//             // this.previousColorID = 
//             this.fillColor = color;
//         } else {
//             this.fillColor = board.backgroundColor;
//         }

//     }

// }

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
            div.addClass('colorContainerSquare ratio ratio-1x1 border rounded-3 shadow border-dark');
            div.style('background-color', colorToInsert);
            div.attribute('onclick', `colorSets.setColor('${colorToInsert}',${i})`);
            div.parent(parent);
        }

        colorToInsert = colorSets.backgroundColor;
        div = createDiv();
        div.addClass('colorContainerSquare ratio ratio-1x1 border rounded-3 shadow border-dark');
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
        board.changeIndex();
    }

}

function updateDate() {
    // let dateInsert = `${year()}-${utility.formatSingleDigitNumbers(month())}-${utility.formatSingleDigitNumbers(day())}-${utility.formatSingleDigitNumbers(hour())}-${utility.formatSingleDigitNumbers(minute())}`;
    let dateInsert = `${year()}-${utility.formatSingleDigitNumbers(month())}-${utility.formatSingleDigitNumbers(day())}-${utility.formatSingleDigitNumbers(hour())}-${utility.formatSingleDigitNumbers(minute())}-${utility.formatSingleDigitNumbers(second())}`;
    let targets = selectAll('.updatedDateInsert');
    let tempValue = "";

    for (let element of targets) {
        tempValue = element.value();
        tempValue += dateInsert;
        element.value(tempValue);
    }

}

const board = new Board();
const colorSets = new ColorSets(['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange'], 'Matematyczny');
const colorContainer = new ColorContainer();
var axies;

const alphabet = utility.getLettersFromAlphabet();

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

function preload() {
    //Obsłużenie daty w stopce
    let data = new Date();
    let year = data.getFullYear();
    select('#yearInsert').html(year);

    //Aktywowanie tooltipów
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
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

    //Obsługa ładowania planszy z linków
    let daneURL = getURLParams();
    board.loadBoard(daneURL.zapis);
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

            if ((i == 0 && j == 0) || (i == 0 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}" data-number="${i+j}" data-position="${i},${j}"><div class="contentBox">${i+j}</div></div>`;
            else if ((i == 11 && j == 0) || (i == 11 && j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1 invisible" id="boardCell${counter}" data-number="${i+j}" data-position="${i},${j}"><div class="contentBox">${i+j}</div></div>`;

            else if (i == 0) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}" data-number="${i+j}" data-position="${i},${j}"><div class="contentBox">${i+j}</div></div>`;
            else if (i == 11) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}" data-number="${i+j-11}" data-position="${i},${j}"><div class="contentBox">${i+j-11}</div></div>`;

            else if ((i != 0) && (i != 11) && (j == 0)) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}" data-number="${i+j}" data-position="${i},${j}"><div class="contentBox">${i+j}</div></div>`
            else if ((i != 0) && (i != 11) && (j == 11)) insert = `<div class="boardCell indexCell ratio ratio-1x1" id="boardCell${counter}" data-number="${i+j-11}" data-position="${i},${j}"><div class="contentBox">${i+j-11}</div></div>`

            else insert = `<div class="boardCell contentCell ratio ratio-1x1" id="boardCell${counter}" onclick="board.handleBoardClick(${counter})" data-position="${i},${j}"><div class="contentBox"></div></div>`

            destination.html(insert, true);
            counter++;
        }

    }

}