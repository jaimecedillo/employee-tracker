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
    console.log('Conected db')
})

const startApp = () => {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all roles', 'View all Departments', 'Add a role', 'Add an Employee', 'Manage employee roles'
        ]
    })
}



startApp();


db.query(`SELECT * FROM employee`, (err, employees) => {
    console.table(employees)
});


db.query(`SELECT * FROM role`, (err, roles) => {
    console.table(roles);
});


db.query(`SELECT * FROM department`, (err, depts) => {
    console.table(depts);
});



