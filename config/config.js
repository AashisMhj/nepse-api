module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DB_NAME || "nepsi-db",
    "storage": process.env.DB_NAME || "./database.db",
    "dialect": process.env.DIALECT || "sqlite"
  }
}
