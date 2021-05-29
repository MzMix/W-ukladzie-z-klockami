let loadedFile;

function handleFile(file) {

    if (file.type == 'application' && file.subtype == 'json') {

        let fileData = file.data;
        loadJSON(fileData, action.updateColors, action.rejectedFile);

    }
}

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
        select(".colorSchemeContainer").html("")

        for (let col of settings.colorSchemes[settings.activeColorScheme]) {

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

    UserInterface.prototype.pickColor = function (color) {
        this.pickedColor = color;
    }

    UserInterface.prototype.loadSave = function () {

    }

    UserInterface.prototype.addCustomColorSet = function () {
        print('tak');
        let newColorSet = [];

        for (let i = 0; i < settings.colorMatrix.length; i++) {
            let picker = select(`.picker${i}`);

            newColorSet.push(picker.value());
        }
        newColorSet.push('#C0C0C0');

        settings.colorSchemes.push(newColorSet);
        action.refreshColorSets();

        let val;
        for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
            val = `Zestaw ${i+1}`;
        }
        settings["currentColorScheme"] = val;
        action.switchColorScheme(true);
    }

    Segment.prototype.colorSegment = function () {
        if (userInterface.pickedColor) {
            this.fill = userInterface.pickedColor;

            if (settings.currentAxis != "none") {
                for (let s of userInterface.board) {
                    if (!(s instanceof Index) && s.posKart) {
                        let sx = s.posKart.x;
                        let sy = s.posKart.y;

                        if (settings.currentAxis == "X") {
                            // Symetria Y:
                            if (sx == -1 * (this.posKart.x + 1) && sy == this.posKart.y) {
                                s.fill = userInterface.pickedColor;
                                break;
                            }
                        } else if (settings.currentAxis == "Y") {
                            //Symetria X:
                            if (sx == 1 * (this.posKart.x) && sy == -1 * (this.posKart.y - 1)) {
                                s.fill = userInterface.pickedColor;
                                break;
                            }
                        } else if (settings.currentAxis == "CENTER") {
                            // Symetria Center:
                            if (sx == -1 * (this.posKart.x + 1) && sy == -1 * (this.posKart.y - 1)) {
                                s.fill = userInterface.pickedColor;
                                break;
                            }
                        }

                    }

                }
            }
        }
    }

    Segment.prototype.hideTxt = function () {

        if (this.textColor === this.basicTxtColor) {
            this.textColor = color(0, 0);
        } else {
            this.textColor = this.basicTxtColor;
        }
    }

    Segment.prototype.basicTxtColor = settings.squareTextColor;
    Index.prototype.basicTxtColor = settings.squareTextColor;

    Segment.prototype.changeContent = function (val) {
        if (val) {
            this.txt = val;
        } else {
            this.txt = this.basicContent;
        }
    }

    Segment.prototype.basicContent = "";
    Index.prototype.basicContent = Index["iteratorIndex.x"]

    Segment.prototype.changeColor = function (val) {
        if (val) {
            this.fill = val;
            this.stroke = "transparent"
        } else {
            this.fill = this.basicFillColor;
            this.stroke = this.basicStrokeColor
        }
    }

    Segment.prototype.basicFillColor = settings.squareFill;
    Index.prototype.basicFillColor = settings.indexFill;

    Segment.prototype.basicStrokeColor = settings.squareStroke;
    Index.prototype.basicStrokeColor = settings.indexStroke;

    Segment.prototype.retriveBasicValues = function () {
        this.changeContent();
        // this.hideTxt();
    }

    action.togAxis = function () {
        axis.visible = !axis.visible;
    }

    action.showModal = function (value) {
        let el;
        select(".modal-dialog").html("");

        switch (value) {

            case "changeSet":
                templatka = templateHTML.querySelector("#changeSet");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                el = createSelect();
                el.option("Numeracja");
                el.option("Adresowanie");
                el.option("Kolory");
                el.option("Brak");

                if (settings.currentIndexType) el.value(settings.currentIndexType);

                el.addClass("custom-select switchIndexType");

                el.changed(this.switchIndexType);

                select("#selectSpot").child(el);
                break;

            case 'changeSegmentContent':

                templatka = templateHTML.querySelector("#changeSegmentContent");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                el = createSelect();
                el.option("Brak");
                el.option("Numeracja");
                el.option("Adresowanie");

                if (settings.currentSegmentContent) el.value(settings.currentSegmentContent);

                el.addClass("custom-select switchSegmentContent");

                el.changed(this.changeSegContent);

                select(".modal-body").child(el);

                break;

            case 'symetryDrawing':

                templatka = templateHTML.querySelector("#symetryDrawing");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                el = createSelect();
                el.option("Brak");
                el.option("Oś X");
                el.option("Oś Y");
                el.option("Względem środka układu");

                if (settings.currentSymetryType) el.value(settings.currentSymetryType);

                el.addClass("custom-select switchSymetryType");
                el.changed(this.switchSymetryType);

                select(".modal-body").child(el);

                break;

            case 'changeColorSet':

                templatka = templateHTML.querySelector("#changeColorSet");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);
                this.refreshColorSets();

                if (!select(".ownColors")) {
                    let ownScheme = createButton('Dodaj własny zestaw kolorów');
                    ownScheme.addClass("ownColors btn btn-info btn-sm order-1");
                    ownScheme.attribute('onclick', "action.showModal('addCustomColorSet')");
                    ownScheme.parent(select(".footerLeft"));
                }

                el = createSelect();
                el.option("Domyślny");
                for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
                    el.option(`Zestaw ${i+1}`);
                }
                if (settings.currentColorScheme) el.value(settings.currentColorScheme);
                el.addClass("custom-select switchColorScheme");
                el.changed(this.switchColorScheme);

                select(".modal-body").child(el);
                break;

            case "DisplayColorDesc":

                templatka = templateHTML.querySelector("#displayColorDesc");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                select(".colorSchemeContainer").hide();
                select(".p5Canvas").hide();

                let btn = createButton('Zapis do pliku');
                btn.addClass("btn btn-success saveColorDsc");
                btn.attribute("onclick", "action.saveColorDsc()");

                let footer = select(".modal-footer")
                let exBtn = footer.html();

                footer.html("");
                footer.child(btn);
                footer.html(exBtn, true);

                const letters = getLettersFromAlphabet();

                let colors = [];

                for (let col of settings.colorSchemes[settings.activeColorScheme]) {
                    if (col != "#D3D3D3") {
                        colors.push({
                            color: col,
                            pos: ""
                        })
                    }
                }

                for (let s of userInterface.board) {
                    if ((!(s instanceof Index)) && s.fill != "#D3D3D3") {
                        let codeX, codeY, pos;

                        switch (settings.currentIndexType) {
                            case "Numeracja":
                            case "Brak":
                                codeX = s.iteratorIndex.x.toString();
                                codeY = s.iteratorIndex.y.toString();
                                pos = `(${codeX},${codeY})`;
                                break;

                            case "Adresowanie":
                                codeX = letters[s.iteratorIndex.x - 1].toString();
                                codeY = s.iteratorIndex.y.toString();
                                pos = codeX + codeY;
                                break;

                            case "Kolory":
                                codeX = s.iteratorIndex.x - 1;
                                codeY = s.iteratorIndex.y - 1;

                                codeX = settings.colorSchemes[settings.activeColorScheme][codeX];
                                codeY = settings.colorSchemes[settings.activeColorScheme][codeY];

                                pos = `[<span style="background-color: ${codeX};" class = "textColorBox"></span>|<span style="background-color: ${codeY};" class = "textColorBox"></span>]`;

                                break;
                        }

                        colors[settings.colorSchemes[settings.activeColorScheme].indexOf(s.fill)].pos += ` ${pos}`
                    }
                }
                let anyInIDiv = false;

                for (let col of colors) {
                    if (!col.pos == "") {
                        let el = createP(`<span style="background-color: ${col.color};" class = "textColorBox"></span> : ${col.pos}`);
                        select('.modal-body').child(el);
                        anyInIDiv = true;
                    }
                }

                if (!anyInIDiv) {
                    select('.modal-body').child(createP("Plansza jest pusta!"));
                }

                break;

            case 'addCustomColorSet':
                $('#modal').modal('show');

                templatka = templateHTML.querySelector("#addCustomColorSet");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                for (let col of settings.colorMatrix) {

                    let num = 1 + settings.colorMatrix.indexOf(col)
                    if (num < 10) num = '0' + num.toString();
                    let el = createP(`Kolor ${num}: `);

                    let picker = createColorPicker(col);

                    picker.addClass(`colorPicker picker${settings.colorMatrix.indexOf(col)}`);

                    picker.parent(el);
                    select(".modal-body").child(el);
                }
                break;

            case 'loadColorsFromFile':
                $('#modal').modal('show');

                templatka = templateHTML.querySelector("#loadColorsFromFile");
                clone = templatka.content.cloneNode(true);
                insert = clone.querySelector(".modal-content");
                select(".modal-dialog").child(insert);

                let input = createFileInput(handleFile, false);
                input.attribute("accept", "application/json");

                select(".modal-body").child(input);

                break;

            default:
                break;
        }
    }

    action.saveColorDsc = function () {
        const data = new Date();
        html2canvas(document.querySelector(".modal-body")).then(canvas => {
            saveCanvas(canvas, `zakodowanaPlansza-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png')
        });
    }

    action.saveColorSets = function () {

        let json = {};
        let listOfSets = [];
        let colorsToSave = [];

        for (let i = 0; i < settings.colorSchemes.length; i++) {

            for (let color of settings.colorSchemes[i]) {
                if (color != "#C0C0C0") colorsToSave.push(color)
            }

            name = `set${i}`;

            listOfSets.push({
                name: name,
                colors: colorsToSave
            });

            colorsToSave = [];
        }

        json.setsOfColors = listOfSets;
        saveJSON(json, "kolory");
    }

    action.refreshColorSets = function () {
        settings.colorsSchemesInList = [];
        for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
            settings.colorsSchemesInList.push(`Zestaw ${i+1}`);
        }
    }

    action.switchIndexType = function () {
        settings["currentIndexType"] = select(".switchIndexType").value()

        switch (settings.currentIndexType) {
            case "Numeracja":

                for (let s of userInterface.board) {
                    if (s instanceof Index) {

                        s.retriveBasicValues();
                        s.changeColor();

                        if (s.iteratorIndex.x.between(0, 11)) {
                            s.changeContent(s.iteratorIndex.x)

                        } else if (s.iteratorIndex.y.between(0, 11)) {
                            s.changeContent(s.iteratorIndex.y)
                        }
                    }
                }

                break;

            case "Adresowanie":

                const letters = getLettersFromAlphabet();

                for (let s of userInterface.board) {
                    if (s instanceof Index) {

                        s.retriveBasicValues();
                        s.changeColor();

                        if (s.iteratorIndex.x.between(0, 11)) {
                            s.changeContent(letters[s.iteratorIndex.x - 1])

                        } else if (s.iteratorIndex.y.between(0, 11)) {
                            s.changeContent(s.iteratorIndex.y)
                        }
                    }
                }

                break;

            case "Kolory":

                for (let s of userInterface.board) {
                    if (s instanceof Index) {

                        s.retriveBasicValues();
                        s.changeColor();

                        if (s.iteratorIndex.x.between(0, 11)) {
                            s.changeColor(settings.colorSchemes[settings.activeColorScheme][abs(s.iteratorIndex.x - 1)]);
                        } else if (s.iteratorIndex.y.between(0, 11)) {
                            s.changeColor(settings.colorSchemes[settings.activeColorScheme][abs(s.iteratorIndex.y - 1)]);
                        }
                    }
                }

                break;

            case "Brak":
                for (let s of userInterface.board) {
                    if (s instanceof Index) {

                        s.retriveBasicValues();
                        s.changeColor();
                        s.changeContent("");
                    }
                }
                break;

            default:
                break;
        }
    }

    action.changeSegContent = function () {
        settings["currentSegmentContent"] = select(".switchSegmentContent").value()

        switch (settings.currentSegmentContent) {

            case "Brak":
                for (let s of userInterface.board) {
                    if (!(s instanceof Index)) {
                        s.retriveBasicValues()
                    }
                }
                break;

            case "Numeracja":
                for (let s of userInterface.board) {
                    if (!(s instanceof Index)) {
                        s.retriveBasicValues()
                        s.changeContent(s.num)
                    }
                }
                break;

            case "Adresowanie":
                const letters = getLettersFromAlphabet();

                for (let s of userInterface.board) {
                    if (!(s instanceof Index)) {
                        s.retriveBasicValues()
                        s.changeContent(`${letters[s.iteratorIndex.x - 1]}${s.iteratorIndex.y}`)
                    }
                }
                break;

            default:
                break;
        }
    }

    action.updateColors = function (givenJson) {

        if (givenJson.setsOfColors.length > 2) {
            //Mamy dodaną własną paletę

            for (let i = 2; i < givenJson.setsOfColors.length; i++) {
                settings.colorSchemes.push(givenJson.setsOfColors[i].colors);
            }

        }
        action.refreshColorSets();
    }

    action.switchSymetryType = function () {
        settings["currentSymetryType"] = select(".switchSymetryType").value()

        switch (settings.currentSymetryType) {

            case "Oś X":
                settings.currentAxis = "X";
                break;

            case "Oś Y":
                settings.currentAxis = "Y";
                break;

            case "Względem środka układu":
                settings.currentAxis = "CENTER";
                break;

            case "Brak":
                settings.currentAxis = "none";
                break;

            default:
                break;
        }

    }

    action.switchColorScheme = function (dontChange) {

        if (dontChange != true) settings["currentColorScheme"] = select(".switchColorScheme").value();

        if (settings.currentColorScheme == "Domyślny") {
            settings.activeColorScheme = 0;
            userInterface.generateColorContrainer()
        } else {
            let pos = settings.colorsSchemesInList.indexOf(settings.currentColorScheme);
            pos++;

            settings.activeColorScheme = pos;
            userInterface.generateColorContrainer()
        }

        for (let s of userInterface.board) {
            if (!(s instanceof Index)) s.changeColor(settings.colorSchemes[settings.activeColorScheme][s.txt - 1])
        }
    }


    settings.addValues({
        axisWidth: 5,
        axisHeight: 10,
        axisColor: 'red',
        currentAxis: 'none',
        activeColorScheme: 0,
        currentIndexType: "Numeracja"
    })

    userInterface.executeQueue = {
        displayAxis: () => {
            axis.update()
        }
    }

    function formatSingleDigitNumber(number) {

        if (number >= 10) {
            return number;
        } else {
            number = '0' + number;
            return number;
        }

    }

    action.saveImg = function () {
        let data = new Date();

        let year, month, day, hours, minutes, seconds;
        year = data.getFullYear();
        month = data.getMonth() + 1;
        day = data.getDate();
        hours = data.getHours();
        minutes = data.getMinutes();
        seconds = data.getSeconds();

        saveCanvas(`plansza-${formatSingleDigitNumber(year)}-${formatSingleDigitNumber(month)}-${formatSingleDigitNumber(day)}-${formatSingleDigitNumber(hours)}-${formatSingleDigitNumber(minutes)}-${formatSingleDigitNumber(seconds)}`, 'png');
    }

    action.hideColorPalette = function () {

        let colPal = select(".colorSchemeContainer")
        let canvas = select(".canvasDiv")

        if (colPal.style('display') === "none") {
            colPal.removeClass("invisible");
            canvas.style("margin", "0");
        } else {
            colPal.addClass("invisible");
            canvas.style("margin", "0 auto 0 auto");
        }


    }

    action.resetBoard = function () {
        for (let s of userInterface.board) {
            if (!(s instanceof Index)) {
                `1`
                s.changeColor();
            }
        }
        axis.visible = false;
    }

    settings.colorSchemes = [
        ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#D3D3D3'],
        ['green', 'deepskyblue', 'purple', 'yellow', 'red', 'greenyellow', 'black', 'white', 'blue', 'darkorange', '#D3D3D3']
    ];

    settings.colorMatrix = settings.colorSchemes[1];
    settings.colorMatrix.pop();

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
    userInterface.refreshBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
}

function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}