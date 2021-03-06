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
    console.log('Connected to the employeeData database.')
);

db.connect(function (err) {
    if (err) throw err;
    // console.log('Conected db')
})

// app start function
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
// view employee table function
function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, (err, employees) => {
        console.table(employees)
        startApp();
    });
}
// view departments table function
function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, departments) => {
        console.table(departments)
        startApp();
    });
}
// view roles table function
function viewAllRoles() {
    db.query(`SELECT * FROM role`, (err, roles) => {
        console.table(roles)
        startApp();
    });
}
// add department function
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'Write the department you would like to add.',
    })
        .then(answer => {

            db.query(`INSERT INTO department (name) VALUES (?)`, (answer.department), (err, roles) => {
                console.log(`Department ${answer.department} has been added!`)
            })
            db.query(`SELECT * FROM department`, (err, res) => {
                console.table(res)
                startApp();
            })
        })
};
// add role function
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

// add new employee function
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
// update employee's role function
function manageRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'Employee first name?',
        },
        {
            type: 'input',
            name: 'last',
            message: 'Employee last Name?',
        },
        {
            type: 'input',
            name: 'newrole',
            message: 'New role id number?',
        },

    ])
        .then(answer => {
            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
            const params = [answer.newrole, answer.first, answer.last];
            db.query(sql, params, (err, rest) => {
                console.log(`${answer.first} ${answer.last}'s role has been updated`);
            })
            db.query(`SELECT * FROM employee`, (err, employees) => {
                console.table(employees)
                startApp();
            })
        });
};
// start application
startApp();