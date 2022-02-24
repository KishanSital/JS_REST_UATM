function loadMoneyTransferView() {
    clearView();
    getConnectedBank();
    if (isBankConnected) {
        viewBalanceForTransfer()
        getBankAccounts()
    }

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
        '      <select class="select form-control" id="accountSelector" name="accountSelector" onchange="getBalanceDataForTransfer(this.value)">' +
        '      </select>' +
        '      <span class="help-block" id="hint_bankSecelctor">' +
        '       Please select an account' +
        '      </span>' +
        '     </div>' +
        '    </form>' +
        '</div>' +
        '</div>' +
        '</div>';
}


function getBalanceDataForTransfer(value) {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                generateBalanceTableForTransfer(bankAccounts);
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

function generateBalanceTableForTransfer(bankAccounts) {

    clearTableData();

    // get the reference for the body
    var body = tables;

    // creates a <table> element and a <tbody> element

    var tbl = document.createElement("table");
    tbl.setAttribute('id', 'balanceTable')
    tbl.setAttribute("border", "2");
    tbl.setAttribute("class", "table");


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

    if (tbl && bankAccounts && bankAccounts.length && bankAccounts.length == 1) {
        sourceAccountForTransfer = bankAccounts[0];
        generateTransferView();
    }
}

function generateTransferView() {
    sendMoney.innerHTML +=
        '<div id="transferView" class="card custom-container">' +
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
        '       Account number' +
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
        '      <label class="control-label requiredField" for="transactionAmount">' +
        '       Amount' +
        '       <span class="asteriskField">' +
        '        *' +
        '       </span>' +
        '      </label>' +
        '      <input class="form-control" id="transactionAmount" name="transactionAmount" type="number"/>' +
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
    const amount = document.getElementById("transactionAmount").value;
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
                        getBalanceDataForTransfer();
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