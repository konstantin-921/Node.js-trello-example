My Application
================
An application for exchanging messages between users. To store information about users and messages, the PostgreSQL database is used.

Install and start
----------
```sh
npm install
npm start
```
You also need to configure the ORM Sequelize in the sequelize.js file and you need to run the PostgreSQL database.
```sh
  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  });
  ```
