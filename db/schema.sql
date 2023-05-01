DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- table for employees
CREATE TABLE employee (
id INT(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT(11),
manager_id INT(11),
PRIMARY KEY (id) 
);

-- table for employee roles
CREATE TABLE employee_Role (
id INT(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT(11),
PRIMARY KEY (id) 
);

-- table for employee department 
CREATE TABLE employee_department(
id INT(11) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY (id) 
);