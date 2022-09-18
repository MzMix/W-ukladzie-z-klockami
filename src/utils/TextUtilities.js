export function GetLetter(number) {
    return String.fromCharCode(65 + number);
}

export function GetTextColorOnBackground(hexcolor) {

    let r = parseInt(hexcolor.substr(1, 2), 16);
    let g = parseInt(hexcolor.substr(3, 2), 16);
    let b = parseInt(hexcolor.substr(5, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (yiq >= 128) ? '#000' : '#fff';
}