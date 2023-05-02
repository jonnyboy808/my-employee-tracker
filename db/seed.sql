INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Phillip', 'Kirkpatrick', 7, 2), ('Robert', 'Nichols', 6, null), ('Marlene', 'Jacobs', 1, 4), ('Jane', 'Montiel', 2, null), ('Joan', 'Buckner', 4, 7), ('Eliza', 'Johnston', 4, 7), ('Coleman', 'Atwood', 3, null), ('Steve', 'Hilbert', 5, null);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Sales Associate', 70000, 1), ('Supervisor', 90000, 1), ('Lead Engineer', 250000, 2), ('Software Engineer', 150000, 2), ('Accountant', 120000, 3), ('Recruiting Team Lead', 180000, 4), ('Recruiter', 150000, 4);

INSERT INTO employee_department(department_name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('HR');

-- Left join and inner joins to create view all table 
SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;

SELECT department_name FROM employee_department;

SELECT title FROM employee_role;

SELECT id, department_name
FROM employee_department;

SELECT employee_role.title, employee_role.id, employee_department.department_name, employee_role.salary
FROM employee_role
INNER JOIN employee_department ON employee_role.department_id = employee_department.id;
