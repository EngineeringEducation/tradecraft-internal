\c tradecraft;

INSERT INTO students (name, email, status, cohort, start_date) VALUES ('Liz Howard', 'liz@tradecrafted.com', 'student', 'TC12', NOW() - INTERVAL '4 months');
INSERT INTO students (name, email, status, cohort, start_date) VALUES ('Janardan Yri', 'janardan@tradecrafted.com', 'student', 'TC12', NOW() - INTERVAL '4 months');
INSERT INTO students (name, email, status, cohort, start_date) VALUES ('Brett Hunter', 'brett@tradecrafted.com', 'student', 'TC12', NOW() - INTERVAL '4 months');


INSERT INTO assignments (title, short_notes, html_text) VALUES ('Webapp Layout', NULL, 'This is the webapp layout');
INSERT INTO assignments (title, short_notes, html_text) VALUES ('Marketing Page Layout',  NULL, 'this is the marketing layout');

INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '2 days' , 'Not Started', 1, 1, 'Just use bootstrap');
INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '3 days' , 'Not Started', 2, 1, 'Just use bootstrap again');

INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (1, 'http://www.teaching-materials.org/htmlcss-1day/', 'Teaching-Materials HTML/CSS', 'HTML,CSS,Hosting');
INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (1, 'https://www.khanacademy.org/computing/computer-programming/html-css', 'Kahn Academy''s HTML/CSS by Pamela Fox', 'HTML,CSS');
INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (2, 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference', 'Mozilla Reference', 'HTML,CSS,Web Technology');