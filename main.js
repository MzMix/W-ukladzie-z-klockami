let data;

function preload() {
	data = loadJSON("info.json", insertData, errorMsg);

	let params = getURLParams();
	if (Object.keys(params).length > 0 && params.save) {
		// print(params.save);
		Global['seed'] = params.save
	}
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
	console.log("Brak pliku info.json!");
}