var map, lat, lon, current, hungryJson, hungry, tiredJson, sickJson, dangerJson, markers;

$.ajax({
  url: '69.175.214.21:50010/food',
  data: '',
  success: function(res){
  	// console.log(res);
  	hungryJson = res.response;
  	hungry = true;
	for (var i = 0; i < hungryJson.length; i++) {
		hungryJson[i].properties['marker-color'] = '#e5e500';
		hungryJson[i].properties['marker-symbol'] = 'restaurant';
		hungryJson[i].properties.description = 'Test';
		hungryJson[i].properties.title = hungryJson[i].properties.name;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Hungry get failed", textStatus);
  },
  dataType: 'json'
});

$.ajax({
  url: '69.175.214.21:50010/tired',
  data: '',
  success: function(res){
  	// console.log(res);
  	tiredJson = res.response;
  	tired = true;
	for (var i = 0; i < tiredJson.length; i++) {
		tiredJson[i].properties['marker-color'] = '#ffa500';
		tiredJson[i].properties['marker-symbol'] = 'lodging';
		tiredJson[i].properties.description = 'Test';
		tiredJson[i].properties.title = tiredJson[i].properties.name;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Tired get failed", textStatus);
  },
  dataType: 'json'
});

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
		// console.log(this.value);
		// console.log(this.checked);
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
		if (tired) {
			markers = markers.concat(tiredJson);
		}
		if (sick) {
			markers = markers.concat(sickJson);
		}
		if (danger) {
			markers = markers.concat(dangerJson);
		}
		map.markerLayer.setGeoJSON(markers);
	});

	$('#learn-more').click(function(){
		$('#about').slideToggle();
	});

});

function initialsetup() {
	// hungryJson = [{
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

	

	markers = current;
	if (hungryJson) {
		if (current != null) {
			for (var i = 0; i < hungryJson.length; i++) {
				hungryJson[i].properties.description += " <a href='https://maps.google.com/maps?q=from:+"+current[0].geometry.coordinates[1]+",+"+current[0].geometry.coordinates[0]+"+to:+"+hungryJson[i].geometry.coordinates[1]+",+"+hungryJson[i].geometry.coordinates[0]+"'>Directions</a>"
			}
		}
		markers = markers.concat(hungryJson);
	}
	if (tiredJson) {
		if (current != null) {
			for (var i = 0; i < tiredJson.length; i++) {
				tiredJson[i].properties.description += " <a href='https://maps.google.com/maps?q=from:+"+current[0].geometry.coordinates[1]+",+"+current[0].geometry.coordinates[0]+"+to:+"+tiredJson[i].geometry.coordinates[1]+",+"+tiredJson[i].geometry.coordinates[0]+"'>Directions</a>"
			}
		}
		markers = markers.concat(tiredJson);
	}
	console.log(markers);

	map.markerLayer.setGeoJSON(markers);

	if (sickJson) {
		if (current != null) {
			for (var i = 0; i < sickJson.length; i++) {
				sickJson[i].properties.description += " <a href='https://maps.google.com/maps?q=from:+"+current[0].geometry.coordinates[1]+",+"+current[0].geometry.coordinates[0]+"+to:+"+sickJson[i].geometry.coordinates[1]+",+"+sickJson[i].geometry.coordinates[0]+"'>Directions</a>"
			}
		}
	}
	if (dangerJson) {
		if (current != null) {
			for (var i = 0; i < dangerJson.length; i++) {
				dangerJson[i].properties.description += " <a href='https://maps.google.com/maps?q=from:+"+current[0].geometry.coordinates[1]+",+"+current[0].geometry.coordinates[0]+"+to:+"+dangerJson[i].geometry.coordinates[1]+",+"+dangerJson[i].geometry.coordinates[0]+"'>Directions</a>"
			}
		}
	}
}

$.ajax({
  url: '69.175.214.21:4567/sick',
  data: '',
  success: function(res){
  	// console.log(res);
  	sickJson = res.response;
  	sick = false;
	for (var i = 0; i < sickJson.length; i++) {
		sickJson[i].properties['marker-color'] = '#ce0000';
		sickJson[i].properties['marker-symbol'] = 'hospital';
		sickJson[i].properties.description = 'Test';
		sickJson[i].properties.title = sickJson[i].properties.name;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Sick get failed", textStatus);
  },
  dataType: 'json'
});

$.ajax({
  url: '69.175.214.21:4567/danger',
  data: '',
  success: function(res){
  	// console.log(res);
  	dangerJson = res.response;
  	danger = false;
	for (var i = 0; i < dangerJson.length; i++) {
		dangerJson[i].properties['marker-color'] = '#990099';
		dangerJson[i].properties['marker-symbol'] = 'triangle';
		dangerJson[i].properties.description = 'Test';
		dangerJson[i].properties.title = dangerJson[i].properties.name;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Danger get failed", textStatus);
  },
  dataType: 'json'
});