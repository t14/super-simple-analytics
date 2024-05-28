import { APIGatewayEvent } from "aws-lambda";
import mysql, { MysqlError } from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE || "Analytics",
});

connection.connect();

interface Analytics {
  [index: number]: {
    day: string;
    url: string;
    views: number;
  };
}
export const lambdaHandler = async (event: APIGatewayEvent): Promise<any> => {
  let body = "";
  let statusCode = 200;
  try {
    switch (event.requestContext.httpMethod) {
      case "POST": {
        const requestJSON = JSON.parse(<string>event.body);
        connection.query(
          `SELECT views
             from page_views
             where date ="${requestJSON.day}" AND url="${requestJSON.pageURL}" limit 1`,
          function (error: MysqlError, result: Analytics) {
            if (error) throw error;
            if (result && Object.keys(result).length === 0) {
              connection.query(
                `INSERT into page_views (url, date, views)
                                  VALUES ("${requestJSON.pageURL}", "${requestJSON.day}", 1)`,
                function (error: MysqlError) {
                  if (error) throw error;
                  body = `Today's first page view for ${requestJSON.pageURL}. Date: ${requestJSON.day} `;
                }
              );
            } else {
              connection.query(
                `UPDATE page_views
                SET views=${++result[0].views} where url="${
                  requestJSON.pageURL
                }" AND date="${requestJSON.day}"`,
                function (error: MysqlError) {
                  if (error) throw error;
                  body = `Update page views for ${
                    requestJSON.pageURL
                  } on date: ${requestJSON.day} pageView: ${++result[0].views}`;
                }
              );
            }
            connection.end();
          }
        );
        break;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      statusCode = 400;
      body = err.message;
      /* eslint-disable no-console */
      console.log(err);
    }
  } finally {
    /* eslint-disable no-console */
    console.log(statusCode, body);
  }

  return {
    statusCode,
    body,
    headers: {
      //@todo this is just a POC if you want to use this in production please restrict
      // Access-Contorl-Allow-Origin value below to domains you trust.
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Content-Type": "application/json",
      //"Access-Control-Allow-Headers" : "Content-Type",
      //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
  };
};
