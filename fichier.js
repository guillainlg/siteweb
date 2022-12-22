function fct1() {
	var url = "https://data.twisto.fr/api/records/1.0/search/?dataset=horaires-tr&q=&sort=horaire_depart_theorique&facet=ligne&facet=nom_de_l_arret_stop_name&facet=destination_stop_headsign&facet=etat_de_la_course&refine.ligne=T2&refine.destination_stop_headsign=CAEN+Campus+2&refine.nom_de_l_arret_stop_name=Caen-Gare-Rives+de+l%27Orne-GARE-+RIVES+DE+L%27ORNE"
	$.get(url, callBackGetSuccess1).done(function() {
	})
	.fail(function() {
		alert( "error" );
	})
	.always(function() {
	});
}

function fct2() {
	var url = "https://data.twisto.fr/api/records/1.0/search/?dataset=horaires-tr&q=&sort=horaire_depart_theorique&facet=ligne&facet=nom_de_l_arret_stop_name&facet=destination_stop_headsign&facet=etat_de_la_course&refine.ligne=T2&refine.nom_de_l_arret_stop_name=Caen-CAMPUS+2&refine.destination_stop_headsign=CAEN+Presqu%27ile"

	$.get(url, callBackGetSuccess2).done(function() {
	})
	.fail(function() {
		alert( "error" );
	})
	.always(function() {
	});
}

function fct() {
	fct1();
	fct2();
	showDate();
}

var callBackGetSuccess1 = function(data) {
	console.log("donnees test api", data)
	var element1 = document.getElementById("p1");
	var element2 = document.getElementById("p2");
	var element3 = document.getElementById("p3");
	var L = data.records[0].fields.horaire_depart_theorique;
	if (L[0] == '2' && L[1] == '4') {
		var L = L.replace('24', '00');
	}
	element1.innerHTML = L;
	element2.innerHTML = data.records[1].fields.horaire_depart_theorique;
	element3.innerHTML = data.records[2].fields.horaire_depart_theorique;
}

var callBackGetSuccess2 = function(data) {
	console.log("donnees test api", data)
	var element4 = document.getElementById("p4");
	var element5 = document.getElementById("p5");
	var element6 = document.getElementById("p6");
	element4.innerHTML = data.records[0].fields.horaire_depart_theorique;
	element5.innerHTML = data.records[1].fields.horaire_depart_theorique;
	element6.innerHTML = data.records[2].fields.horaire_depart_theorique;
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