## Structure
* MySql
* React application (in /front)
* Express application (in /back)

## Setup
* You need an instance of MySql running at Localhost on port 3306
* run ./import.sh from within the dbscripts folder to create the user and tables
    * This creates a schema and user called 'Bealy', so there may be a conflict if you already have such resources in your DB.
* run 'npm i' from /back
* run 'npm i' from /front

## Running locally
* Start the Express server from within /back with 'npm run start'
    * The server starts on localhost:3001
* Start the React application from within /front with 'npm run start'
    * The application can be found in a browser at http://localhost:3000

## Assumptions
* Sequelize is not a hard requirement
    * This ORM is notoriously buggy and currently has 877 open issues on Github.
    * Given the timelines, two hours dedicated to getting it working seems adequate to judge it not fit for immediate purpose.
    * For the moment, there's a DAL which uses raw SQL and a MySQL connection pool. This could obviously be replaced with an ORM without changing the DAL API.
* Refresh tokens are not a requirement for MVP
* The database is employed for file storage
    * With the given topology and technology this is the only distributed file storage mechanism to hand.
* Most error-handling is not done for MVP, particularly client-side.

