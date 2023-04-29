INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Coleman', 'Atwood', 1, 3), ('Jane', 'Montiel', 2, 1), ('Marlene', 'Jacobs', 3, null), ('Eliza', 'Johnston', 4, 3), ('Steve', 'Hilbert', 5, null), ('Robert', 'Nichols' 6, null), ('Phillip', 'Kirkpatrick' 7, 6), ('Joan', 'Buckner' 3, 2);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Sales Associate', 70000, 1), ('Supervisor', 90000, 1), ('Software Engineer', 150000, 2), ('Lead Engineer', 200000, 2), ('Accountant', 120000, 3), ('Lawyer', 150000, 4), ('Legal Team Lead', 180000, 4);

INSERT INTO employee_department(department_name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('Legal');

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_department.department_name, employee_role.salary, CONCAT(manger.first_name,'', manger.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN employee_department ON employee_department.id = employee_role.department_id;

SELECT department_name FROM employee_department;

SELECT title FROM employee_role