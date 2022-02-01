const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const startQuestion = [
    {
        type: 'list',
        name: 'answer',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit', new inquirer.Separator()]
    }
];

async function handleStartQuest() {
    const startChoice = await inquirer.prompt(startQuestion);
    switch (startChoice.answer) {
        case 'View all departments':
            viewAllDepos();
            break;

        case 'View all roles':
            viewAllRoles();
            break;

        case 'View all employees':
            viewAllEmployees();
            break;

        case 'Add a department':
            addDepo();
            break;

        case 'Add a role':
            addRole();
            break;

        case 'Add an employee':
            break;

        case 'Update an employee role':

            break;

        case 'Quit':
            console.log('Thanks for using the Department Manager!');
            break;
    }
}

function viewAllDepos() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n");
        console.table(rows);
    });
    handleStartQuest();
}

function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n");
        console.table(rows);
    });
    handleStartQuest();
}

function viewAllEmployees() {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n");
        console.table(rows);
    });
    handleStartQuest();
}

async function addDepo() {
    const newDepo = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }]);

    const sql = `INSERT INTO departments(depo_name) VALUES (?)`;
    db.query(sql, newDepo.name, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n" + `Added ${newDepo.name} to departments`);
    });
    handleStartQuest();
}

async function addRole() {
    db.execute('SELECT * FROM departments', (err, res) => {
        console.log("\n")
        console.table(res);
    });
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            message: `Input department id the new role belongs to `,
            name: 'roleDepartment',
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
    ]);

    const params = [newRole.title, parseFloat(newRole.salary), parseInt(newRole.roleDepartment)]

    const sql = `INSERT INTO roles(title, salary, department_id)  VALUES (?, ?, ?)`;
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n" + `Added ${newRole.title} to departments`);
    });

    handleStartQuest();
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    handleStartQuest()
});