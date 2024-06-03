import React from 'react';

function Ranking() {
  return (
    <main>
      <section className="ranking-section">
        <h2>유저 랭킹</h2>
        <table className="ranking-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>유저명</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>User4</td>
              <td>40%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>User2</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>User1</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>User3</td>
              <td>15%</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Ranking;
