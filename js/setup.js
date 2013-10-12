var map;

$(document).ready(function(){
	map = L.mapbox.map('map', 'etrabert.map-wb3ujm4j')
                 .setView([38.897, -77.0], 12);

    $(':checkbox').change(function() {
        console.log(this.value);
        console.log(this.checked);
    });

    $('#learn-more').click(function(){
    	$('#about').slideToggle();
    })
});