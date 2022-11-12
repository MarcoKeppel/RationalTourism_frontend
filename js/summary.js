/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 // https://groups.google.com/g/google-maps-js-api-v3/c/ubomY2IT728
 /*
 function initMap(center_location_lat, center_location_lng, origin_lat, origin_lng, destination_lat, destination_lng, modes, pois) {
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
    
    colors = ["black"]
    for (var i = 0; i < modes.length; i++){
        console.log(origin_lat + ',' + origin_lng, destination_lat + ',' + destination_lng, colors[i], modes[i])
        requestDirections(origin_lat + ',' + origin_lng, destination_lat + ',' + destination_lng, colors[i], modes[i]);
    }

    
    for (const key in pois){
        if(pois.hasOwnProperty(key)){
            latitude = pois[key]['latitude'];
            longitude = pois[key]['longitude'];
            const marker = new google.maps.Marker({
                position : {lat: latitude , lng: longitude},
                map: map
            });
            console.log(`${key} : ${pois[key]}`)
        }
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
    
    question = ""
    answers = []
    modes = []
    markers = []
    fetch('http://10.199.226.107:8000/phaseThreeInfo')
    .then((response) => response.text())
    .then((response) => {
        const obj = JSON.parse(response);
        if (obj['result'] == true){
            destination_lat  = obj['target']['lat'];
            destination_lng  = obj['target']['lng'];
            destination_modes  = obj['modes'];
            
        }
        pois = null;
        
        
        fetch('http://10.199.226.107:8000/getPointsOfInterest')
        .then((response) => response.text())
        .then((response) => {
            const obj = JSON.parse(response);
            if (obj['result'] == true){
                
                pois = obj['pois']
            }
            
            
        });
        initMap(center_lat, center_lng, start_lat, start_lng, destination_lat, destination_lng,destination_modes,pois);
    });
}


var current_level = 3;
function ask_server_for_level(){
    level = 0;
    fetch('http://10.199.226.107:8000/getLevel')
    .then((response) => response.text())
    .then((data) => {
        const obj = JSON.parse(data);
        if (obj['result'] == true){
            level  = obj['level'];
            if (level != current_level){
                window.location = 'summary.html'
            }
        }
        
    });
}

function repeat_ask_server_for_level(){
    setInterval(ask_server_for_level, 2000)
}

// repeat_ask_server_for_level();

window.getLocation = getLocation;

*/

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 // https://groups.google.com/g/google-maps-js-api-v3/c/ubomY2IT728
 function initMap(center_location_lat, center_location_lng, origin_lat, origin_lng, destination_lat, destination_lng, modes, pois) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: {
        lat: center_location_lat,
        lng: center_location_lng
      },
        styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
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
    
    colors = ["black"]

    icons = [
        "cafe.png",
        "restaurant.png",
        "tavern.png",
        "e-bike.png",
        "church.png",
        "monastery.png",
        "castle.png",
        "architecture.png",
        "winery.png",
        "charging_station.png",
        "church.png"
    ];
    all_types = [
        'bars cafes bistros' , // -> Bars/Cafés/Bistros
        'restaurants' , // -> Restaurants
        'restaurants gasthäuser' , // -> Restaurants & Taverns
        'e-bike ladestation' , // -> E-bike charging station
        'kirchen' , // -> Churches
        'klöster' , // -> Monasteries
        'burgen schlösser' , // -> Forts & Castles
        'architektur' , // -> Architecture
        'essen trinken' , // -> Wineries
        'e-tankstellen ladestationen' , // -> Electric charging stations
        'kirchen klöster' , // -> Churches & Monasteries
    ]
    all_types.forEach((element, index) => {
        all_types[index] = element.replace(/[^A-Za-z0-9\-_]/g, '-').replace("--", "-");
    });
    console.log(all_types);

    for (var i = 0; i < modes.length; i++){
        requestDirections(origin_lat + ',' + origin_lng, destination_lat + ',' + destination_lng, colors[i], modes[i]);
    }
    for (const key in pois){
        if(pois.hasOwnProperty(key)){
            latitude = pois[key]['latitude'];
            longitude = pois[key]['longitude'];
            iconIndex = all_types.indexOf(pois[key]['type'].replace(/[^A-Za-z0-9\-_]/g, '-'));
            console.log(pois[key]['type'].replace(/[^A-Za-z0-9\-_]/g, '-'));
            console.log(iconIndex);
            const marker = new google.maps.Marker({
                position : {lat: latitude , lng: longitude},
                map: map,
                title: key,
                icon: {
                    url: "icons/"+icons[iconIndex],
                    scaledSize: new google.maps.Size(35, 35)
                },
            });
        }
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
    
    question = ""
    answers = []
    modes = []

    fetch('http://10.199.226.107:8000/phaseThreeInfo')
    .then((response) => response.text())
    .then((response) => {
        const obj = JSON.parse(response);
        if (obj['result'] == true){
            destination_lat  = obj['target']['lat'];
            destination_lng  = obj['target']['lng'];
            destination_modes  = obj['modes'];            
        }
        pois = null;
        
        
        fetch('http://10.199.226.107:8000/getPointsOfInterest')
        .then((response) => response.text())
        .then((response) => {
            const obj = JSON.parse(response);
            if (obj['result'] == true){                
                pois = obj['pois'];
            }
            ranking = []
            fetch('http://10.199.226.107:8000/ranking')
            .then((response) => response.text())
            .then((response) => {
                const obj = JSON.parse(response);
                if (obj['result'] == true){                
                    ranking = obj['ranking'];
                }
                let table = document.getElementById('ranking');
                let tr1 = document.createElement('tr');
                let th1 = document.createElement('th');
                th1.innerHTML = 'Username';
                let th2 = document.createElement('th');
                th2.innerHTML = 'Score';

                tr1.appendChild(th1);
                tr1.appendChild(th2);
                table.appendChild(tr1);
                
                

                for(var i=0;i<ranking.length; i++){
                    let tr = document.createElement('tr');
                    let td1 = document.createElement('td');
                    td1.innerHTML = ranking[i]['username'];
                    let td2 = document.createElement('td');
                    td2.innerHTML = ranking[i]['score'];
                    tr.appendChild(td1); 
                    tr.appendChild(td2);
                    table.appendChild(tr);
                }
                initMap(center_lat, center_lng, start_lat, start_lng, destination_lat, destination_lng,destination_modes, pois);
                
            });
        });
        
    });
}

window.getLocation = getLocation;
  
