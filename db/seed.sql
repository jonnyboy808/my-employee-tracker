INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Coleman', 'Atwood', 6, null), ('Jane', 'Montiel', 2, null), ('Marlene', 'Jacobs', 5, null), ('Eliza', 'Johnston', 7, 1), ('Steve', 'Hilbert', 4, 7), ('Robert', 'Nichols', 1, 2), ('Phillip', 'Kirkpatrick', 3, null), ('Joan', 'Buckner', 4, 7);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Sales Associate', 75000, 1), ('Supervisor', 90000, 1), ('Lead Engineer', 250000, 2), ('Software Engineer', 160000, 2), ('Accountant', 120000, 3), ('Recruiter Team Lead', 180000, 4), ('Recruiter', 150000, 4);

INSERT INTO employee_department(department_name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('HR');

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manager.first_name, manager.last_name) AS manager
FROM employee 
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;

SELECT department_name FROM employee_department;

SELECT title FROM employee_role;