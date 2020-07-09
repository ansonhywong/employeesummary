const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const Employees = []

const opening = [
    {
        type: "list",
        mesage: "Would you like to form a team?",
        name: "open",
        choices: ["YES", "NO"]
    }
];

const askEmployees = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your ID#?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is your role in the company?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    }
];


    const askManager = [
        {
            type: "input",
            message: "What is the Manager's Office #?",
            name: "office"
        }
    ];


const askEngineer = [
    {
        type: "input",
        message: "What is your Github?",
        name: "github"
    }
];

const askIntern = [
    {
        type: "input",
        message: "What school are you attending?",
        name: "school"
    }
];

const newMember = [
    {
        type: "list",
        message: "Would you like to add another team member?",
        name: "new",
        choices: ["YES", "NO"]
    }
];

async function makeRoster() {
  
    await inquirer
        .prompt(askEmployees)
        .then(async function (answers) {
            console.log(answers);
        
            if (answers.role === "Manager") {
                let managerReply = await inquirer
                    .prompt(askManager)
                const newManager = new Manager(answers.name, answers.id, answers.email, managerReply.office);
                Employees.push(newManager);
            }
            if (answers.role === "Engineer") {
                let engineerReply = await inquirer
                    .prompt(askEngineer)
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, engineerReply.github);
                Employees.push(newEngineer);
            }
            if (answers.role === "Intern") {
                let internReply = await inquirer
                    .prompt(askIntern)
                const newIntern = new Intern(answers.name, answers.id, answers.email, internReply.school);
                Employees.push(newIntern);
            }
           
        })


        await inquirer
        .prompt(newMember)
        .then(async function (answers) {
            if (answers.new === "YES") {
                makeRoster();
            } 
            else {
                employeeInfo = render(Employees);
                fs.writeFile("./output/team.html", employeeInfo, err => {
                    if (err) {
                        throw err;
                    } console.log("Successfully written to team.html file");
                })
            }
        })
};

makeRoster();