let data;

function preload() {
	print('Start');

	data = loadJSON("info.json", insertData, errorMsg);
}

function insertData() {
	let title = data.title;
	let name = data.name;
	let fot = data.footer;
	let ver = data.version;
	let date = data.date;

	let footer = fot.replace("#wersja", ver)
	footer = fot.replace("#data", date)

	select('.header').html(title);
	select('.name').html(name);
	select('.footer').html(footer);

}

function errorMsg() {
	console.clear();
	console.log("Brak pliku info.json!");
}