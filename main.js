import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; // Dollar
let myPin = 1980;
console.log(chalk.blueBright("\n \tWelocome to Your ATM machine :)\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin code:",
        type: "number",
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.yellowBright("\n \tYour pin code is correct!!!\n"));
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            message: "please select one option",
            type: "list",
            choices: ["withdraw", "Check Balance", "Exit"],
        },
    ]);
    if (operationAnswer.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method",
                choices: ["Fast cash", "Enter amount"],
            },
        ]);
        if (withdrawAns.withdrawMethod === "Fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Please Select Your Ammount",
                    choices: [
                        "500",
                        "1000",
                        "5000",
                        "100000",
                        "15000",
                        "250000",
                        "50000",
                    ],
                },
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.redBright("Insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.cyanBright(`${fastCashAns.fastCash} withdraw successfully :)`));
                console.log(chalk.cyanBright(`Your Remaining balance is: ${myBalance} `));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter amount") {
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter your amount to withdraw",
                    type: "number"
                },
            ]);
            if (amountAnswer.amount > myBalance)
                console.log(chalk.redBright("Insufficient Balance :("));
            myBalance -= amountAnswer.amount;
        }
        else if (operationAnswer.operation === "Check Balance") {
            console.log(chalk.cyanBright(`Your balance is ${myBalance}`));
        }
    }
    else if (operationAnswer.operation === "Exit") {
        console.log(chalk.magentaBright `\n \tThank you for using our atm service.\n \n \tALLAHHAFIZ\n`);
    }
}
else {
    console.log(chalk.redBright("Your code is incorrect :("));
}
