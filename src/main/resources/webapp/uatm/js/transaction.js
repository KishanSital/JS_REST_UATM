function loadTransactionsView() {
    clearView();
    viewTransaction();
}

function clear() {
    setTimeout(function () {
        document.getElementById("nothingFound").remove();
    }, 2000);
}

function viewTransaction() {
    views.innerHTML +=
        '<div class="bootstrap-iso custom-child">' +
        '<h3 class="text-center">Transaction Report</h3>' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '<input id="yearSelector" type="number" placeholder="year" style="margin-bottom: 10px" class="yearpicker" onchange="getTransactionsData()">' +
        '<select id="quarter" style="height: 25px" name="quarter" onchange="getTransactionsData()">' +
        '            <option value="">Select quarter</option>' +
        '            <option value=1>1</option>' +
        '            <option value=2>2</option>' +
        '            <option value=3>3</option>' +
        '            <option value=4>4</option>' +
        '        </select>' +
        '</div>' +
        '</div>';
    $('.yearpicker').yearpicker()

}

function getTransactionsData() {
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
                views.innerHTML +=
                    '<h4 id="nothingFound" class="text-center"></h4>';
                document.getElementById('nothingFound').innerHTML = "No transactions were found <br> So we've displayed the complete report";
                $('.yearpicker').yearpicker();
                clear();
            }

        }
    };
    xhttp.open("POST", (restUrl + 'transactions'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    let quarterSelect = document.getElementById('quarter');
    let quarterValue = quarterSelect.options[quarterSelect.selectedIndex].value;

    let yearInput = document.getElementById("yearSelector");
    let yearValue = yearInput.value;

    if (yearValue || quarterValue) {
        xhttp.send(JSON.stringify({
            "year": yearValue,
            "quarter": quarterValue
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
    tbl.setAttribute("class", "table center-table-transactions");
    tbl.setAttribute("id", "transactionsTable");
    tbl.setAttribute("style", "margin-bottom : 10px;");
    body.innerHTML +=
        '</div id="clearTransactionButton">' +
        '<div class="btn-custom-container">' +
        '<div class="bootstrap-iso btn-custom-child">' +
        '<input type="button" id="clearTransactionButton" value="Clear transaction log" class="btn btn-primary" name="clearLog" onclick="clearTransactionLog()">' +
        '</div>' +
        '</div>';
}

function clearTransactionLog() {
    const yearpicker = document.getElementById('yearSelector').value;

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            getTransactionsData();
        }
    };
    xhttp.open("DELETE", (restUrl + "clear-transactions"), true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "year": (yearpicker ? yearpicker : -1),
    }));

}
