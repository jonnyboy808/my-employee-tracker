DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- employee table
CREATE TABLE employees (
    id INT(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT (10),
    manager_id INT (10),
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL (7,2), 
    department_id INT (10),
    PRIMARY KEY (id)
);

CREATE TABLE employee_department (
    id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
)

