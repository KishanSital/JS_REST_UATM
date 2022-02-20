var isUserLoggedIn = false;
var isBankConnected = false;
const restUrl = '/JS_REST_UATM/api/uatm/';
const siteUrl = '/JS_REST_UATM/uatm/';
const views = document.getElementById("views");
let sourceAccountForTransfer;

getLoggedInStatus();

function getConnectedBank() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'bank-session'), false);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            isBankConnected = JSON.parse(this.responseText);
            if (!isBankConnected) {
                loadConnectBankMessage();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

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

function logout() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'logout'), true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            getLoggedInStatus();
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function clearView() {
    views.innerHTML = '';
    sourceAccountForTransfer = null;
    clearTableData();

}

function loadConnectBankMessage() {
    views.innerHTML =
        '<div class="card custom-container">' +
        '<div class="bootstrap-iso custom-child">' +
        '<div class="alert alert-warning" role="alert">' +
        'Please navigate to the dashboard to connect to your bank account.' +
        '</div>' +
        '</div>' +
        '</div>';
}

function loadDashboardView() {
    clearView();

    views.innerHTML =
        '<div class="card custom-container">' +
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

function populateBankOptions() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            callbackFunctionForBankOptions(this);
        }
    };
    xhttp.open("GET", (restUrl + 'bankoptions'), true);
    xhttp.send();

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
    var xhttp;
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

function loadBalanceView() {
    clearView();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'bank-session'), true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            isBankConnected = JSON.parse(this.responseText);
            if (isUserLoggedIn && isBankConnected) {

                viewBalance();
            }
            if (!isBankConnected) {
                loadConnectBankMessage();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();

}

function viewBalance() {
    views.innerHTML +=
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Bank balance</h3>' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '    <form method="post">' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="accountSelector">' +
        '       Select your bank' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <select class="select form-control" id="accountSelector" name="accountSelector" onchange="getBalanceData(this.value)">' +
        '      </select>' +
        '      <span class="help-block" id="hint_bankSecelctor">' +
        '       Please select an account' +
        '      </span>' +
        '     </div>' +
        '    </form>' +
        '</div>' +
        '</div>';

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                populateAccountOptions(bankAccounts);
                getBalanceData();
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Bank account balance</h3>' +
                    '<h4 class="text-center">No accounts were found.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", (restUrl + 'bank-accounts'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

}

function viewBalanceForTransfer() {
    views.innerHTML +=
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Send money</h3>' +
        '<h5 class="text-center">Account you want to send money from</h5>' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '    <form method="post">' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="accountSelector">' +
        '       Select your bank' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <select class="select form-control" id="accountSelector" name="accountSelector" onchange="getBalanceData(this.value)">' +
        '      </select>' +
        '      <span class="help-block" id="hint_bankSecelctor">' +
        '       Please select an account' +
        '      </span>' +
        '     </div>' +
        '    </form>' +
        '</div>' +
        '</div>' +
        '</div>';

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                populateAccountOptions(bankAccounts);
                getBalanceDataForTransfer();
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Bank account balance</h3>' +
                    '<h4 class="text-center">No accounts were found.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", (restUrl + 'bank-accounts'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

}

function getBalanceData(value) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                generateBalanceTable(bankAccounts);
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Bank account balance</h3>' +
                    '<h4 class="text-center">No accounts were found.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", (restUrl + 'bank-balance'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if (value) {
        xhttp.send(JSON.stringify({
            "accountNumber": +value
        }));
    } else {
        xhttp.send();
    }
}

function getBalanceDataForTransfer(value) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);

            if (bankAccounts && bankAccounts.length) {
                generateBalanceTableForTransfer(bankAccounts);
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Bank account balance</h3>' +
                    '<h4 class="text-center">No accounts were found.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", (restUrl + 'bank-balance'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if (value) {
        xhttp.send(JSON.stringify({
            "accountNumber": +value
        }));
    } else {
        xhttp.send();
    }
}

function loadTransactionsView() {
    clearView();
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            var transactions = JSON.parse(this.responseText);
            if (transactions && transactions.length) {
                generateTable(transactions);
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Transactions</h3>' +
                    '<h4 class="text-center">Transaction log was empty.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("GET", (restUrl + 'transactions'), true);
    xhttp.send();
}

function loadMoneyTransferView() {
    clearView();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'bank-session'), true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            isBankConnected = JSON.parse(this.responseText);
            if (isUserLoggedIn && isBankConnected) {

                viewBalanceForTransfer();
            }
            if (!isBankConnected) {
                loadConnectBankMessage();
            }
        }
    };
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}


function generateTable(transactions) {

    // get the reference for the body
    var body = document.getElementById("views");

    body.innerHTML +=
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Transactions</h3>';
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");


    var header = document.createElement('thead')
    var headingRow = document.createElement('tr')

    var headingCell1 = document.createElement('td')
    var headingText1 = document.createTextNode('Date')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)

    var headingCell2 = document.createElement('td')
    var headingText2 = document.createTextNode('Amount')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)

    var headingCell3 = document.createElement('td')
    var headingText3 = document.createTextNode('Description')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)

    var headingCell4 = document.createElement('td')
    var headingText4 = document.createTextNode('Source')
    headingCell4.appendChild(headingText4)
    headingRow.appendChild(headingCell4)

    header.appendChild(headingRow)
    tbl.appendChild(header)
    //var header = "<th>Header</th>";
    var tblBody = document.createElement("tbody");


    // creating all cells
    for (var i = 0; i < transactions.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(transactions[i].transactionDate);
            } else if (j === 1) {
                var cellText = document.createTextNode(transactions[i].transactionAmount);
            } else if (j === 2) {
                var cellText = document.createTextNode(transactions[i].transactionDescription);
            } else if (j === 3) {
                var cellText = document.createTextNode(transactions[i].transactionSource);
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
    tbl.setAttribute("border", "2");
    tbl.setAttribute("class", "table");
    body.innerHTML +=
        '</div>' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '<input type="button" value="Clear transaction log" class="btn btn-primary" name="clearLog" onclick="clearTransactionLog()">' +
        '</div>' +
        '</div>';
}

function clearTableData() {
    let tableBody = document.getElementById("balanceTable");
    if (tableBody) {
        tableBody.innerHTML = '';
    }
}

function generateBalanceTable(bankAccounts) {

    clearTableData();

    // get the reference for the body
    var body = document.getElementById("views");

    // creates a <table> element and a <tbody> element

    let tbl = document.getElementById("balanceTable");

    if (!tbl) {
        tbl = document.createElement("table");
        tbl.setAttribute('id', 'balanceTable')
        tbl.setAttribute("border", "2");
        tbl.setAttribute("class", "table");
    }

    var header = document.createElement('thead');
    var headingRow = document.createElement('tr');

    var headingCell1 = document.createElement('td');
    var headingText1 = document.createTextNode('Number');
    headingCell1.appendChild(headingText1);
    headingRow.appendChild(headingCell1);

    var headingCell2 = document.createElement('td');
    var headingText2 = document.createTextNode('Type');
    headingCell2.appendChild(headingText2);
    headingRow.appendChild(headingCell2);

    var headingCell3 = document.createElement('td');
    var headingText3 = document.createTextNode('Currency');
    headingCell3.appendChild(headingText3);
    headingRow.appendChild(headingCell3);

    var headingCell4 = document.createElement('td');
    var headingText4 = document.createTextNode('Balance');
    headingCell4.appendChild(headingText4);
    headingRow.appendChild(headingCell4);

    header.appendChild(headingRow)
    tbl.appendChild(header)
    //var header = "<th>Header</th>";
    var tblBody = document.createElement("tbody");


    // creating all cells
    for (var i = 0; i < bankAccounts.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(bankAccounts[i].accountNumber);
            } else if (j === 1) {
                var cellText = document.createTextNode(bankAccounts[i].type);
            } else if (j === 2) {
                var cellText = document.createTextNode(bankAccounts[i].currency);
            } else if (j === 3) {
                var cellText = document.createTextNode(bankAccounts[i].balance);
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
    body.innerHTML +=
        '</div>';

    console.log(bankAccounts);


}

function generateBalanceTableForTransfer(bankAccounts) {

    clearTableData();

    // get the reference for the body
    var body = document.getElementById("views");

    // creates a <table> element and a <tbody> element

    let tbl = document.getElementById("balanceTable");

    if (!tbl) {
        tbl = document.createElement("table");
        tbl.setAttribute('id', 'balanceTable')
        tbl.setAttribute("border", "2");
        tbl.setAttribute("class", "table");
    }

    var header = document.createElement('thead');
    var headingRow = document.createElement('tr');

    var headingCell1 = document.createElement('td');
    var headingText1 = document.createTextNode('Number');
    headingCell1.appendChild(headingText1);
    headingRow.appendChild(headingCell1);

    var headingCell2 = document.createElement('td');
    var headingText2 = document.createTextNode('Type');
    headingCell2.appendChild(headingText2);
    headingRow.appendChild(headingCell2);

    var headingCell3 = document.createElement('td');
    var headingText3 = document.createTextNode('Currency');
    headingCell3.appendChild(headingText3);
    headingRow.appendChild(headingCell3);

    var headingCell4 = document.createElement('td');
    var headingText4 = document.createTextNode('Balance');
    headingCell4.appendChild(headingText4);
    headingRow.appendChild(headingCell4);

    header.appendChild(headingRow)
    tbl.appendChild(header)
    //var header = "<th>Header</th>";
    var tblBody = document.createElement("tbody");


    // creating all cells
    for (var i = 0; i < bankAccounts.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(bankAccounts[i].accountNumber);
            } else if (j === 1) {
                var cellText = document.createTextNode(bankAccounts[i].type);
            } else if (j === 2) {
                var cellText = document.createTextNode(bankAccounts[i].currency);
            } else if (j === 3) {
                var cellText = document.createTextNode(bankAccounts[i].balance);
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

    if (bankAccounts && bankAccounts.length && bankAccounts.length == 1) {
        sourceAccountForTransfer = bankAccounts[0];
         generateTransferView();
    }
}

function populateAccountOptions(bankAccounts) {
    const accountSelector = document.getElementById("accountSelector");
    accountSelector.options.length = 0;
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode('Select an account'));
    opt.value = null;
    accountSelector.appendChild(opt);

    bankAccounts.forEach(bankOption => {
        let option = bankOption.accountNumber + ' - ' + bankOption.type + ' - ' + bankOption.currency;
        addBankAccountToSelect(option, bankOption);
    });
}

function addBankAccountToSelect(text, value) {
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode(text));
    opt.value = value.accountNumber;
    const accountSelector = document.getElementById("accountSelector");
    accountSelector.appendChild(opt);
}

function clearTransactionLog() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            loadTransactionsView();
        }
    };
    xhttp.open("DELETE", (restUrl + 'clear-transactions'), true);
    xhttp.send();
}

function generateTransferView() {

    console.log('teeeeeeeeeeeeeeeeeeeeeeeeeet');

    views.innerHTML +=
        '<div class="card custom-container">' +
        '<div class="bootstrap-iso custom-child">' +
        '<h5 class="text-center">Account you want to send money to</h5>' +
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
        '       Please destination bank' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="accountNumber">' +
        '       Card number' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <input class="form-control" id="accountNumber" name="accountNumber" type="text"/>' +
        '      <span class="help-block" id="hint_accountNumber">' +
        '       Enter receivers account number' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group ">' +
        '      <label class="control-label requiredField" for="amount">' +
        '       Amount' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <input class="form-control" id="amount" name="amount" type="number"/>' +
        '      <span class="help-block" id="hint_amount">' +
        '       Enter the amount you want to send' +
        '      </span>' +
        '     </div>' +
        '     <div class="form-group">' +
        '      <div>' +
        '       <input type="button" value="Send" class="btn btn-primary " name="Send" onclick="transferMoney()">' +
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

function transferMoney() {
    const sourceAccountNumber = sourceAccountForTransfer.accountNumber;
    const destinationAccountNumber = document.getElementById("accountNumber").value;
    const amount = document.getElementById("accountNumber").value;
    const destinationBank = document.getElementById("bankSelector").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", (restUrl + "transfer-money"));
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "sourceAccountNumber": sourceAccountNumber,
        "destinationAccountNumber": destinationAccountNumber,
        "amount": amount,
        "destinationBank": destinationBank
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const loginStatus = JSON.parse(this.responseText);
            if (loginStatus) {
                Swal.fire({
                    text: 'Transfer was successful',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        sourceAccountForTransfer = null;
                    }
                });
            } else {
                Swal.fire({
                    text: 'Transfer was unsuccessful',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
}
