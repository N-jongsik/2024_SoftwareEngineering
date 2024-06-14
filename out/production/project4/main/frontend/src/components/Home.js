import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function Home() {
  const kospiChartRef = useRef(null);
  const kosdaqChartRef = useRef(null);

  useEffect(() => {
    const kospiCtx = kospiChartRef.current.getContext('2d');
    const kosdaqCtx = kosdaqChartRef.current.getContext('2d');

    let kospiChart = new Chart(kospiCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'KOSPI',
          data: [3200, 3300, 3100, 3000, 3050],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }]
      }
    });

    let kosdaqChart = new Chart(kosdaqCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'KOSDAQ',
          data: [1000, 1100, 1050, 1020, 1010],
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
        }]
      }
    });

    return () => {
      kospiChart.destroy();
      kosdaqChart.destroy();
    };
  }, []);

  const stocks = [
    { name: '삼성전자', price: '70,000', change: '▲1.9', color: 'red' },
    { name: 'SK하이닉스', price: '120,000', change: '▲2.3', color: 'red' },
    { name: '네이버', price: '350,000', change: '▲1.5', color: 'red' },
    { name: '카카오', price: '140,000', change: '▼0.9', color: 'blue' },
    { name: 'LG화학', price: '820,000', change: '▲3.8', color: 'red' },
  ];

  return (
    <main>
      <section className="market-indices">
        <h2>KOSPI & KOSDAQ</h2>
        <div className="chart-container">
          <canvas ref={kospiChartRef} id="kospiChart"></canvas>
          <canvas ref={kosdaqChartRef} id="kosdaqChart"></canvas>
        </div>
      </section>
      <section className="home-page">
        <div className="popular-stocks">
          <div className="popular-header">
            <h2>인기 주식 종목</h2>
            <a href="#" title="더보기">더보기</a>
          </div>
          <table className="stock-table">
            <thead>
              <tr>
                <th>종목명</th>
                <th>가격</th>
                <th>변동률</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.name}>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td style={{ color: stock.color }}>{stock.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Home;
