import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE || "Analytics",
});

export const setupTables = () => {
  connection.query(
    `CREATE TABLE page_views (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, url VARCHAR(100) NOT NULL, date VARCHAR(100) NOT NULL, views INT NOT NULL)`,
    (error, results) => {
      if (error) throw error;
      // eslint-disable-next-line no-console
      console.log(results);
    }
  );
  connection.end();
};

setupTables();
