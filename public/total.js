
var totals = JSON.parse(localStorage.getItem("webSocket"));
addTotal(totals);

function calculateRanking(totals){

    totals.sort(function(a, b){
        return b.total - a.total;
    });

    for (var i = 0; i < totals.length; i ++){
        totals[i]["rank"] = i + 1;
    }
}
function addRowTotalRank(table, totals) {
    var table = document.getElementById("totalTable");
    if (table) {
        console.log("Table found!");
    } else {
        console.log("Table not found!");
    }
    calculateRanking(totals);

    console.log("adding process");
    for (var i = 0; i < totals.length; i++) {
        var newRow = table.insertRow(-1);

        var rankCell = newRow.insertCell(0);
        var userCell = newRow.insertCell(1);
        var totalCell = newRow.insertCell(2);

        rankCell.textContent = totals[i]["rank"];
        userCell.textContent = totals[i]["username"];
        totalCell.textContent = totals[i]["total"];
    }
}

export function addTotal(totals){
    var table = document.getElementById("totalTable");
    if (table) {
        console.log("Table found!");
    } else {
        console.log("Table not found!");
    }
    addRowTotalRank(table, totals);
}


    