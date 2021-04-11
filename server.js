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
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all roles', 'View all Departments', 'Add a role', 'Add an Employee', 'Add Department', 'Manage employee roles', 'Quit']
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
        type: 'input',
        name: 'department',
        message: 'Write the department you would like to add.',
    })
        .then(answer => {

            db.query(`INSERT INTO department SET ?`, (answer.department), (err, roles) => {
                console.log(`Department ${answer.department} has been added!`)
                startApp();
            })
        })
};

function addRole() {
    db.query(`SELECT * FROM department`, (err, departments) => {
        const departmentChoices = departments.map((department) => {
            return { name: department.name, value: department.id }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Write the role you would like to add.',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department is this role associated with?',
                choices: departmentChoices
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary for this position',
            }
        ])

            .then(answer => {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
                const params = [answer.role, answer.salary, answer.department];
                db.query(sql, params, (err, res) => {
                    console.log(`New role ${answer.role} has been added`);
                })
                db.query(`SELECT * FROM role`, (err, roles) => {
                    console.table(roles)
                    startApp();
                })
            })
    })
};


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'First name?',
        },
        {
            type: 'input',
            name: 'last',
            message: 'Last Name?',
        },
        {
            type: 'input',
            name: 'roleid',
            message: 'Role id number?',
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the manager's id?",
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`;
            const params = [answer.first, answer.last, answer.roleid, answer.manager];
            db.query(sql, params, (err, rest) => {
                console.log(`${answer.first} ${answer.last} has been added`);
            })
            db.query(`SELECT * FROM employee`, (err, employees) => {
                console.table(employees)
                startApp();
            })
        })
}



startApp();