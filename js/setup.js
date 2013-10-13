var map, lat, lon, current, hungryJson, hungry, tiredJson, sickJson, dangerJson, markers;

$.ajax({
  url: 'json/food.json',
  data: '',
  contentType:"application/json",
  headers:{"Access-Control-Allow-Origin":"*"},
  success: function(res){
  	// console.log(res);
  	hungryJson = res.resp;
  	hungry = true;
	for (var i = 0; i < hungryJson.length; i++) {
		hungryJson[i].properties['marker-color'] = '#e5e500';
		hungryJson[i].properties['marker-symbol'] = 'restaurant';
		hungryJson[i].properties.description = hungryJson[i].properties.address_1 + "<br />";
		if (hungryJson[i].properties.phone_1)
			hungryJson[i].properties.description += hungryJson[i].properties.phone_1 + "<br />";
		if (hungryJson[i].properties.email)
			hungryJson[i].properties.description += hungryJson[i].properties.email + "<br />";

		hungryJson[i].properties.description += "<br />";

		if (hungryJson[i].properties.business_hours)
			hungryJson[i].properties.description += "Open: " + hungryJson[i].properties.business_hours + "<br />";
		if (hungryJson[i].properties.eligibility)
			hungryJson[i].properties.description += "<br />Eligibility: " + hungryJson[i].properties.eligibility + "<br />";
		hungryJson[i].properties.title = hungryJson[i].properties.name;
		var save = hungryJson[i].geometry.coordinates[1];
		hungryJson[i].geometry.coordinates[1] = hungryJson[i].geometry.coordinates[0];
		hungryJson[i].geometry.coordinates[0] = save;

		if (hungryJson[i].properties.title == "H.O.B.O App") {
			hungryJson[i].properties.description += '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>';
		}
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Hungry get failed", textStatus);
  },
  dataType: 'jsonp'
});

$.ajax({
  url: 'json/tired.json',
  data: '',
  contentType:"application/json",
  headers:{"Access-Control-Allow-Origin":"*"},
  success: function(res){
  	// console.log(res);
  	tiredJson = res.resp;
  	tired = true;
	for (var i = 0; i < tiredJson.length; i++) {
		tiredJson[i].properties['marker-color'] = '#ffa500';
		tiredJson[i].properties['marker-symbol'] = 'lodging';
		tiredJson[i].properties.description = tiredJson[i].properties.address_1 + "<br />";
		if (tiredJson[i].properties.phone_1)
			tiredJson[i].properties.description += tiredJson[i].properties.phone_1 + "<br />";
		if (tiredJson[i].properties.email)
			tiredJson[i].properties.description += tiredJson[i].properties.email + "<br />";

		tiredJson[i].properties.description += "<br />";

		if (tiredJson[i].properties.business_hours)
			tiredJson[i].properties.description += "Open: " + tiredJson[i].properties.business_hours + "<br />";
		if (tiredJson[i].properties.eligibility)
			tiredJson[i].properties.description += "<br />Eligibility: " + tiredJson[i].properties.eligibility + "<br />";
		tiredJson[i].properties.title = tiredJson[i].properties.name;
		var save = tiredJson[i].geometry.coordinates[1];
		tiredJson[i].geometry.coordinates[1] = tiredJson[i].geometry.coordinates[0];
		tiredJson[i].geometry.coordinates[0] = save;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Tired get failed", textStatus);
  },
  dataType: 'jsonp'
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
		'marker-color': '#789cd3',
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
	// console.log(markers);

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
  url: 'json/sick.json',
  data: '',
  success: function(res){
  	// console.log(res);
  	sickJson = res.resp;
  	sick = false;
	for (var i = 0; i < sickJson.length; i++) {
		sickJson[i].properties['marker-color'] = '#ce0000';
		sickJson[i].properties['marker-symbol'] = 'hospital';
		sickJson[i].properties.description = sickJson[i].properties.address_1 + "<br />";
		if (sickJson[i].properties.phone_1)
			sickJson[i].properties.description += sickJson[i].properties.phone_1 + "<br />";
		if (sickJson[i].properties.email)
			sickJson[i].properties.description += sickJson[i].properties.email + "<br />";

		sickJson[i].properties.description += "<br />";

		if (sickJson[i].properties.business_hours)
			sickJson[i].properties.description += "Open: " + sickJson[i].properties.business_hours + "<br />";
		if (sickJson[i].properties.eligibility)
			sickJson[i].properties.description += "<br />Eligibility: " + sickJson[i].properties.eligibility + "<br />";
		sickJson[i].properties.title = sickJson[i].properties.name;
		var save = sickJson[i].geometry.coordinates[1];
		sickJson[i].geometry.coordinates[1] = sickJson[i].geometry.coordinates[0];
		sickJson[i].geometry.coordinates[0] = save;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Sick get failed", textStatus);
  },
  dataType: 'jsonp'
});

$.ajax({
  url: 'json/danger.json',
  data: '',
  headers:{"Access-Control-Allow-Origin":"*"},
  success: function(res){
  	// console.log(res);
  	dangerJson = res.resp;
  	danger = false;
	for (var i = 0; i < dangerJson.length; i++) {
		dangerJson[i].properties['marker-color'] = '#990099';
		dangerJson[i].properties['marker-symbol'] = 'triangle';
		dangerJson[i].properties.description = dangerJson[i].properties.address_1 + "<br />";
		if (dangerJson[i].properties.phone_1)
			dangerJson[i].properties.description += dangerJson[i].properties.phone_1 + "<br />";
		if (dangerJson[i].properties.email)
			dangerJson[i].properties.description += dangerJson[i].properties.email + "<br />";

		dangerJson[i].properties.description += "<br />";

		if (dangerJson[i].properties.business_hours)
			dangerJson[i].properties.description += "Open: " + dangerJson[i].properties.business_hours + "<br />";
		if (dangerJson[i].properties.eligibility)
			dangerJson[i].properties.description += "<br />Eligibility: " + dangerJson[i].properties.eligibility + "<br />";
		dangerJson[i].properties.title = dangerJson[i].properties.name;
		var save = dangerJson[i].geometry.coordinates[1];
		dangerJson[i].geometry.coordinates[1] = dangerJson[i].geometry.coordinates[0];
		dangerJson[i].geometry.coordinates[0] = save;
	}
  },
  error: function(jqXHR, textStatus, errorThrown){
  	console.log("Danger get failed", textStatus);
  },
  dataType: 'jsonp'
});
