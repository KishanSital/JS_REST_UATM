
getLoggedInStatus();

function getLoggedInStatus() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // 4 = klaar met call en 200 is ok
        if (this.readyState == 4 && this.status == 200) {
            isUserLoggedIn = JSON.parse(this.responseText);
            if (!isUserLoggedIn) {
                window.location.href = (siteUrl + 'login.html');
            }
            loadDashboardView();
        }
    };
    xhttp.open("GET", (restUrl + 'login-session'), true);
    xhttp.send();
}

function loadDashboardView() {
    clearView();

    views.innerHTML =
        '<div id="dashboardView" class="card custom-container">' +
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Connect to bank</h3>' +
        ' <div class="container-fluid">' +
        '  <div class="row">' +
        '   <div class="col-md-6 col-sm-6 col-xs-12">' +
        '    <form method="post">' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="bankSelector">' +
        '       Select your bank' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <select class="select form-control" id="bankSelector" name="selectedBank">' +
        '      </select>' +
        '      <span class="help-block" id="hint_bankSecelctor">' +
        '       Please select a bank' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="cardNumber">' +
        '       Card number' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <input class="form-control" id="cardNumber" name="cardNumber" type="text"/>' +
        '      <span class="help-block" id="hint_cardNumber">' +
        '       Enter your card number' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="cardPin">' +
        '       Card pin' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <input class="form-control" id="cardPin" name="cardPin" type="password"/>' +
        '      <span class="help-block" id="hint_cardPin">' +
        '       Enter your card pin' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group">' +
        '      <div>' +
        '       <input type="button" value="Connect" class="btn btn-primary " name="connect" onclick="createBankConnection()">' +
        '       <input type="button" value="Disconnect" class="btn btn-danger" name="disconnect" onclick="closeBankConnection()">' +
        '      </div>' +
        '     </div>' +
        '    </form>' +
        '   </div>' +
        '  </div>' +
        ' </div>' +
        ' </div>' +
        '</div>';

    populateBankOptions();
}

function createBankConnection() {

    const selectedBank = document.getElementById("bankSelector").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const pinNumber = document.getElementById("cardPin").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", (restUrl + "connect-bank"));
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "cardNumber": cardNumber,
        "cardPin": pinNumber,
        "selectedBank": selectedBank
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const connectionStatus = JSON.parse(this.responseText);
            if (connectionStatus) {
                Swal.fire({
                    text: 'Connection was successful',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    text: 'Connection was unsuccessful',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
}

function closeBankConnection() {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            const connectionStatus = JSON.parse(this.responseText);
            if (connectionStatus) {
                Swal.fire({
                    text: 'Disconnected successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    text: 'Disconnected unsuccessfully',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    xhttp.open("POST", (restUrl + 'end-bank-session'), true);
    xhttp.send();
}

function callbackFunctionForBankOptions(xhttp) {
    const bankSelector = document.getElementById("bankSelector");
    bankSelector.options.length = 0;
    let bankOptions = JSON.parse(xhttp.responseText);

    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode('Choose a bank'));
    opt.value = null;
    bankSelector.appendChild(opt);


    bankOptions.forEach(bankOption => {
        addBankOptionsToSelect(bankOption);
    });
}

function addBankOptionsToSelect(bankOption) {
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode(bankOption));
    opt.value = bankOption;
    const bankSelector = document.getElementById("bankSelector");
    bankSelector.appendChild(opt);
}




