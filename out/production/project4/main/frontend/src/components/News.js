import React from 'react';

function NewsPage() {
  return (
    <main>
      <section className="news-list">
        <h2>News</h2>
        <div className="news">
          <img src="lg.jpg" className="news-image" alt="News Image" style={{ display: 'inline-block', verticalAlign: 'top' }} />
          <div style={{ display: 'inline-block' }}>
            <h3><a href="#">[실적] "올라가는 눈높이"</a></h3>
            <p><small>인사이트팀 | 3일전</small></p>
          </div>
        </div>
        <div className="news">
          <img src="test.png" className="news-image" alt="News Image" style={{ display: 'inline-block', verticalAlign: 'top' }} />
          <div style={{ display: 'inline-block' }}>
            <h3><a href="#">[트렌드] "정상화 기대에 지난주 86% 오른 '이 종목'"</a></h3>
            <p><small>인사이트팀 | 3일전</small></p>
          </div>
        </div>
      </section>
      <button className="disbut" onClick={() => window.location.href = 'newsform'}>등록하기</button>
    </main>
  );
}

export default NewsPage;
