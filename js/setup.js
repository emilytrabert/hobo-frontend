var map, lat, lon, current, hungryJson, hungry, tiredJson, sickJson, dangerJson, markers;

$.get('json/json.json', function(data, status, jqxhr) {
	hungryJson = data;
	hungry = true;
	for (var i = 0; i < hungryJson.length; i++) {
		hungryJson[i].properties['marker-color'] = 'yellow';
		hungryJson[i].properties.description = 'Test';
	}
}, "json");

// $.get(url, function(data, status, jqxhr) {
// 	tiredJson = data;
// 	json = true;
// 	for (var i = 0; i < tiredJson.length; i++) {
// 		tiredJson[i].properties['marker-color'] = 'orange';
// 		tiredJson[i].properties.description = 'Test';
// 	}
// });

sickJson = null;
sick = false;
dangerJson = null;
danger = false;

current = [{
	type: 'Feature',
	geometry: {
		type: 'Point',
		coordinates: [-77, 38.9]
	},
	properties: {
		title: 'You Are Here',
		'marker-color': '#555',
		'marker-symbol': 'star-stroked'
	}
}];

$(document).ready(function(){

	// check if user has geolocation
	if (navigator.geolocation) {
	    console.log("User has geolocation.");
	    navigator.geolocation.getCurrentPosition(
		function(position) {
		    lat = position.coords.latitude;
		    lon = position.coords.longitude;
		    map = L.mapbox.map('map', 'etrabert.map-wb3ujm4j')
			.setView([lat,lon],12);
			current[0].geometry.coordinates = [lon, lat];
		    console.log("Geolocation set!");
		    initialsetup();
		},
		function(error){
		    console.log("Geolocation not set!");
		    current = [];
		    initialsetup();
		});
	} else {
	    console.log("User doesn't have geolocation.");
	    map = L.mapbox.map('map', 'etrabert.map-wb3ujm4j')
		.setView([38.897, -77.0], 12);
		current = [];
		initialsetup();
	}

    

	$(':checkbox').change(function() {
		console.log(this.value);
		console.log(this.checked);
		switch (this.value) {
			case 'hungry': hungry = this.checked; break;
			case 'tired': tired = this.checked; break;
			case 'sick': sick = this.checked; break;
			case 'danger': danger = this.checked; break;
			default: console.log("Invalid checkbox value?");
		}

		markers = current;
		if (hungry) {
			markers = markers.concat(hungryJson);
		}
		// if (tired) {
		// 	markers = markers.concat(tiredJson);
		// }
		// if (sick) {
		// 	if (sickJson == null) {
		// 		$.get(url, function(data, status, jqxhr) {
		// 			sickJson = data;
		// 			for (var i = 0; i < sickJson.length; i++) {
		// 				sickJson[i].properties['marker-color'] = 'red';
		// 				sickJson[i].properties.description = 'Test';
		// 			}
		// 		});
		// 	}
		// 	markers = markers.concat(sickJson);
		// }
		// if (danger) {
		// 	if (dangerJson == null) {
		// 		$.get(url, function(data, status, jqxhr) {
		// 			dangerJson = data;
		// 			for (var i = 0; i < dangerJson.length; i++) {
		// 				dangerJson[i].properties['marker-color'] = 'pink';
		// 				dangerJson[i].properties.description = 'Test';
		// 			}
		// 		});
		// 	}
		// 	markers = markers.concat(dangerJson);
		// }
		map.markerLayer.setGeoJSON(markers);
	});

	$('#learn-more').click(function(){
		$('#about').slideToggle();
	});

});

function initialsetup() {
	// markers = [{
	// 	type: 'Feature',
	// 	geometry: {
	// 		type: 'Point',
	// 		coordinates: [-77, 38.9]
	// 	},
	// 	properties: {
	// 		title: 'Marker One'
	// 	}
	// },
	// {
	// 	type: 'Feature',
	// 	geometry: {
	// 		type: 'Point',
	// 		coordinates: [-77.05, 38.95]
	// 	},
	// 	properties: {
	// 		title: 'Marker Two'
	// 	}
	// }];

	// for (var i = 0; i < markers.length; i++) {
	// 	markers[i].properties['marker-color'] = '#000000';
	// 	markers[i].properties.description = 'Test description';
	// }

	

	markers = [];
	markers = markers.concat(hungryJson);
	// markers = markers.concat(tiredJson);
	markers = markers.concat(current);
	console.log(markers);

	map.markerLayer.setGeoJSON(markers);
}

hungryJson = [{'type':'Feature', 'geometry':{'type':'Point', 'coordinates': [-77,38.9]},properties:{'eligibility':'7th - 9th grade','desc':'7 th grade through 9 th grade.  Strives to make dramatic improvements in the achievements of all students today in preparation for the world tomorrow.    ','address_1':'925 RHODE ISLAND AVENUE NW','area_served':'District of Columbia','address_2':'','keyword':'Schools-Public','email':'','web_url':'http//www.k12.dc.us','name':'DCG - DCPS - JHS - Shaw','business_hours':'800 am - 430 pm Monday - Friday','zip':'20001-4140','phone_1':'(202) 673-7203','marker-color': '#000'}}];