INSERT INTO department (name)
VALUES('Sales'),
      ('Engineering'),
      ('Finance'),
      ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES('Salesn Lead', 103435, 1),
      ('Sales Person', 85734, 1),
      ('Accountant', 110838, 3),
      ('Legal Team Lead', 120933, 4), 
      ('Lead Engineering', 132737, 2),
      ('Software Engineering', 107834, 2),
      ('Lawyer', 103949, 4),
      ('Chief Financial Officer', 115456, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Johnny', 'Depp', 1, null),
      ('Silvester','Stalone', 2, null),
      ('Seth','Rogen', 3, null),
      ('Mila', 'Kunis', 4, null),
      ('Tom', 'Hanks', 5, null),
      ('Angelina', 'Jolie', 6, null),
      ('Vin', 'Diesel', 7, null),
      ('Will', 'Smith', 8, null),
      ('Brad', 'Pitt', 9, null),
      ('Diego', 'Luna', 10, null);
          



