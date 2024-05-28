import type { NextApiRequest, NextApiResponse } from 'next';
import mysql, { MysqlError} from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE || 'Analytics',
});

interface Analytics {
    [index: number]: {
        day: string;
        url: string;
        views: number;
    };
}

interface PieChart {
    [0]: {name: string, value: number}
}
type resultsCallback = (res:Analytics) => PieChart

export const  todaysDate = () => {
  return new Date().toISOString().substring(0,10);
};

const transformTodaysData = (results: Analytics) : PieChart => {
  const pieChartData:any = [];
  for (const key in results) {
    pieChartData.push({name: results[key].url, value: results[key].views});
  }

  return pieChartData;
};
const todayspageViews = (cb: (results: PieChart) => void) => {
  const today = todaysDate();
  connection.query(
    `SELECT url, views
             from page_views
             where date ="${today}"`,
    function (error: MysqlError, result: Analytics) {
      if (error) throw error;
      if (result ) {
        return cb(transformTodaysData(result));
      }
      connection.end();
    }

  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PieChart>
) {
  todayspageViews( (results) => {
    res.status(200).json(results);
  });
}
