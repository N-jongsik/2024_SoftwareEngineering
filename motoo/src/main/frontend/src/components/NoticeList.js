import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Post() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userID = location.state?.variable;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/notice'); // 서버의 정확한 주소
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

  const handleBoardLinkClickr = () => {
                navigate('/admin/noticeform', { state: { variable: userID } });
  };

  return (
    <main>
      <section className="stock-list">
        <h2>공지사항</h2>
        {boards.length > 0 ? (
          boards.map(board => (
            <div key={board.board_id} className="stock">
              <h3><Link to={`/notice/${board.id}`} state= {{ variable: userID }}>{board.title}</Link></h3>
              <p>{board.content}</p>
            </div>
          ))
        ) : (
          <p>No boards available</p>
        )}
      </section>
      {userID === 'Admin' && (<button className="disbut" onClick={handleBoardLinkClickr } >공지사항 등록하기</button>)}
    </main>
  );
}


export default Post;
