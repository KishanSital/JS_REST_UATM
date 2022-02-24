
function logout() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'logout'), true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            getLoggedInStatus();
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}