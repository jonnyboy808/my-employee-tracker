const inquirer = require ('inquirer');
const fs = require ('fs');
const mysql = require('mysql2');

const db =mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db database.')
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
        switch(answer.valueUpdate){
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
const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manger.first_name,'', manger.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;`
connection.query(query, (err, res) => {
    if (err) throw err
    console.log('All employees')
    console.table(res)
    valueUpdate()
})
};

const viewDepartments = () => {
const query = `SELECT department_name FROM employee_department`
connection.query(query, (err, res) => {
    if (err) throw err
    console.log('All Departments')
    console.table(res)
    valueUpdate()
})
}

const viewRoles = () => {
    roles = []
    const query = `SELECT title FROM employee_role`
    connection.query(query, (err, res) => {
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
        },
    ])
    .then((answers) => {
        connection.query(`INSERT INTO employee set ?`,
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId
        },
        (err) => {
            if (err) throw err;
            console.log('Employee added')
            console.log(answers)
            valueUpdate()
        })
    })
};
