let data;

function preload() {
	print('Start');

	data = loadJSON("info.json", insertData, errorMsg);
}

function insertData() {
	let title = data.title;
	let name = data.name;
	let ver = data.version;
	let date = data.date;

	let footer = `Wersja: ${ver} z dnia: ${date}`

	select('.header').html(title);
	select('title').html(title);
	select('.name').html(name);
	select('.footer').html(footer);
}

function errorMsg() {
	console.clear();
	console.log("Brak pliku info.json!");
}