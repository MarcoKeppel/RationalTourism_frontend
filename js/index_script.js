var current_level = 0;
function ask_server_for_level(){
    level = 0;
    fetch('http://10.199.226.107:8000/getLevel')
    .then((response) => response.text())
    .then((data) => {
        const obj = JSON.parse(data);
        if (obj['result'] == true){
            level  = obj['level'];
            if (level != current_level){
                window.location = 'level1_index.html'
            }
        }
        
    });
}
function repeat_ask_server_for_level(){
    setInterval(ask_server_for_level, 2000)
}

repeat_ask_server_for_level();

window.getLocation = getLocation;
