CREATE DATABASE IF NOT EXISTS university_db;

CREATE USER IF NOT EXISTS 'university_user'@'%' 
IDENTIFIED BY 'university_pass';

GRANT ALL PRIVILEGES ON university_db.* 
TO 'university_user'@'%';

FLUSH PRIVILEGES;
