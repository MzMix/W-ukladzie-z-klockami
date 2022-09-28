/**
 * 
 * @param {Number[]} Board 
 */
export function CreateBoardPreview(Board) {

    let canvas = document.createElement('canvas');
    canvas.width = "400";
    canvas.height = "400";

    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';

    let count = 0;

    for (let y = 0; y < canvas.width; y += (canvas.width / 10)) {
        for (let x = 0; x < canvas.height; x += (canvas.height / 10)) {

            ctx.fillStyle = Board[count] != undefined ? Board[count] : 'white';
            ctx.fillRect(x, y, 40, 40);
            ctx.strokeRect(x, y, 40, 40);

            count++;
        }
    }

    return canvas;
}