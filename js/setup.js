var map, lat, lon;

$(document).ready(function(){

	// check if user has geolocation
	if (navigator.geolocation) {
	    console.log("user has geolocation!");
	    navigator.geolocation.getCurrentPosition(
		function(position) {
		    console.log("hi");
		    lat = position.coords.latitude;
		    lon = position.coords.longitude;
		    map = L.mapbox.map('map', 'etrabert.map-wb3ujm4j')
			.setView([lat,lon],12);
		    console.log("hurray!");
		},
		function(error){
		    console.log("#oopsyall");
		});
	} else {
	    console.log("user doesn't have geolocation :(");
	    map = L.mapbox.map('map', 'etrabert.map-wb3ujm4j')
		.setView([38.897, -77.0], 12);
	}

    $(':checkbox').change(function() {
        console.log(this.value);
        console.log(this.checked);
    });

    $('#learn-more').click(function(){
    	$('#about').slideToggle();
    });

});