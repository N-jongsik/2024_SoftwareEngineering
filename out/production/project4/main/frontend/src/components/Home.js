import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const quizData = {
  question: '"공모시장" 은 주식 거래가 처음 이루어지는 시장으로, 기업이 새로 발행하는 주식을 일반 투자자에게 판매하는 시장이다.',
  options: [
    { text: 'O', votes: 60 },
    { text: 'X', votes: 40 },
  ],
  answer: 'O'
};

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const totalVotes = quizData.options.reduce((sum, option) => sum + option.votes, 0);


  const handleOptionClick = (optionText) => {
    if (selectedOption === optionText) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionText);
    }
  };

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
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <div className="modal-header">
          {/* <h2 className="modal-title">Welcome</h2> */}
          <button className="modal-close" onClick={() => setModalIsOpen(false)}>&times;</button>
        </div>    
        <section>
        <div className="quiz-container">
          {/* <button onClick={QuizOptionClick} className="init"><h2>오늘의 퀴즈</h2></button> */}
          <b><h1>오늘의 퀴즈</h1></b> 
          <div>
            <h3><b>{quizData.question}</b></h3>
            <div className="options-container">
              {quizData.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`option 
                    ${selectedOption === option.text && option.text === quizData.answer ? 'correct' : ''} 
                    ${selectedOption && selectedOption === option.text && selectedOption !== quizData.answer ? 'incorrect' : ''}`}
                  onClick={() => handleOptionClick(option.text)}
                >
                  {option.text}
                  {selectedOption && (
                    <span className="percentage">
                      {((option.votes / totalVotes) * 100).toFixed(2)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
            {selectedOption && (
              <div className="feedback">
                {selectedOption === quizData.answer ? (
                  <div className="correct">정답입니다!</div>
                ) : (
                  <div className="incorrect">
                    오답입니다.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </section>
      </Modal>

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
            <a title="더보기"><Link to="/market">더보기</Link></a>
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
