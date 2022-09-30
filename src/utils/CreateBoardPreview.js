/**
 * 
 * @param {Number[]} Board 
 */
export function CreateBoardPreview(Board, size = 300) {
    const stepSize = Math.floor(size / 10);

    let canvas = document.createElement('canvas');
    canvas.width = `${size}`;
    canvas.height = `${size}`;

    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';

    let count = 0;

    for (let y = 0; y < size; y += stepSize) {
        for (let x = 0; x < size; x += stepSize) {

            ctx.fillStyle = Board[count] != undefined ? Board[count] : 'white';
            ctx.fillRect(x, y, stepSize, stepSize);
            ctx.strokeRect(x, y, stepSize, stepSize);

            count++;
        }
    }

    return new Promise((resolve) => {
        resolve(canvas);
    });
}