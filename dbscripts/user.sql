drop user Bealy@localhost;
flush privileges;
CREATE USER 'Bealy'@'localhost' IDENTIFIED BY 'Bealy';
GRANT ALL PRIVILEGES ON `bealy` . * TO 'Bealy'@'localhost';