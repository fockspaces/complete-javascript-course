// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new 
// gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so 
// one average score per team).
// A team only wins if it has at least double the average score of the other team. 
// Otherwise, no team wins!
// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team 
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner 
// to the console, together with the victory points, according to the rule above. 
// Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and 
// Data 2
// 5. Ignore draws this time
const calcAverage = ([s1, s2, s3]) => {
    return (s1 + s2 + s3) / 3;
}
function checkWinner (Dolphins, Koalas) {
    const avgDolhins = calcAverage(Dolphins).toFixed(2);
    const avgKoalas = calcAverage(Koalas).toFixed(2);
    if(avgDolhins > 2 * avgKoalas) {
        return `Dolhins win (${avgDolhins} vs. ${avgKoalas})`;
    }
    else if(avgKoalas > 2 * avgDolhins) {
        return `Koalas win (${avgKoalas} vs. ${avgDolhins})`;
    }
    else return 'no team wins!';
}
// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49

let Dolphins = [144, 223, 71];
let Koalas = [65, 54, 49];


console.log('test 1 : ', checkWinner(Dolphins, Koalas))

// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Dolphins = [14, 23, 71];
Koalas = [65, 154, 49];
console.log('test 2 : ', checkWinner(Dolphins, Koalas))