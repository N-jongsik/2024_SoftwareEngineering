import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Post() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/boards'); // 서버의 정확한 주소
        setBoards(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main>
      <section className="stock-list">
        <h2>Board</h2>
        {boards.length > 0 ? (
          boards.map(board => (
            <div key={board.board_id} className="stock">
              <h3><Link to={`/boards/${board.id}`}>{board.title}</Link></h3>
              <p>{board.content}</p>
            </div>
          ))
        ) : (
          <p>No boards available</p>
        )}
      </section>
      <button className="disbut" onClick={() => window.location.href = '/discussionform'}>등록하기</button>
    </main>
  );
}


export default Post;
