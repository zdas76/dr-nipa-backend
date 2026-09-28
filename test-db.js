const mariadb = require('mariadb');
require('dotenv').config();

console.log("Connecting to:", process.env.DATABASE_HOST, process.env.DATABASE_USER, process.env.DATABASE_NAME);

const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
});

pool.getConnection()
    .then(conn => {
        console.log("Connected successfully!");
        conn.release();
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection failed:", err);
        process.exit(1);
    });
