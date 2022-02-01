const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const startQuestion = [
    {
        type: 'list',
        name: 'startChoice',
        message: 'Day:',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
];

function handleStartQuest({ startChoice }) {

    switch (startChoice) {
        case 'View all departments':
            viewAllDepo();
            break;

        case 'View all roles':

            break;

        case 'View all employees':

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

function viewAllDepo() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
    });
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    inquirer.prompt(startQuestion)
        .then(answer => { handleStartQuest(answer) })
        .catch(err => { console.log(err) })
});