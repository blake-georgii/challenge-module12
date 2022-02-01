INSERT INTO departments(depo_name) 
VALUES ('test depo');

INSERT INTO roles(title, salary, department_id) 
VALUES ('test title', 100, 1);

INSERT INTO employees(first_name, last_name, roles_id, manager_id) 
VALUES ('test first', 'test last', 1, 1);
