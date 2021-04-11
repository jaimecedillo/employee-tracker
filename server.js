const mysql = require('mysql2');
const inquirer = require('inquirer')
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'employeeData'
    },
    console.log('Connected to the election database.')
);

db.connect(function (err) {
    if (err) throw err;
    // console.log('Conected db')
})

const startApp = () => {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all roles', 'View all Departments', 'Add a role', 'Add an Employee', 'Add Department', 'Manage employee roles', 'quit']
    })
        .then(answer => {
            switch (answer.start) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all Departments':
                    viewAllDepartments();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Manage employee roles':
                    manageRole();
                    break;
                default:
                    process.exit();
            }
        })
}

function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, employees) => {
        console.table(employees)
        startApp();
    });
}

function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, departments) => {
        console.table(departments)
        startApp();
    });
}

function viewAllRoles() {
    db.query(`SELECT * FROM role`, (err, roles) => {
        console.table(roles)
        startApp();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Write the department you would like to add.',
    })
        .then(answer => {

            db.query(`INSERT INTO department SET ?`, (answer.department), (err, roles) => {
                console.log('Department has been added!')
                startApp();
            })
        })
};

function addRole(); {
    db.query(`SELECT * FROM department`, (err, departments) => {
        const departmentChoices = departments.map((department) => {
            return { name: department.name, value: department.id }
        })
        inquirer.prompt([
            {
                name: 'role',
                type: 'input',
                message: 'Write the role you would like to add.',
            },
            {
                name: 'roleanddpt',
                type: 'list',
                message: 'Which department is this role associated with?',
                choices: departmentChoices
            }
        ])
    })

}



startApp();