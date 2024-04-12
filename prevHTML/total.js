var totals = JSON.parse(localStorage.getItem("webSocket"));
addTotal(totals);

function calculateRanking(totals){

    for (var i = 0; i < totals.length; i ++){
        totals[i]["rank"] = i + 1;
    }
}
function addRowTotalRank(table, totals) {
    var table = document.getElementById("totalTable");
    
    calculateRanking(totals);
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
    addRowTotalRank(table, totals);
}




    