var picked, color;
const img = ['green', 'deepskyblue', 'purple', 'khaki', 'red', 'greenyellow', 'black', 'white', 'saddlebrown', 'darkorange', '#C0C0C0'];
const litery = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
var ax_state = false,
	nr_state = false,
	ad_state = false,
	symetria = false;

let colorBound = false;

function c_axis(ax) {
	switch (ax) {
		case 'x':
			$('#answer').html('Wybrano oś:<br/>Y');
			break;

		case 'y':
			$('#answer').html('Wybrano oś:<br/>X');
			break;

		case 'c':
			$('#answer').html('brak wybranej osi');
			break;
	}
}

function pick(nr) {
	color = nr;
	$('.view').css("background-color", img[nr]);
	if ((nr == 0) || (nr == 1) || (nr == 2) || (nr == 3)) {
		$('.view').css("color", "#EFEFEF");
	} else {
		$('.view').css("color", "#696969");
	}
	$('.view').html("Wybrany kolor");

	picked = true;
}

function odbicie(nr_pierwotny) {

	if (axis == 'x') {
		//symetria x
		if ((nr_pierwotny % 10) == 0) {
			let nr_symetryczny = nr_pierwotny - 9;
			console.log('symetria: ' + nr_symetryczny);
			return nr_symetryczny;
		} else {
			let nr_symetryczny = (parseInt(nr_pierwotny / 10, 10) * 10) + (11 - (nr_pierwotny % 10));
			console.log('symetria: ' + nr_symetryczny);
			return nr_symetryczny;
		}
	} else {
		//symetria y

		var opcje = nr_pierwotny - (parseInt(nr_pierwotny / 10, 10) * 10);
		var nr_symetryczny;

		switch (opcje) {

			case 1:
				nr_symetryczny = 92 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 2:
				nr_symetryczny = 94 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 3:
				nr_symetryczny = 96 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 4:
				nr_symetryczny = 98 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 5:
				nr_symetryczny = 100 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 6:
				nr_symetryczny = 102 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 7:
				nr_symetryczny = 104 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 8:
				nr_symetryczny = 106 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 9:
				nr_symetryczny = 108 - nr_pierwotny;
				return nr_symetryczny;
				break;

			case 0:
				nr_symetryczny = 110 - nr_pierwotny;
				return nr_symetryczny;
				break;
		}

	}


}

function put(nr) {

	if (picked == true) {
		console.log('Zmień na: ' + color);

		if (symetria) {
			$('#p' + odbicie(nr)).css("background-color", img[color]);
			odbicie(nr);
			$('#p' + nr).css("background-color", img[color]);
		} else {
			$('#p' + nr).css("background-color", img[color]);
		}
	}

}

//wyświetlanie planszy
function print() {

	$('.view').css("background-color", 'white');
	picked = false;
	color = 0;

	var content = '';
	var pola = 1;
	var handle = '';
	var id;

	//rysowanie pól liter	
	for (var h = 1; h <= 10; h++) {
		if (h == 1) {
			content += '<div class="pole" id="blank"></div>';
		}
		content += '<div class="pole index" id="' + 'i' + h + '">' + litery[h - 1] + '</div>';
	}

	//rysowanie planszy	
	for (var i = 1; i <= 10; i++) {
		content += '<div class="pole index" id="' + 'j' + i + '">' + i + '</div>';
		for (var j = 1; j <= 10; j++) {

			if (j == 5) content += '<div class="box">';

			content += '<div class="pole" id="' + 'p' + pola + '" onclick="put(' + pola + ')"><span>.<span></div>';

			if (j == 5) content += '</div>';

			if ((i == 5) && (j == 10)) {
				content += '<div class="horizontal"></div>';
			}

			pola++;
		}

	}
	$('.board').html(content);

	content = '';

	//rysowanie zasobnika
	for (var i = 0; i < 10; i++) {
		content += '<div class="kubek" id="k' + i + '" onclick="pick(' + i + ')"></div>';

	}
	$('.kit').html(content);

	for (var i = 0; i < 10; i++) {
		$('#k' + i).css("background-color", img[i]);
	}

}

function show_axis() {

	if (!ax_state) {
		$('.box').css("border-right", "3px solid rgb(248, 232, 10)");
		$('.horizontal').css("background-color", "rgb(248, 232, 10)");
		ax_state = true;
	} else {
		$('.box').css("border-right", "3px solid #553D67");
		$('.horizontal').css("background-color", "#553D67");
		ax_state = false;
	}

}

function colorIndex() {

	if (!colorBound) {
		for (let i = 1; i <= 10; i++) {
			$('#i' + i).css("background-color", img[i - 1]);
			$('#i' + i).css("color", 'transparent');
		}

		for (let j = 1; j <= 10; j++) {
			$('#j' + j).css("background-color", img[j - 1]);
			$('#j' + j).css("color", 'transparent');
		}
		colorBound = true;
	} else {
		for (let i = 1; i <= 10; i++) {
			$('#i' + i).css("background-color", '#F64C72');
			$('#i' + i).css("color", 'white');
		}

		for (let j = 1; j <= 10; j++) {
			$('#j' + j).css("background-color", '#F64C72');
			$('#j' + j).css("color", 'white');
		}
		colorBound = false;
	}

}

function number() {

	if (!nr_state) {

		pola = 1;

		for (var i = 1; i <= 100; i++) {
			$('#p' + pola).html(pola);
			pola++;
		}

		nr_state = true;
	} else {

		pola = 1;

		for (var i = 1; i <= 100; i++) {
			$('#p' + pola).html('<span>.<span>');
			pola++;
		}

		nr_state = false;
	}

}

function ad() {

	if (!ad_state) {
		pola = 1;
		for (var i = 1; i <= 10; i++) {
			for (var j = 1; j <= 10; j++) {
				$('#p' + pola).html(litery[j - 1] + i);
				pola++;
			}
		}
		ad_state = true;

	} else {
		pola = 1;

		for (var i = 1; i <= 100; i++) {
			$('#p' + pola).html('<span>.<span>');
			pola++;
		}

		ad_state = false;
	}

}

//wywołania
$(document).ready(function () {
	print();
});