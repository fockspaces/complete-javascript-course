let Mark_m = 78;
let Mark_h = 1.69;
let John_m = 92;
let John_h = 1.95;

let Mark_BMI = Mark_m / Mark_h**2;
let John_BMI = John_m / John_h**2;

let markHigherBMI = Mark_BMI > John_BMI;
if(markHigherBMI)
{
    console.log(`Mark\'s BMI ${Mark_BMI.toFixed(2)} is higher than John\'s!`);
}
else
{
    console.log(`ohn's BMI (${John_BMI.toFixed(2)})is higher than Mark's!`);
}