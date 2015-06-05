DROP DATABASE tradecraft;

CREATE DATABASE tradecraft;

\c tradecraft

-- Curriculum Related Tables
CREATE TABLE curriculum (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	scheduled_date timestamp,-- literally when does this occur, a timestamp in the future or past
	workshop_id int,-- what workshop is this curriculum block
	type varchar(100)-- onboarding, launch, core a, core b, projects
);

-- what cohorts are in what curriculum 
CREATE TABLE cohort_curriculum (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	cohort_id int,
	curriculum_id int
);
-- basically curriculum blocks - the generic ones that can be moved around 
CREATE TABLE workshops ( 
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	week_offset int,
	title varchar(500), -- the title of the curriculum
	lecture_notes text,-- a link to the lecture notes
	instructor_id int-- who gives this workshop
);
-- a list of possible assignments for each workshop - students will be given these later 
CREATE TABLE workshop_assignments ( 
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	workshop_id int,
	assignment_id int
);
CREATE TABLE assignments (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	type varchar(300), -- type is whether it is assignment pre-work, or is post-work, or is a tutorial
	title text, -- HTML/CSS, forms, memory management, etc
	html_text text,
	short_notes text,
	optional boolean DEFAULT true
);

-- emails that go out reminding people about assignments, giving out assignments, and pretending to be founders if they are scenerios (
CREATE TABLE assignments_emails (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	assignment_id int,
	start_offset int, -- how many days from the beginning of TC
	from_email varchar(300),
	subject text,
	html_body text,
	reply_to varchar(300)
);

-- each student should be given assignments that are customized for them, also created and due (
CREATE TABLE students_assignments ( 
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	due_date timestamp,
	status varchar(300),
	assignment_id int,
	student_id int,
	customization_notes text
);
CREATE TABLE assignments_materials (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	assignment_id int,
	link text,
	description text,
	subjects text
);


-- Student and Accounts tables
CREATE TABLE cohorts ( 
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	generation varchar(40), -- tc12, tc13, etc
	week_offset int -- how many weeks after "true" did they start (true is 12 and 16 etc)
);
CREATE TABLE users (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	name varchar(300),
	email varchar(300),
	google_auth_token varchar(300),
	status varchar(300),
	cohort varchar(40),
	start_date timestamp
);

-- Internal Tradecraft News Table - like for announcements
CREATE TABLE news (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	title text,
	body text
);

CREATE TABLE community_news (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	submitter_id int,
	author text,
	title text,
	submitter_is_author boolean,
	description text,
	link text,
	fb text,
	twitter text
);

CREATE TABLE community_news_votes (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	user_id int,
	submission_id int,
	vote boolean
);

CREATE TABLE community_news_comments (
	id serial PRIMARY KEY,
	created timestamp DEFAULT NOW(),
	user_id int,
	submission_id int,
	title text,
	comment text,
	flagged boolean
);
