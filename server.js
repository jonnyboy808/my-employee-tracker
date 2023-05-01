const inquirer = require ('inquirer');
const fs = require ('fs');
const mysql = require('mysql2');
require('console.table')
let employees = [];
let roles = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db'
    },
    console.log('Connected to the employeeTracker_db database.')
);

const valueUpdate = () => {
    inquirer
     .prompt([
        {
            type:'list',
            name:'choiceUpdate',
            message:'Choose from the following options.',
            choices:['View all Employees', 'View Departments', 'Add Department', 'View Roles', 'Add Role', 'Update Employee Role', 'Add Employee', 'Close'
        ]
        }
     ])
     .then((answer) => {
        switch(answer.choiceUpdate){
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
        }
     });
};

const viewAllEmployees = () =>{
const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;`
db.query(query, (err, res) => {
    if (err) throw err
    console.log('All employees')
    console.table(res)
    valueUpdate()
})
};

const viewDepartments = () => {
const query = `SELECT department_name FROM employee_department`
db.query(query, (err, res) => {
    if (err) throw err
    console.log('All Departments')
    console.table(res)
    valueUpdate()
})
}

const viewRoles = () => {
    roles = []
    const query = `SELECT title FROM employee_role`
    db.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({title}) => {
            roles.push(title);
        console.log('All Roles')
        console.table(res)
        console.log(roles)
        valueUpdate()
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type:'input',
            message:'What is the first name?',
            name:'firstName'
        },

        {
            type:'input',
            message:'What is the last name?',
            name:'lastName'
        },

        {
            type:'input',
            message:'What is the employees role id?',
            name:'roleId'
        },

        {
            type:'input',
            message:'What is the employees manager id?',
            name:'managerId'
        }
    ])
    .then((answers) => {
        db.query(`INSERT INTO employee SET ?`,
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId
        },
        (err) => {
            if (err) throw err;
            console.log('Employee added')
            console.table(answers)
            valueUpdate()
        })
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
        type: 'input',
        message: 'What department should be added?',
        name: 'newDept'
        }
    ])
    .then((answers) => {
        db.query(`INSERT INTO employee_department SET ?`,
        {
            department_name: answers.newDept
        },
        (err) => {
            if (err) throw err;
            console.log('New department added')
            console.table(answers)
            valueUpdate()
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type:'input',
            message:'What role is being added?',
            name:'newRole'
        },

        {
            type:'input',
            message:'What is the salary?',
            name:'salary'
        }
    ])
    .then((answers) => {
        db.query(`INSERT INTO employee_role SET ?`,
        {
            title: answers.newRole,
            salary: answers.salary
        },
        (err) => {
            if (err) throw err;
            console.log('New role added')
            console.log(answers)
            valueUpdate()
        })
    })
}

employees = [];
    const query = `SELECT first_name FROM employee`;
    db.query(query, (err, res) => {
        if (err) throw err;
        res.forEach (({first_name}) => {
            employees.push(first_name);
        });
    });

roles = []
    const queryTwo = `SELECT title FROM employee_role`
    db.query(queryTwo, (err, res) => {
        if (err) throw err;
        res.forEach(({title}) => {
            roles.push(title);
        });
    });

    const updateEmployeeRole = () => {
        inquirer.prompt([
            {
                type:'list',
                message: 'Which employee should be added?',
                choices: employees,
                name: 'roleUpdate'
            },

            {
                type:'list',
                message: 'What role would you like?',
                choices: roles,
                name: 'newRole'
            }
        ])
        .then((answers) => {
            db.query(`UPDATE employee_role SET title = ? WHERE first_name = ?`,
            {
                title: answers.newRole,
                first_name: answers.roleUpdate
            },
            (err) => {
                if (err) throw err;
                console.log('Employee Role Updated')
                console.table(answers)
                valueUpdate
            })
        })
    }

    valueUpdate()