function loadBalanceView() {
    clearView();
    getConnectedBank();
    if (isBankConnected) {
        viewBalance();
        getBankAccounts();
    }

}


function viewBalance() {
    views.innerHTML +=
        '<div class="bootstrap-iso">' +
        '<h3 class="text-center">Bank balance</h3>' +
        '<div class="custom-child">' +
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
}

function getBalanceData(value) {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                generateBalanceTable(bankAccounts);
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

function generateBalanceTable(bankAccounts) {

    clearTableData();

    // get the reference for the body
    var body = tables;

    // creates a <table> element and a <tbody> element


    var tbl = document.createElement("table");
    tbl.setAttribute('id', 'balanceTable')
    tbl.setAttribute("border", "2");
    tbl.setAttribute("class", "table center-table-transactions");

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

}
