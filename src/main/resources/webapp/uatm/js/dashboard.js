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
        '   <div class="col-md-12 col-sm-12 col-xs-12">' +
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
        '      <span class="help-block" id="hint_bankSelector">' +
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
        '</div>' +
        '<br>';

    populateExchangeRateTable();

    populateBankOptions();
}


function populateExchangeRateTable() {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let exchangeRates = JSON.parse(this.responseText);
            if (exchangeRates && exchangeRates.length) {
                generateTableForExchageRates(exchangeRates);
            }
        }
    };
    xhttp.open("GET", (restUrl + 'exchange-rates'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function generateTableForExchageRates(exchangeRates) {

    clearTableData();

    // get the reference for the body
    var body = tables;

    // creates a <table> element and a <tbody> element

    var tbl = document.createElement("table");
    tbl.setAttribute('id', 'balanceTable')
    tbl.setAttribute("border", "2");
    tbl.setAttribute("class", "table center-table");


    var header = document.createElement('thead');
    var headingRow = document.createElement('tr');

    var headingCell1 = document.createElement('td');
    var headingText1 = document.createTextNode('Currency');
    headingCell1.appendChild(headingText1);
    headingRow.appendChild(headingCell1);

    var headingCell2 = document.createElement('td');
    var headingText2 = document.createTextNode('Exchange Rate');
    headingCell2.appendChild(headingText2);
    headingRow.appendChild(headingCell2);

    header.appendChild(headingRow)
    tbl.appendChild(header)
    //var header = "<th>Header</th>";
    var tblBody = document.createElement("tbody");


    // creating all cells
    for (var i = 0; i < exchangeRates.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(exchangeRates[i].currencyCode);
            } else if (j === 1) {
                var cellText = document.createTextNode(exchangeRates[i].exchangeRate);
            }

            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }
    // This is for the quick solution
    // tbl.innerHTML = header

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);


    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;

}

function createBankConnection() {

    const selectedBank = document.getElementById("bankSelector").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const pinNumber = document.getElementById("cardPin").value;

    console.log(selectedBank);
    console.log(cardNumber);
    console.log(pinNumber);

    const hint_bankSelector = document.getElementById("hint_bankSelector");
    const hint_cardNumber = document.getElementById("hint_cardNumber");
    const hint_cardPin = document.getElementById("hint_cardPin");

    if (!selectedBank == 'null' || selectedBank == '' || cardNumber == '' || pinNumber == '') {

        if (selectedBank == 'null' || selectedBank == '') {
            hint_bankSelector.style.color = 'red';
        } else {
            hint_bankSelector.style.color = 'black';
        }
        if (cardNumber == '') {
            hint_cardNumber.style.color = 'red';
        } else {
            hint_cardNumber.style = 'black';
        }
        if (pinNumber == '') {
            hint_cardPin.style.color = 'red';
        } else {
            hint_cardPin.style.color = 'black';
        }

    } else {
        hint_bankSelector.style.color = 'black';
        hint_cardNumber.style = 'black';
        hint_cardPin.style.color = 'black';

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




