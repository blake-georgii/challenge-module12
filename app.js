const db = require('./db/connection');
const inquirer = require('inquirer');

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



db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    inquirer.prompt(startQuestion)
        .then(answer => { handleStartQuest(answer) })
        .catch(err => { console.log(err) })
});