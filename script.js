function call1() {
	var url = "https://data.twisto.fr/api/records/1.0/search/?dataset=horaires-tr&q=&sort=horaire_depart_theorique&facet=ligne&facet=nom_de_l_arret_stop_name&facet=destination_stop_headsign&facet=etat_de_la_course&refine.ligne=T2&refine.destination_stop_headsign=CAEN+Campus+2&refine.nom_de_l_arret_stop_name=Caen-Gare-Rives+de+l%27Orne-GARE-+RIVES+DE+L%27ORNE"
	$.get(url, init_hours1).done(function() {
	})
	.fail(function() {
		alert( "error" );
	})
	.always(function() {
	});
}

function call2() {
	var url = "https://data.twisto.fr/api/records/1.0/search/?dataset=horaires-tr&q=&sort=horaire_depart_theorique&facet=ligne&facet=nom_de_l_arret_stop_name&facet=destination_stop_headsign&facet=etat_de_la_course&refine.ligne=T2&refine.nom_de_l_arret_stop_name=Caen-CAMPUS+2&refine.destination_stop_headsign=CAEN+Presqu%27ile"

	$.get(url, init_hours2).done(function() {
	})
	.fail(function() {
		alert( "error" );
	})
	.always(function() {
	});
}

function fct() {
	call1();
	call2();
	showDate();
}

var init_hours1 = function(data) {
	var element1 = document.getElementById("p1");
	var element2 = document.getElementById("p2");
	var element3 = document.getElementById("p3");
	var L = [];
	L = create_hours(data);
	element1.innerHTML = L[0] + " > " + L[1];
	element2.innerHTML = L[1] + " > " + L[3];
	element3.innerHTML = L[2] + " > " + L[5];
}

var init_hours2 = function(data) {
	var element4 = document.getElementById("p4");
	var element5 = document.getElementById("p5");
	var element6 = document.getElementById("p6");
	var L = [];
	L = create_hours(data);

	element4.innerHTML = L[0] + " > " + L[1];
	element5.innerHTML = L[1] + " > " + L[3];
	element6.innerHTML = L[2] + " > " + L[5];
}

function refresh(){
	var t = 1000; // rafraîchissement en millisecondes
	setTimeout('showDate()',t)
}

function showDate() {
	var date = new Date()
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	if( h < 10 ){ h = '0' + h; }
	if( m < 10 ){ m = '0' + m; }
	if( s < 10 ){ s = '0' + s; }
	var time = h + ':' + m + ':' + s
	document.getElementById('horloge').innerHTML = time;
	refresh();
}

H = [
	[
	["07:02:00", "07:12:00", "07:23:00"],
	["07:34:00", "07:45:00", "07:55:00"],
	["08:06:00", "08:17:00", "08:28:00"],
	["08:38:00", "08:49:00", "09:00:00"],
	["09:11:00", "09:21:00", "09:32:00"],
	["09:43:00", "09:54:00", "10:04:00"],
	],
	[

	]
	]

function change_hours(hour,ride) {
	var L;
	if (ride) {
		var element1 = document.getElementById("p4");
		var element2 = document.getElementById("p5");
		var element3 = document.getElementById("p6");
		L = [H[1][hour][0], H[1][hour][0], H[1][hour][1], H[1][hour][1], H[1][hour][2], H[1][hour][2]];
	} else {
		var element1 = document.getElementById("p1");
		var element2 = document.getElementById("p2");
		var element3 = document.getElementById("p3");
		L = [H[0][hour][0], H[0][hour][0], H[0][hour][1], H[0][hour][1], H[0][hour][2], H[0][hour][2]];
	}

	for (let i = 0; i < 6; i++) {
		L[i] = L[i].split(":")
	}
	console.log(L);
	for (let i = 1; i < 6; i+=2) {
		// Récupère les horaires
		// Convertis en int
		for (let j = 0; j < 3; j++) { L[i][j] = Number(L[i][j]); }

		// Rajoute 25min
		if (L[i][1] + 25 > 60) {
			L[i][0] = (L[i][0] + 1) % 24;
		}
		L[i][1] = (L[i][1] + 25) % 60;

		// Rajouter 0 devant un nombre à 1 chiffre
		for (let j = 0; j < 3; j++) {
			L[i][j] = "" + L[i][j];
			if (L[i][j].length == 1) {
				L[i][j] = "0" + L[i][j];
			}
		}
		// Mise sous format hh:mm:ss
		L[i] = L[i].join(":");
		L[i-1] = L[i-1].join(":");
	}

	element1.innerHTML = L[0] + " > " + L[1];
	element2.innerHTML = L[2] + " > " + L[3];
	element3.innerHTML = L[4] + " > " + L[5];
}

function create_hours(data) {
	var L = [];
	for (let i = 1; i < 6; i+=2) {
		// Récupère les horaires
		hour = data.records[i].fields.horaire_depart_theorique;
		L.push(hour.split(":"));
		L.push(hour.split(":"));
		// Convertis en int
		for (let j = 0; j < 3; j++) { L[i][j] = Number(L[i][j]); }

		// Rajoute 25min
		if (L[i][1] + 25 > 60) {
			L[i][0] = (L[i][0] + 1) % 24;
		}
		L[i][1] = (L[i][1] + 25) % 60;

		// Rajouter 0 devant un nombre à 1 chiffre
		for (let j = 0; j < 3; j++) {
			L[i][j] = "" + L[i][j];
			if (L[i][j].length == 1) {
				L[i][j] = "0" + L[i][j];
			}
		}
		// Mise sous format hh:mm:ss
		L[i] = L[i].join(":");
		L[i-1] = L[i-1].join(":");
	}
	return L;
}