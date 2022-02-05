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
            addEmployee();
            break;

        case 'Update an employee role':
            updateEmployee();
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
        console.log("\n" + `Added ${newRole.title} to roles list`);
    });

    handleStartQuest();
}
//first name, last name, role, and manager
async function addEmployee() {
    db.execute('SELECT * FROM employees', (err, res) => {
        console.log("\n")
        console.table(res);
    });

    db.execute('SELECT * FROM roles', (err, res) => {
        console.log("\n")
        console.table(res);
    });

    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: `Input id of new employee's manager from above`,
            
        },
        {
            type: 'input',
            name: 'roles_id',
            message: `Input id of new employee's role from list above`
        },
        {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's last name?`
        }
    ]);

    const params = [newEmployee.first_name, newEmployee.last_name, newEmployee.roles_id, newEmployee.manager_id];

    const sql = `INSERT INTO employees(first_name, last_name, roles_id, manager_id)  VALUES (?, ?, ?, ?)`;

    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n" + `Added ${newEmployee.first_name} ${newEmployee.last_name} to employee list`);
    });

    handleStartQuest();
}

async function updateEmployee(){
    db.execute('SELECT * FROM employees', (err, res) => {
        console.log("\n")
        console.table(res);
    });

    db.execute('SELECT * FROM roles', (err, res) => {
        console.log("\n")
        console.table(res);
    });

    const newEmployeeRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `Input employee Id you would like to update from list above: `,
            
        },
        {
            type: 'input',
            name: 'roles_id',
            message: `Input the new role Id from list above:`
        }
    ]);

    const params = [newEmployeeRole.roles_id, newEmployeeRole.id];

    const sql = `UPDATE employees SET roles_id = ? WHERE id = ?`;

    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n" + `Updated Employee`);
    });

    handleStartQuest();
}

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    handleStartQuest()
});