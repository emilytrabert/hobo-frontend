$(document).ready(function(){

    var googleMapsRedirect = function(dlon, dlat) {
	var slon = current[0].geometry.coordinates[0];
	var slat = current[0].geometry.coordinates[1];
	var url = "http://maps.google.com/maps?saddr="+slat+","+slon+"&daddr="+dlat+","+dlon+"&directionsmode=transit";
	window.open(url,'_blank');
    };


});