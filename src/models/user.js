const config = require('../config/config');
const mysql = require('mysql2');

// Kết nối đến cơ sở dữ liệu
const db = mysql.createConnection(config.database);
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

const User = {
    checkEmailExists: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    },
    checkPhoneNumberExists: (phone_number) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE phone_number = ?';
            db.query(sql, [phone_number], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    },

    checkUsernameExists: (username) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username = ?';
            db.query(sql, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    },
    createUser: (userData) => {
        const { first_name, last_name, email, address, phone_number, username, password } = userData;
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users (first_name, last_name, email, address, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [first_name, last_name, email, address, phone_number, username, password], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    },
    findUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username = ?';
            db.query(sql, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
};
module.exports = User;
