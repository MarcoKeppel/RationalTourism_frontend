/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function initPano(latitude, longitude) {
    // Note: constructed panorama objects have visible: true
    // set by default.
    console.log(latitude, longitude)
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("map"),
        {
        position: { lat: latitude, lng: longitude },
        addressControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        }
    );
}


function getLocation(){
    latitude = 0;
    longitude = 0;
    d = '{"result": true, "target": {"lat": 46.504719, "lng": 11.332671}}'
    const obj = JSON.parse(d);
    /* Uncomment after connection works!
    fetch('http://10.199.226.107:8000/getTargetLocation')
    .then((response) => response.json())
    .then((data) => {
        const obj = JSON.parse(data);
        if (obj['result'] == true){
            latitude  = obj['target']['lat'];
            longitude  = obj['target']['lng'];
        }
        
    });*/
    if (obj['result'] == true){
        latitude  = obj['target']['lat'];
        longitude  = obj['target']['lng'];
    }

    initPano(latitude, longitude);
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
                window.location = 'index_level2.html'
            }
        }
        
    });
}
function repeat_ask_server_for_level(){
    setInterval(ask_server_for_level, 2000)
}

repeat_ask_server_for_level();

window.getLocation = getLocation;
  