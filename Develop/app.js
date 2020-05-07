const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
let team = [];

const engQuestions = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "name",
    message: "Engineer's name?"
    },
    {
    type: "input",
    name: "id",
    message: "Engineer's ID?"
    },
    {
    type: "input",
    name: "email",
    message: "Engineer's email?"
    },
    {
    type: "input",
    name: "github",
    message: "Engineer's GitHub?"
    }
    ]).then(answer => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        team.push(engineer);
        addMore();
    })
}

const internQuestions = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "name",
    message: "Intern's name?"
    },
    {
    type: "input",
    name: "id",
    message: "Intern's ID?"
    },
    {
    type: "input",
    name: "email",
    message: "Intern's email?"
    },
    {
    type: "input",
    name: "school",
    message: "Intern's school?"
    }
    ]).then(answer => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        team.push(intern);
        addMore();
    })
}

const mngrQuestions = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "name",
    message: "Manager's name?"
    },
    {
    type: "input",
    name: "id",
    message: "Manager's ID?"
    },
    {
    type: "input",
    name: "email",
    message: "Manager's email?"
    },
    {
    type: "input",
    name: "officeNumber",
    message: "Manager's office number?"
    },
    ]).then(answer => {
      const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        team.push(manager);
          addMore();
      })
}

const addMore = () => {
  inquirer.prompt({
    type: "confirm",
    name: "addMore",
    message: "Add another employee?"
  }).then(answer => {
      if (answer.addMore) {
        newEmployee();
        } 
        else {
          let html = render(team);
            fs.writeFile(outputPath, html, function (err) {
              if (err) throw err;
              console.log("Employee(s) added.");
            });
        };
    })
}


const newEmployee = () => {
  inquirer.prompt({
    type: "list",
    name: "employeeType",
    message: "Which employee type are you adding?",
    choices: ["Engineer", "Intern", "Manager"]
  })
    .then(answer => {
      switch (answer.employeeType) {
        case "Engineer":
          engQuestions();
        break;
        case "Intern":
          internQuestions();
        break;
        case "Manager":
          mngrQuestions();
        break;
      default:
        console.log("Choose an employee type");
      }
    });
}


newEmployee();
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
