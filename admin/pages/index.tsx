import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState} from 'react';
import { PieChart, Pie, Tooltip} from 'recharts';


export default function Home() {
  interface Data {
    Day: string
    pageUrl: PageData
  }
  interface PageData {
    pageUrl: [key:string]
    map(param: (item: any, index: any) => void): void;
  }

  interface PieChartData {
    [index: number]: {name: string; value: number}

    push(param: { name: any; value: any }): void;
  }


  const [todaysData, setTodaysData] = useState([]);
  useEffect( () => {
    fetch('api/today/')
      .then((res) => res.json())
      .then((data) => {
        setTodaysData(data);
      });
  }, []);

  const [weeksData, setWeeksData] = useState([]);
  useEffect( () => {
    fetch('api/week/')
      .then((res) => res.json())
      .then((data) => {
        setWeeksData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Super Simple Analytics</title>
        <meta name="Super Simple Analytics" content="Super Simple admin page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Super Simple Analytics
        </h1>


        <div className={styles.grid}>
          <h2> Todays page views </h2>
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={todaysData}
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>

          <h2> This weeks most popular </h2>

          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={weeksData}
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8dd1e1"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
