\c tradecraft;

INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Liz Howard', 'liz@tradecrafted.com', 'instructor', NULL, NOW() - INTERVAL '4 months');
INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Janardan Yri', 'janardan@tradecrafted.com', 'instructor', NULL, NOW() - INTERVAL '4 months');
INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Brett Hunter', 'brett@tradecrafted.com', 'instructor', NULL, NOW() - INTERVAL '4 months');
INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Graham Hunter', 'graham@tradecrafted.com', 'instructor', NULL, NOW() - INTERVAL '4 months');
INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Wen Li', 'wen@tradecrafted.com', 'wen', 'TC12', NOW() - INTERVAL '4 months');
INSERT INTO users (name, email, status, cohort, start_date) VALUES ('Troy Sultan', 'troy@tradecrafted.com', 'troy', 'TC12', NOW() - INTERVAL '4 months');


INSERT INTO assignments (title, short_notes, html_text) VALUES ('Webapp Layout', NULL, 'This is the webapp layout');
INSERT INTO assignments (title, short_notes, html_text) VALUES ('Marketing Page Layout',  NULL, 'This is the marketing layout');

INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '2 days' , 'Not Started', 1, 1, 'Just use bootstrap');
INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '3 days' , 'Not Started', 2, 1, 'Just use bootstrap again');
INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '3 days' , 'Not Started', 2, 5, 'Just use bootstrap again');
INSERT INTO students_assignments (due_date, status, assignment_id, student_id, customization_notes) VALUES (NOW() + INTERVAL '3 days' , 'Not Started', 2, 6, 'Just use bootstrap again');

INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (1, 'http://www.teaching-materials.org/htmlcss-1day/', 'Teaching-Materials HTML/CSS', 'HTML,CSS,Hosting');
INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (1, 'https://www.khanacademy.org/computing/computer-programming/html-css', 'Kahn Academy''s HTML/CSS by Pamela Fox', 'HTML,CSS');
INSERT INTO assignments_materials (assignment_id, link, description, subjects) VALUES (2, 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference', 'Mozilla Reference', 'HTML,CSS,Web Technology');




COPY community_news (id, created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter) FROM stdin;
1	2015-06-05 00:27:40.168799	1		Hacker News	f	Something mmm	http://news.ycombinator.com	hn hn hn woo	its hn
2	2015-06-05 00:39:42.524513	1	Liz Howard	Liz The Dev	t	IT's my site	http://lizthedeveloper.com	lizthedev	lizthedev
3	2015-06-05 00:46:28.63816	1	Liz Howard	TC Eng	t	Something I made early on	http://tradecraftengineering.com		
\.
