import html2canvas from 'html2canvas';
import { DownloadCanvas, GetDateForFileName } from '@Utils/SharingUtilities';

export function SaveEncodedBoard(BoardName = "Plansza") {
    html2canvas(document.getElementById('EncodedBoard'), {
        scale: 4,
        imageTimeout: 0,
        windowWidth: 1444,
        onclone: function (cloneDoc) {
            cloneDoc.getElementById('EncodedBoard').insertAdjacentHTML("afterbegin",
                `<div style="width: 100%; color: #101010; display: inline-block; text-align: center; font-size: 2em;">${BoardName}</div><br/>`);

            cloneDoc.getElementById('EncodedBoard').insertAdjacentHTML("beforeend",
                `<div style="width: 100%; color: #101010; display: inline-block; text-align: center; font-size: 0.75em;">Grafika stworzona w aplikacji "W układzie z klockami" | ${GetDateForFileName()}</div><br/>`);

        }
    }).then(function (canvas) {
        DownloadCanvas(canvas, `zakodowana-plansza-${GetDateForFileName()}`);
    });
}