INSERT INTO departments(name) 
VALUES ('test depo');

INSERT INTO roles(name, title, salary, department_id) 
VALUES ('test role', 'test title', 'test salary', 1);

INSERT INTO employees(first_name, last_name, roles_id, manager_id) 
VALUES ('test first', 'test last', 1, 1);
