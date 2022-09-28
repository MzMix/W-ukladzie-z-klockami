import { DownloadCanvas, GetDateForFileName } from '@Utils/SharingUtilities';
import html2canvas from 'html2canvas';

export function SaveBoard(includeTitle = true, BoardName = 'Plansza') {
    html2canvas(document.getElementById('BoardOuterContainer'), {
        backgroundColor: null,
        scale: 4,
        imageTimeout: 0,
        windowWidth: 1444,
        onclone: function (cloneDoc) {

            //Footer
            cloneDoc.getElementById('BoardOuterContainer').insertAdjacentHTML("beforeend",
                `<div style="width: 100%; color: #000; -webkit-text-stroke: 0.1px #fff; display: inline-block; text-align: center; font-size: 0.75em;">Grafika stworzona w aplikacji "W układzie z klockami" | ${GetDateForFileName()}</div><br/>`);

            if (!includeTitle) return;

            //Title
            cloneDoc.getElementById('BoardOuterContainer').insertAdjacentHTML("afterbegin",
                `<div style="width: 100%; color: #000; -webkit-text-stroke: 1px #fff; display: inline-block; text-align: center; font-size: 2em;">${BoardName}</div><br/>`);
        }
    }).then(function (canvas) {
        DownloadCanvas(canvas, `plansza-${GetDateForFileName()}`);
    });
}