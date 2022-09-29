// Skips a cell - missaligment on draw FIX

/**
 * 
 * @param {Number[]} Board 
 */
export function CreateBoardPreview(Board) {
    // const size = 300;
    // const stepSize = Math.floor(size / 10);

    let canvas = document.createElement('canvas');
    canvas.width = "301";
    canvas.height = "301";

    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';

    let count = 0;

    for (let y = 0; y < canvas.width; y += 30) {
        for (let x = 0; x < canvas.height; x += 30) {

            ctx.fillStyle = Board[count] != undefined ? Board[count] : 'white';
            ctx.fillRect(x, y, 30, 30);
            ctx.strokeRect(x, y, 30, 30);

            count++;
        }
    }

    return new Promise((resolve) => {
        resolve(canvas);
    });
}