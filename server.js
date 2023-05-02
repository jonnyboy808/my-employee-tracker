const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
require('console.table');

let employees = [];
let roles = [];

// creates a connection to the employee_tracker_db database
// Also console logs the connected database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker_db'
},
console.log('Connected to the employee_tracker_db database.')
);

// function to prompt choice questions
const valueUpdate = () => {
    inquirer
     .prompt ([
        {
            type: 'list',
            name: 'choiceUpdate',
            message: "Please select an option.",
            choices:['View all Employees', 'View Departments', 'Add Departments', 'View Roles', 'Add Roles', 'Update Employee Role', 'Add Employee', 'Exit Application']
        }
    ])
    // allows each choice to be called for use
    .then((answer) => {
      switch(answer.choiceUpdate){
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'View Departments':
          viewDepartments();
          break;
          case 'Add Departments':
          addDepartment();
          break; 
        case 'View Roles':
          viewRoles();
          break;  
        case 'Add Roles':
            addRoles();
            break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Exit Application':
          console.log('Exiting the database...');
          process.exit();
      }      
    }); 
};
// function that displays all employee information in a table
const viewAllEmployees = () =>{
  const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
  FROM employee 
  LEFT JOIN employee manager ON manager.id = employee.manager_id
  INNER JOIN employee_role ON employee.role_id = employee_Role.id
  INNER JOIN employee_department ON employee_department.id = employee_role.department_id`;
  connection.query(query, (err, res) =>{
      if (err) throw err;
      console.log('Viewing all employees');
      console.table(res);
      valueUpdate();
     });
  };
// function display all departments
const viewDepartments = () => {
  const query = `SELECT id, department_name
  FROM employee_department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('Viewing all departments');
    console.table(res);
    valueUpdate();
  });
};
// function to add new department
const addDepartment = () =>{
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter the new department.',
        name: 'newDept'
      }
    ])
    .then((answers) => {
      connection.query(`INSERT INTO employee_department SET ?`,
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
//  function display all roles
const viewRoles = () => {
  roles = [];
  const query = `SELECT employee_role.title, employee_department.department_name, employee_role.id
  FROM employee_role
  INNER JOIN employee_department ON employee_role.department_id = employee_department.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({title}) => {
      roles.push(title);
    });
    console.log('Viewing all roles');
    console.table(res);
    valueUpdate();
    });  
};
// function to add new role
const addRoles = () =>{
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter the new role.',
        name: 'newRole'
      },
      {
        type: 'input',
        message: 'Enter the salary for the new role.',
        name: 'salary'
      }
    ])
    .then((answers)=> {
      connection.query(`INSERT INTO employee_role SET ?`,
      {
        title: answers.newRole,
        salary: answers.salary
      },
      (err) => {
        if (err) throw err;
        console.log('New role added')
        console.table(answers)
        valueUpdate()
      })
    })
  };
// function updates employee role 
const updateEmployeeRole = () => {
    inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee should be updated?',
      choices: employees,
      name: 'roleUpdate'
    },
    {
      type: 'list',
      message: 'What should be the new role?',
      choices: roles,
      name: 'newRole'
    }
  ])
  .then((answers)=>{
    connection.query(`UPDATE employee_role SET title = ? WHERE first_name = ?`,
    {
      title: answers.newRole,
      first_name: answers.roleUpdate
    },
    (err) => {
     if (err) throw err;
     console.log('Employee role updated')
     console.table(answers)
     valueUpdate()
    })
  });
};
// function to add new employee
const addEmployee = () => {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter employees first name.',
      name: 'firstName'
    },
    { 
      type: 'input',
      message: 'Please enter employees last name.',
      name: 'lastName'
    },
    {
      type: 'input',
      message: 'What is employees role id?',
      name: 'roleId'
    },
    {
      type: 'input',
      message: 'What is employees manager id?',
      name: 'managersId'
    }
  ])
  .then((answers) => {
    connection.query(`INSERT INTO employee SET ?`,
    {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: answers.roleId,
      manager_id: answers.managersId
    },
    (err) => {
      if (err) throw err;
      console.log('Employee Added')
      console.table(answers)
      valueUpdate()
    })
  })
};
// push into empty employee array 
employees = [];
   const query = 'SELECT first_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({first_name}) => {
            employees.push(first_name);
        });
    });
// push into empty roles array 
roles = [];
    const queryTwo = `SELECT title FROM employee_role`
    connection.query(queryTwo, (err, res) => {
      if (err) throw err;
      res.forEach(({title}) => {
        roles.push(title);
    });
 });

valueUpdate()