var cities = [];

// function chooseAddr(lat, lng, type) {
  // var location = new L.LatLng(lat, lng);
  // var point = new L.marker(location);
  // point.addTo(map);
// }
function renderListOfCities(myList) {
	$("#list").empty();
	$.each(myList, function(key, city){
		$("#list").append("<li>" + city["cityName"] + "<input type=\"text\" id=\""+key+"\"/></li>");
	});
}

function addCityToTheList(lat, lng, name) {
  var location = new L.LatLng(lat, lng);
  var point = new L.marker(location);
  point.addTo(map);
  var city = {
	  latitude: lat,
	  longitude: lng,
	  cityName: name,
	  time: 0
  };
  cities.push(city);
  renderListOfCities(cities);
}

function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&city=' + inp.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            //bb = val.boundingbox;
            //items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
			items.push("<li><a href='#' onclick='addCityToTheList(" + val.lat + ", " + val.lon + ", \"" + val.name + "\", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
        });

		$('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found" }).appendTo('#results');
        }
    });
}

function calculate_location(){
	//obter os valores dos text box, atualizar valor dos objetos, calcular a média, plotar no mapa.
	var totalTime = 0;
	var latitudes = [];
	var longitudes = [];
	
	$.each(cities, function(key, city){
		city["time"] = $("#" + key).val(); //todo: tá setando o valor de 'time' em texto em vez de número
		latitudes.push(city["latitude"] * city["time"]);
		longitudes.push(city["longitude"] * city["time"]);
		totalTime = totalTime + parseFloat(city["time"]);
	});
	// console.log(totalTime);
	// console.log(latitudes);
	// console.log(longitudes);
	var finalLatitude = 0;
	$.each(latitudes,function(){finalLatitude+=parseFloat(this) || 0;});
	finalLatitude = finalLatitude / totalTime;
	
	var finalLongitude = 0;
	$.each(longitudes,function(){finalLongitude+=parseFloat(this) || 0;});
	finalLongitude = finalLongitude / totalTime;
	
	// console.log(finalLatitude);
	
	var myIcon = L.icon({
		iconUrl: 'images/home-marker-cropped-small.png',
		// shadowUrl: 'leaf-shadow.png',

		// iconSize:     [38, 95], // size of the icon
		iconSize:     [25, 39], // size of the icon
		// shadowSize:   [50, 64], // size of the shadow
		// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		iconAnchor:   [12, 38], // point of the icon which will correspond to marker's location
		// shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	var finalLocation = new L.LatLng(finalLatitude, finalLongitude);
	// var finalPoint = new L.marker(finalLocation);
	var finalPoint = new L.marker(finalLocation, {icon: myIcon});
	finalPoint.addTo(map);
}
// window.onload = load_map;
