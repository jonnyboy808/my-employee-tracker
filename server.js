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
                ViewAllEmployees();
                break;
            case 'View Departments':
                ViewDepartments();
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

const ViewAllEmployees = () =>{
const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manger.first_name,'', manger.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;`
Connection.query(query, (err, res) =>{
    if (err) throw err
    console.log('View all employees')
    console.table(res)
    valueUpdate()
})
}

