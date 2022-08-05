/**
* @description Calculate position of a cell in a Cartesian coordinate system with the center being point (0,0).
* @param {number} id
* @return {{x: number, y: number}}
*/
export function CalculatePosition(id) {
    let tmp = new Number(id) / 10;

    let x = tmp % 1;
    if (x === 0) x = 10;

    let y = -Math.floor(tmp);
    if (y === 0) y = -10;

    let dX = 6, dY = 6;
    x += dX;
    y += dY;

    return {
        x: x,
        y: y,
    };
}

/**
* @description Calculate id of a cell based on its position in a Cartesian coordinate system with the center being point (0,0).
* @param {{x: number, y: number}}
* @return {number} id
*/
export function CalculateId({ x, y }) {

    let dX = 6, dY = 6;
    x -= dX;
    y -= dY;

    if (y === -10) y = 0;
    if (x === 10) x = 0;

    let id = -y * 10 + x * 10;

    return id;
}