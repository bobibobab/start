
var totals = [];
var datas = [];
var total = 0;
// putting the current date.
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

var formattedDate = year + "-" + (month < 10? '0' : '') + month + "-" + (day < 10? '0': '') + day;

var dateElement = document.querySelector('.Date h1');

dateElement.innerHTML = formattedDate;

// adding the username on the top of the page.
var username = localStorage.getItem("userName");
var naming = document.querySelector('.Date h3');
//var userInfo = localStorage.getItem("username");
var newUser = JSON.parse(username);
naming.innerHTML = "Welcome to " + newUser["username"];

var myChart = null;

// data of totalData
const totalData = {
    "rank": 0,
    "username": newUser["username"],
    "total" : 0
}


// Data for the xvalue.
const dict = {
    "income": 0,
    "food": 0,
    "fixedExpenses": 0,
    "traffic": 0,
    "other": 0,
}

const x = ["income", "food", "fixedExpenses", "traffic", "other",];
const y = [];

totals.push(totalData);

function addRowForOther(table,item, price) {
    

    var newRow = table.insertRow(-1);

    var itemCell = newRow.insertCell(0);
    var priceCell = newRow.insertCell(1);

    itemCell.textContent = item;
    priceCell.textContent = price;
}

function drawChart(x, y) {
    
    var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
    ];

    myChart = new Chart("totalChart", {
        type: "pie",
        data: {
            labels: x,
            datasets: [{
                backgroundColor: barColors,
                data: y
            }]
        },
        options: {
            title: {
                display: true,
                text: "Total Consumption for this month"
            }
        }
    });
}

function deleteChart(){
    if(myChart){
        myChart.destroy();
        myChart = null;
    }
    
}

document.getElementById("otherTableButton").addEventListener("click", async function () {
    var item = document.getElementById("otherItem").value;
    var price = document.getElementById("otherPrice").value;
    var table = document.getElementById("otherTable");
    const data = {
        "type": null,
        "month": month,
        "price": 0,
    }

    data["type"] = "other";
    data["price"] = price;

    const comsumption_res = await fetch('/api/comsumption', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    const datas_res = await fetch('/api/datas');
    datas = await datas_res.json();

    localStorage.setItem("Data", JSON.stringify(datas));
    addRowForOther(table, item, price);
    addvalue("other", price);
    makeArray(dict);
    deleteChart();
    drawChart(x, y);

    //Websocket thing
    totalData["total"] = Number(price);
    
    const response = await fetch(`/api/total/${totalData.username}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(totalData),
    });

    const res = await fetch('/api/totals');
    var total = await res.json();
   
    localStorage.setItem("webSocket", JSON.stringify(total));
});

document.getElementById("foodTableButton").addEventListener("click", async function () {
    var item = document.getElementById("foodItem").value;
    var price = document.getElementById("foodPrice").value;
    var table = document.getElementById("foodTable");
    const data = {
        "type": null,
        "month": month,
        "price": 0,
    }
    data["type"] = "food";
    data["price"] = price;
    const comsumption_res = await fetch('/api/comsumption', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    const datas_res = await fetch('/api/datas');
    datas = await datas_res.json();

    localStorage.setItem("Data", JSON.stringify(datas));
    addRowForOther(table, item, price);
    addvalue("food", price);
    makeArray(dict);
    deleteChart();
    drawChart(x, y);
    

    //Websocket thing
    totalData["total"] = Number(price);
    const response = await fetch(`/api/total/${totalData.username}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(totalData),
    });
    const res = await fetch('/api/totals');
    var total = await res.json();

    localStorage.setItem("webSocket", JSON.stringify(total));
});

document.getElementById("trafficTableButton").addEventListener("click", async function () {
    var item = document.getElementById("trafficItem").value;
    var price = document.getElementById("trafficPrice").value;
    var table = document.getElementById("trafficTable");
    const data = {
        "type": null,
        "month": month,
        "price": 0,
    }
    data["type"] = "traffic";
    data["price"] = price;
    const comsumption_res = await fetch('/api/comsumption', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    const datas_res = await fetch('/api/datas');
    datas = await datas_res.json();
    localStorage.setItem("Data", JSON.stringify(datas));
    addRowForOther(table, item, price);
    addvalue("traffic", price);
    makeArray(dict);
    deleteChart();
    drawChart(x, y);
   
    
    //Websocket thing
    totalData["total"] = Number(price);
    const response = await fetch(`/api/total/${totalData.username}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(totalData),
    });

    const res = await fetch('/api/totals');
    var total = await res.json();

    localStorage.setItem("webSocket", JSON.stringify(total));
});

document.getElementById("fixedExpensesTableButton").addEventListener("click", async function () {
    var item = document.getElementById("fixedExpensesItem").value;
    var price = document.getElementById("fixedExpensesPrice").value;
    var table = document.getElementById("fixedExpensesTable");
    const data = {
        "type": null,
        "month": month,
        "price": 0,
    }
    data["type"] = "fixedExpenses";
    data["price"] = price;
    const comsumption_res = await fetch('/api/comsumption', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    const datas_res = await fetch('/api/datas');
    datas = await datas_res.json();

    localStorage.setItem("Data", JSON.stringify(datas));
    addRowForOther(table, item, price);
    addvalue("fixedExpenses", price);
    makeArray(dict);
    deleteChart();
    drawChart(x, y);

    //Websocket thing
    totalData["total"] = Number(price);
    const response = await fetch(`/api/total/${totalData.username}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(totalData),
    });
    
    const res = await fetch('/api/totals');
    var total = await res.json();

    localStorage.setItem("webSocket", JSON.stringify(total));
});

document.getElementById("incomeTableButton").addEventListener("click", async function () {
    var item = document.getElementById("incomeItem").value;
    var price = document.getElementById("incomePrice").value;
    var table = document.getElementById("incomeTable");
    const data = {
        "type": null,
        "month": month,
        "price": 0,
    }
    data["type"] = "income";
    data["price"] = price;
    const comsumption_res = await fetch('/api/comsumption', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    const datas_res = await fetch('/api/datas');
    datas = await datas_res.json();

    localStorage.setItem("Data", JSON.stringify(datas));
    addRowForOther(table, item, price);
    addvalue("income", price);
    makeArray(dict);
    deleteChart();
    drawChart(x, y);

    //Websocket thing
    totalData["total"] = Number(price);
    const response = await fetch(`/api/total/${totalData.username}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(totalData),
    });

    const res = await fetch('/api/totals');
    var total = await res.json();

    localStorage.setItem("webSocket", JSON.stringify(total));
});



function addvalue(item, price){
    if (item === "income"){
        dict["income"] += Number(price);
    } else if (item === "food") {
        dict["food"] += Number(price);
    } else if (item === "fixedExpenses") {
        dict["fixedExpenses"] += Number(price);
    } else if (item === "traffic") {
        dict["traffic"] += Number(price);
    } else if (item === "other") {
        dict["other"] += Number(price);
    }
}

function makeArray(dict){
    y[0] = (dict["income"]);
    y[1] = (dict["food"]);
    y[2] = (dict["fixedExpenses"]);
    y[3] = (dict["traffic"]);
    y[4] = (dict["other"]);
}




