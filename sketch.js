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
        // print(this.visible)
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

        for (let col of settings.basicFillColorScheme) {

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

    userInterface.pickColor = function (color) {
        this.pickedColor = color;
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
                            print(1);
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

        switch (value) {
            case "changeSet":
                select(".modal-title").html("Zmiana opisu pól");

                el = createSelect();
                el.option("Numeracja");
                el.option("Adresowanie");
                el.option("Kolory");
                el.option("Brak");

                if (settings.currentIndexType) el.value(settings.currentIndexType);

                el.addClass("custom-select switchIndexType");

                el.changed(this.switchIndexType);

                select(".modal-body").html("");
                select(".modal-body").child(el);
                break;

            case 'changeSegmentContent':

                select(".modal-title").html("Zmiana zawartości pól");

                el = createSelect();
                el.option("Brak");
                el.option("Numeracja");
                el.option("Adresowanie");

                if (settings.currentSegmentContent) el.value(settings.currentSegmentContent);

                el.addClass("custom-select switchSegmentContent");

                el.changed(this.changeSegContent);

                select(".modal-body").html("");
                select(".modal-body").child(el);

                break;


            case 'symetryDrawing':

                select(".modal-title").html("Ustawienia symetrii");

                el = createSelect();
                el.option("Brak");
                el.option("Oś X");
                el.option("Oś Y");
                el.option("Względem środka układu");

                if (settings.currentSymetryType) el.value(settings.currentSymetryType);

                el.addClass("custom-select switchSymetryType");

                el.changed(this.switchSymetryType);

                select(".modal-body").html("");
                select(".modal-body").child(el);

                break;

            default:
                break;
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
                            s.changeColor(settings.basicFillColorScheme[abs(s.iteratorIndex.x - 1)]);
                        } else if (s.iteratorIndex.y.between(0, 11)) {
                            s.changeColor(settings.basicFillColorScheme[abs(s.iteratorIndex.y - 1)]);
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

        print(settings.currentSegmentContent)

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

    settings.addValues({
        axisWidth: 5,
        axisHeight: 10,
        axisColor: 'red',
        currentAxis: 'none'
    })

    userInterface.executeQueue = {
        displayAxis: () => {
            axis.update()
        }
    }

    action.saveImg = function () {
        let data = new Date();
        saveCanvas(`plansza-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
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
                s.retriveBasicValues()
                s.changeColor();
            }
        }
    }

    // action.hidePageParts = function () {
    //     let elements = selectAll(".turnOff");

    //     if (elements[0].hasClass(".invisible")) {
    //         for (let el of elements) {
    //             el.removeClass("invisible")
    //         }
    //     } else {
    //         for (let el of elements) {
    //             el.addClass("invisible")
    //         }
    //     }

    // }

    settings.basicFillColorScheme = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];

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