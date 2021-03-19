module.exports = {
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "test123",
    "database": "test",
    "synchronize": true,
    "autoLoadEntities": true,
    "entities": [
        __dirname + "/dist/entity/**/*.entity.js"
    ],
    "migrations": [
        __dirname + "/dist/migrations/**/*.js"
    ]
 }