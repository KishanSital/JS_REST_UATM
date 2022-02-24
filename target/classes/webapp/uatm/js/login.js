let isUserLoggedIn = false;
const restUrl = '/JS_REST_UATM/api/uatm/';
const siteUrl = '/JS_REST_UATM/uatm/';

getLoggedInStatus();

function getLoggedInStatus() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // 4 = klaar met call en 200 is ok
        if (this.readyState == 4 && this.status == 200) {
            isUserLoggedIn = JSON.parse(this.responseText);
            if (isUserLoggedIn) {
                window.location.href = (siteUrl+'index.html');
            }
        }
    };
    xhttp.open("GET", (restUrl + 'login-session'), true);
    xhttp.send();

}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", (restUrl + "login"));
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "username": username,
        "password": password
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const loginStatus = JSON.parse(this.responseText);
            if (loginStatus) {
                Swal.fire({
                    text: 'Login was successful',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = (siteUrl+'index.html');
                    }
                });
            } else {
                Swal.fire({
                    text: 'Login was unsuccessful',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
}