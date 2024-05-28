import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE || "Analytics",
});

export const importData = () => {
  const last7Days = getLast7Days();
  connection.query(
    "INSERT INTO page_views (url, date, views) " +
      "VALUES " +
      "('blog/post/1', ?, 50  ), ('blog/post/2', ?, 40 ),('blog/post/2', ?, 30 ), ('blog/post/2', ?, 20 ), ('blog/post/2', ?, 10 ),('blog/post/2', ?, 15 )",
    [
      last7Days[0],
      last7Days[1],
      last7Days[2],
      last7Days[3],
      last7Days[4],
      last7Days[5],
      last7Days[6],
    ]
  );
  connection.end();
};

export const getLast7Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates;
};

importData();
