function preload() {
    settings.menuJsonPattern = loadJSON("./sideMenu.json", () => {
        console.log("Plik JSON załadowany pomyślnie!");
    }, () => {
        alert("Wystąpił bład! Nastąpi przekierowanie do strony głównej!");
        window.location.href = "https://mzmix.github.io/";
    }, "json")
}

function setup() {
    userInterface.createInterface();
    // userInterface.createInterface();
    // userInterface.generateBoard();
    // userInterface.generateColorContrainer();

    noLoop();
}

function draw() {
    clear();

    // for (let segment of userInterface.board) {
    // segment.display();
    // }
}

//Optymalizacja
function mouseClicked() {
    // userInterface.checkBoardClicks();
    redraw();
}

function foo() {
    print(1);
}