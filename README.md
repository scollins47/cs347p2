Dylan Moreno
Sammy Collins

TO RUN SERVER LOCALLY:
1. unzip project folder and place in htdocs folder within XAMPP
2. run XAMPP and run Apache and MySQL
3. create database as described below
4. within project folder in terminal, run
  >node server.js
5. in your browser, type localhost:3000 in the url

TO CREATE USER/MESSAGE DATABASE:
1. make sure XAMPP is running
2. type the following commands:
  >cd c:/xampp/mysql/bin

  >mysql.exe -u root

  >create database credentials

  >;

  >use credentials

  >create table Messages(

  >id int not null auto_increment primary key,

  >fromID varchar(255) not null,

  >toID varchar(255) not null,

  >message varchar(7999) not null);

  >create table user(

  >username varchar(255) not null primary key,

  >password varchar(255) not null);
3. voila! you should now be able to create users within the website

WRITEUP (FOR RICHARDS):

see extra/writeup.docx