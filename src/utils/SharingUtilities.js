/**
 * @description Utility functions for downloading provided content to file with provided name and of provided type.
 * @param {*} content 
 * @param {string} fileName 
 * @param {string} contentType 
 */
export function DonloadContent(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}