class PresetSettings {
    constructor() {
        this.squareSize = 40;
        this.squareSpacer = 8;
        this.squaresBySideH = 10
        this.squaresBySideW = 10

        this.squareCurvature = 1;

        this.squareFill = '#D3D3D3';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = "white";
        this.squareTextStrokeColor = "black";

        this.squareTextSize = 25;
        this.squareTextWeight = 2;

        this.indexFill = 'white';
        this.indexStroke = 'black';

        this.indexCurvature = 2;
    }

    addValues(valueObj) {
        for (const el in valueObj) {
            this[el] = valueObj[el];
        }
    }
}

const settings = new PresetSettings();