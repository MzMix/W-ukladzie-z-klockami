class PresetSettings {
    constructor() {
        this.squareSize = 40;
        this.squareSpacer = 8;
        this.squaresBySideH = 10
        this.squaresBySideW = 10

        this.squareCurvature = 1;

        this.squareFill = '#D3D3D3';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = "black";
        this.squareTextStrokeColor = "black";

        this.squareTextSize = 15;
        this.squareTextWeight = 0;

        this.indexFill = 'white';
        this.indexStroke = 'black';

        this.indexTextSize = 15;
        this.indexTextWeight = 0;

        this.indexTextColor = "black";
        this.indexTextStrokeColor = "white";

        this.indexCurvature = 2;
    }

    addValues(valueObj) {
        for (const el in valueObj) {
            this[el] = valueObj[el];
        }
    }
}

const settings = new PresetSettings();