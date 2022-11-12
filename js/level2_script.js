/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 // https://groups.google.com/g/google-maps-js-api-v3/c/ubomY2IT728
 function initMap(center_location_lat, center_location_lng, origin_lat, origin_lng, destination_lat, destination_lng, modes) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: {
        lat: center_location_lat,
        lng: center_location_lng
      },
    });
    function renderDirections(result, color) {
        var directionsRenderer = new google.maps.DirectionsRenderer({
            suppressInfoWindows: true,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: color,
            },
        });
        directionsRenderer.setMap(map);
        directionsRenderer.setDirections(result);
    }
    
    var directionsService = new google.maps.DirectionsService;
        function requestDirections(start, end, color, mode) {
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: mode,
            }, function(result) {
                renderDirections(result, color);
        });
    }
    
    colors = ["blue", "red"]
    for (var i = 0; i < modes.length; i++){
        requestDirections(origin_lat + ',' + origin_lng, destination_lat + ',' + destination_lng, colors[i], modes[i]);

    }
  }
  
  
  function getLocation(){
    // Center map on NOI Techpark
    center_lat = 46.47871627754789;
    center_lng = 11.332516995584033;

    // Start location on NOI Techpark
    start_lat = 46.47871627754789;
    start_lng = 11.332516995584033;

    destination_lat = 0;
    destination_lng = 0;
    d = '{"result": true, "target": {"lat": 46.504719, "lng": 11.332671}}'
    const obj = JSON.parse(d);
    /* Uncomment after connection works!
    fetch('http://10.199.226.107:8000/getTargetLocation')
    .then((response) => response.json())
    .then((data) => {
        const obj = JSON.parse(data);
        if (obj['result'] == true){
            destination_lat  = obj['target']['lat'];
            destination_lng  = obj['target']['lng'];
        }
        
    });*/
    if (obj['result'] == true){
        destination_lat  = obj['target']['lat'];
        destination_lng  = obj['target']['lng'];
    }
    modes = ["DRIVING", "TRANSIT"]
    initMap(center_lat, center_lng, start_lat, start_lng, destination_lat, destination_lng, modes);
}


var current_level = 2;
function ask_server_for_level(){
    level = 0;
    fetch('http://10.199.226.107:8000/getLevel')
    .then((response) => response.json())
    .then((data) => {
        const obj = JSON.parse(data);
        if (obj['result'] == true){
            level  = obj['level'];
            if (level != current_level){
                window.location = 'index_level3.html'
            }
        }
        
    });
}
function repeat_ask_server_for_level(){
    setInterval(ask_server_for_level, 2000)
}

repeat_ask_server_for_level();

window.getLocation = getLocation;
  