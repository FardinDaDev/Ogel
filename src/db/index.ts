import mysql from "mysql";
import config from "../../config.json";

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dbname
});

connection.connect((err) => {
    if (err) {
        console.error(`Error Connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});

let ogeldb: any = {};

ogeldb.all = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Production", (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

export = ogeldb;