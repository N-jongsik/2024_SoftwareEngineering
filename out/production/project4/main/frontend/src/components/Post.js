import React from 'react';

function Post() {
  return (
    <main>
      <section className="stock-list">
        <h2>Board</h2>
        <div className="stock">
          <h3><a href="#">AAPL</a></h3>
          <p>Apple Inc.</p>
        </div>
        <div className="stock">
          <h3><a href="#">GOOGL</a></h3>
          <p>Alphabet Inc.</p>
        </div>
        <div className="stock">
          <h3><a href="#">MSFT</a></h3>
          <p>Microsoft Corporation</p>
        </div>
      </section>
      <button className="disbut" onClick={() => window.location.href = 'discussionform'}>등록하기</button>
    </main>
  );
}

export default Post;
