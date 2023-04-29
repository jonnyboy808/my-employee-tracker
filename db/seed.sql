INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Coleman', 'Atwood', 1, 3), ('Jane', 'Montiel', 2, 1), ('Marlene', 'Jacobs', 3, null), ('Eliza', 'Johnston', 4, 3), ('Steve', 'Hilbert', 5, null), ('Robert', 'Nichols' 6, null), ('Phillip', 'Kirkpatrick' 7, 6), ('Joan', 'Buckner' 3, 2);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Sales Associate', 70000, 1), ('Supervisor', 90000, 1), ('Software Engineer', 150000, 2), ('Lead Engineer', 200000, 2), ('Accountant', 120000, 3), ('Lawyer', 150000, 4), ('Legal Team Lead', 180000, 4), 