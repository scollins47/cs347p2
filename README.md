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

For this project we chose to teach students how to play poker (Texas Hold'em, specifically). We chose this because, while we love Poker ourselves, it gave us an
opportunity to think empathetically by putting ourselves in the shoes of people who have never played poker before. This gave us the tricky challenge of designing
an interesting but simple website that makes it easy for new players to learn. The 'simple' aspect to our website design was the most difficult--it can be challenging
to lay out all the information we want to while still making it user-friendly.

Met expectations:
  We met every expectation entirely.
Unmet expectations:
  There were no unmet expectations.
Above and beyond:
  We went above and beyond by using many css specifications to get our website looking *good* (in our opinion). Most amateur websites you see do not look nearly as
  good as ours. Also, we knew exactly what units to use, and we even used 'flex'. We went above and beyond in many ways.
Hour count:
  15 hours each member (30 hours total)
Grade anticipated:
  We both believe that we deserve A's on this project, at minimum 93s. Not only did we work really hard and spend a lot of time on this, but we also met every expectation, went above and beyond, and we put love into it.
