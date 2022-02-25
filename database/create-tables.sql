DROP TABLE IF EXISTS submission_subjects;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS institutions;
CREATE TABLE institutions (id char(36) PRIMARY KEY,name varchar(100),address varchar(255),country varchar(50),region varchar(50));
CREATE TABLE submissions (id char(36) PRIMARY KEY,institution_id char(36),year integer,students_total integer,undergraduates_total integer,postgraduates_total integer,staff_total integer,academic_papers integer,institution_income integer, CONSTRAINT fk_institution FOREIGN KEY(institution_id) REFERENCES institutions(id));
CREATE TABLE submission_subjects (id char(36) PRIMARY KEY,submission_id char(36),name varchar(50),academic_papers integer,students_total integer,student_rating numeric(2,1), CONSTRAINT fk_submission FOREIGN KEY(submission_id) REFERENCES submissions(id));