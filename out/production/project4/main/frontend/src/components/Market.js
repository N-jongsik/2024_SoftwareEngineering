import React, { useEffect, useState } from 'react'; 

function Market(){
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8080/Stock").then((res) => res.json()).then((res) => {
        setStocks(res);
      });
  }, [stocks]);



  const [sortType, setSortType] = useState('volume');

  const sortedStocks = [...stocks].sort((a, b) => {
      if (sortType === 'volume') {
      return b.acml_vol - a.acml_vol;
      } else if (sortType === 'change-up') {
      return b.data_rank - a.data_rank;
      } else if (sortType === 'change-down') {
      return a.data_rank - b.data_rank;
      }
      return 0;
  });

  return (
      
  <div className="stock-list">
    <h2>주식 종목 목록</h2>
    <div className="sort-buttons">
      <button onClick={() => setSortType('volume')}>최다 거래량 순</button>
      <button onClick={() => setSortType('change-up')}>상승률 순</button>
      <button onClick={() => setSortType('change-down')}>하락률 순</button>
    </div>
    <table className="stock-table">
      <thead>
        <tr>
          <th>종목명</th>
          <th>거래량</th>
          <th>변화율</th>
        </tr>
      </thead>
      <tbody>
        {sortedStocks.map((stock, index) => (
          <tr key={index}>
            <td>{stocks.hts_kor_isnm}</td>
            <td>{stocks.acml_vol}</td>
            <td>{stocks.change}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default Market;

