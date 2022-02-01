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
    console.log(startChoice);
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

            break;

        case 'Add a role':

            break;

        case 'Add an employee':

            break;

        case 'Update an employee role':

            break;

        case 'Quit':
            console.log('Thanks for using the Deparment Mangager!');
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
        console.table(rows);
    });
    handleStartQuest();
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    handleStartQuest()
});