function loadTransactionsView() {
    clearView();
    viewTransaction();
}

function viewTransaction() {
    views.innerHTML +=
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Transactions</h3>' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '<input type="text" form class="form-control" name="datepicker" id="datepicker" onchange="getTransactionsData(this.value)"/>' +
        '</div>' +
        '</div>';
    $(document).ready(function(){
        $("#datepicker").datepicker({
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            autoclose:true
        });
    })
}

function getTransactionsData(value) {

    console.log(value);

    clearTableData();
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                generateTable(bankAccounts);
            } else {
                views.innerHTML =
                    '<div class="card custom-container">' +
                    '<div class="bootstrap-iso custom-child">' +
                    '<h3 class="text-center">Transactions</h3>' +
                    '<h4 class="text-center">No transactions were found for.</h4>' +
                    '</div>' +
                    '</div>';
            }
        }
    };
    xhttp.open("GET", (restUrl + 'transactions'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if (value) {
        xhttp.send(JSON.stringify({
            "year": +value
        }));
    } else {
        xhttp.send();
    }

}

function generateTable(transactions) {

    // get the reference for the body
    var body = tables;

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
    tbl.setAttribute("id", "transactionsTable");
    body.innerHTML +=
        '</div id="clearTransactionButton">' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '<input type="button" id="clearTransactionButton" value="Clear transaction log" class="btn btn-primary" name="clearLog" onclick="clearTransactionLog()">' +
        '</div>' +
        '</div>';
}

function clearTransactionLog() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            getTransactionsData();
        }
    };
    xhttp.open("DELETE", (restUrl + 'clear-transactions'), true);
    xhttp.send();
}