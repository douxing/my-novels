module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "my-novels-dev",
    host: "localhost",
    dialect: "postgres"
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "my-novels-test",
    "host": "localhost",
    "dialect": "postgres"
  },
  production: {
    username: "postgres",
    password: null,
    database: "my-novels-prod",
    host: "localhost",
    dialect: "postgres"
  }
}
