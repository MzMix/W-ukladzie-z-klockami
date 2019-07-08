class PresetSettings {
    constructor() {
        this.squareSize = 40;
        this.squareSpacer = 7;
        this.squaresBySideH = 10
        this.squaresBySideW = 10

        this.squareCurvature = 2;

        this.squareFill = '#C0C0C0';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = color(255, 255, 255);

        this.indexFill = '#F64C72';
        this.indexStroke = 'pink';

        this.indexCurvature = 10;

        this.basicColorScheme = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];
    }
}

const settings = new PresetSettings();

// export default settings;