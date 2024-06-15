import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const quizData = [
  {
    question: '주식 1개당 가격이 높은 기업이 시가총액도 높다?',
    options: [
      { text: 'O', votes: 60 },
      { text: 'X', votes: 40 },
    ],
    answer: 'O',
    explanation: '주식의 시가총액은 "주식 1주의 가격 X 모든 주식 수!"'
  },
  {
    question: '"ETF"는 상장지수펀드로, 주식시장에 상장되어 자유롭게 매매할 수 있는 펀드이다?',
    options: [
      { text: 'O', votes: 70 },
      { text: 'X', votes: 30 },
    ],
    answer: 'O',
    explanation: 'ETF는 특정 지수의 움직임에 따라 수익률이 결정되는 펀드입니다!'
  },
  {
    question: '리볼빙을 사용하면 신용점수가 바뀔 수 있다?',
    options: [
      { text: 'O', votes: 20 },
      { text: 'X', votes: 80 },
    ],
    answer: 'O',
    explanation: '리볼빙은 결제금액의 일부만 갚고 나중에 미뤄서 갚을 수 있는 서비스에요  신용점수에 영향을 미치며 이자가 높고 습관이 될 수 있어 주의해야 해요!'
  },
  {
    question: '복권 당첨금 세금은 당첨 금액에 따라 다르게 부과된다?',
    options: [
      { text: 'O', votes: 20 },
      { text: 'X', votes: 80 },
    ],
    answer: 'O',
    explanation: '복권 당첨금 세금의 세율은 3억 까지 22%, 3억 초과 시 33%'
  },
  {
      question: '신용카드 한도를 채워 쓰면 신용점수에 유리하다?',
      options: [
        { text: 'O', votes: 20 },
        { text: 'X', votes: 80 },
      ],
      answer: 'X',
      explanation: '신용 점수 관리를 위해서는 한도액의 30% 내외 사용을 권장!'
    },
    {
        question: '복권 당첨금 세금은 당첨 금액에 따라 다르게 부과된다?',
        options: [
          { text: 'O', votes: 20 },
          { text: 'X', votes: 80 },
        ],
        answer: 'O',
        explanation: '복권 당첨금 세금의 세율은 3억 까지 22%, 3억 초과 시 33%'
      },
  {
      question: '코스피란 코스피 시장에 상장된 우리나라 대표 기업들의 주가 지수를 의미한다?',
      options: [
        { text: 'O', votes: 20 },
        { text: 'X', votes: 80 },
      ],
      answer: 'O',
      explanation: '코스피란 코스피 시장에 상장된 우리나라 대표 기업들의 주가 지수를 의미하고 코스닥이란 코스닥 시장에 상장된 유망한 벤처 기업들의 주가 지수를 의미해요! '
    },
  {
        question: 'ETF는 종류에 따라 특정 국가, 산업, 섹터에 특화된 투자가 가능하다?',
        options: [
          { text: 'O', votes: 20 },
          { text: 'X', votes: 80 },
        ],
        answer: 'O',
        explanation: 'ETF들은 해당 시장의 지수나 섹터를 반영하도록 설계되어 있어, 특정 지역이나 산업에 직접적으로 투자할 수 있는 기회를 제공해요! '
      },
  {
          question: '모든 채권은 원금이 보장되어 있다?',
          options: [
            { text: 'O', votes: 20 },
            { text: 'X', votes: 80 },
          ],
          answer: 'X',
          explanation: '회사 채권 중 고신용 등급의 기업 채권은 일반적으로 원금 보장이 상대적으로 높을 수 있지만, 낮은 신용 등급의 경우 원금이 보장되지 않을 수 있어요! '
        },
  {
        question: '주식 투자자는 기업의 경영 상황과 실적을 주의깊게 분석해야 한다?',
        options: [
          { text: 'O', votes: 20 },
          { text: 'X', votes: 80 },
        ],
        answer: 'O',
        explanation: '주식 투자자는 기업의 경영 상황과 실적을 주의 깊게 분석하여 신중하게 투자 결정을 내리는 것이 중요해요! '
      },
  {
        question: '기업의 실적이 좋으면 그 기업의 주가는 일반적으로 상승한다?',
        options: [
          { text: 'O', votes: 20 },
          { text: 'X', votes: 80 },
        ],
        answer: 'O',
        explanation: '무조건적인 것은 아니지만 주식 시장에서 투자자들이 기업의 성장성과 수익성을 반영하여 주식 가치를 결정하기 때문에 기업의 실적이 좋으면 주식 가격이 상승하는 경향이 있어요! '
      },

];

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [currentQuiz, setCurrentQuiz] = useState(quizData[0]);

  useEffect(() => {
    const randomQuiz = quizData[Math.floor(Math.random() * quizData.length)];
    setCurrentQuiz(randomQuiz);
  }, []);

  const totalVotes = currentQuiz.options.reduce((sum, option) => sum + option.votes, 0);

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
          <button className="modal-close" onClick={() => setModalIsOpen(false)}>&times;</button>
        </div>
        <section>
          <div className="quiz-container">
            <b><h1>오늘의 퀴즈</h1></b>
            <div>
              <h3><b>{currentQuiz.question}</b></h3>
              <div className="options-container">
                {currentQuiz.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option
                      ${selectedOption === option.text && option.text === currentQuiz.answer ? 'correct' : ''}
                      ${selectedOption && selectedOption === option.text && selectedOption !== currentQuiz.answer ? 'incorrect' : ''}`}
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
                  {selectedOption === currentQuiz.answer ? (
                    <div className="correct">정답입니다!</div>
                  ) : (
                    <div className="incorrect">오답입니다.</div>
                  )}
                  <div className="explanation">{currentQuiz.explanation}</div>
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
