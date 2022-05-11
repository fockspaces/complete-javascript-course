let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
tips = [];
total = [];
function calcTip (bill)
{
    return (bill >= 50 && bill <= 300) ? bill*0.15 : bill*0.2;
}

for(let i=0; i<bills.length; i++)
{
    tips[i] = calcTip(bills[i]);
    total[i] = tips[i] + bills[i];
}
console.log(total);

function calcAverage(total)
{
    let sum = 0;
    for(let i = 0; i < total.length; i++) sum += total[i];
    return sum / total.length; 
}
console.log(calcAverage(total));