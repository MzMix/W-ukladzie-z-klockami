export default class PresetSettings {
    constructor() {
        this.squareSize = 40;
        this.squareSpacer = 7;
        this.squaresBySide = 10

        this.squareFill = '#C0C0C0';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = color(255, 255, 255);

        this.indexFill = '#F64C72';
        this.indexStroke = 'pink';

        this.basicColorScheme = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];
    }
}