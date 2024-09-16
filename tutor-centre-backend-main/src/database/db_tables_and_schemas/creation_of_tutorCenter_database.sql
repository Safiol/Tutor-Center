# CREATE DATABASE tutor_center;
# USE tutor_center ;


CREATE TABLE student (
	student_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(250) NOT NULL,
    PRIMARY KEY (student_id)
);

CREATE TABLE tutor (
	tutor_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (tutor_id)
);

CREATE TABLE session (
	session_id VARCHAR(50) NOT NULL,
    session_DATE DATE NOT NULL,                    
    session_TIME TIME NOT NULL,
    problem_summary VARCHAR(500),
    session_feedback VARCHAR(500),
    course_subject VARCHAR(50),
    PRIMARY KEY (session_id)
);

CREATE TABLE student_tutor(
	tutor_id VARCHAR(50) NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY (tutor_id, student_id),
    FOREIGN KEY (student_id)
		REFERENCES student(student_id),
	FOREIGN KEY (tutor_id)
		REFERENCES tutor(tutor_id)
);

CREATE TABLE student_session (
	session_id VARCHAR(50) NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY (student_id, session_id),
    FOREIGN KEY (student_id)
		REFERENCES student(student_id),
	FOREIGN KEY (session_id)
		REFERENCES session(session_id)
);




# ALTER USER 'root'@'localhost' IDENTIFIED BY 'fall2023';

# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fall2023';

# SELECT CURRENT_USER();

# flush privileges;