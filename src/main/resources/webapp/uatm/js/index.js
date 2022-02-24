let isUserLoggedIn = false;
let isBankConnected = false;
const restUrl = '/JS_REST_UATM/api/uatm/';
const siteUrl = '/JS_REST_UATM/uatm/';
const views = document.getElementById("views");
const tables = document.getElementById("tables");
const sendMoney = document.getElementById("viewMoneySend");
let sourceAccountForTransfer;

function getConnectedBank() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", (restUrl + 'bank-session'), false);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState > 3 && xmlhttp.status == 200) {
            isBankConnected = JSON.parse(this.responseText);
            if (!isBankConnected) {
                loadConnectBankMessage();
            } else {
                isBankConnected = true;
            }
        }
        return isBankConnected;
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

function populateBankOptions() {
    let xhttp;
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

function clearTableData() {
    if (document.contains(document.getElementById("balanceTable"))) {
        document.getElementById("balanceTable").remove();
    }
    if (document.contains(document.getElementById("transferView"))) {
        document.getElementById("transferView").remove();
    }
    if (document.contains(document.getElementById("transactionsTable"))) {
        document.getElementById("transactionsTable").remove();
    }
    if (document.contains(document.getElementById("clearTransactionButton"))) {
        document.getElementById("clearTransactionButton").remove();
    }

    if (document.contains(document.getElementById("sendMoney"))) {
        document.getElementById("sendMoney").remove();
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

function getBankAccounts() {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //4 = opgehaald, 200 = call is ok
        if (this.readyState === 4 && this.status === 200) {
            let bankAccounts = JSON.parse(this.responseText);
            if (bankAccounts && bankAccounts.length) {
                populateAccountOptions(bankAccounts);
                return bankAccounts;
            }
        }
    };
    xhttp.open("POST", (restUrl + 'bank-accounts'), true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

}

