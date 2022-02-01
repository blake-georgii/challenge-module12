const db = require('./db/connection');
const inquirer = require('inquirer');

const originalQuestion = [
    {
        type: 'list',
        name: 'originalChoice',
        message: 'Day:',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
];





db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    inquirer.prompt(originalQuestion)
        .then(answer => { console.log(answer)})
        .catch(err => { console.log(err) })
});