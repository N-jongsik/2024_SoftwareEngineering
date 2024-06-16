import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Post() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userID = location.state?.variable;

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

const deleteBoard = async (id) => {
  try {
    await axios.post(`http://localhost:8080/api/boards/${id}/delete`); // POST 요청으로 변경
    setBoards(boards.filter((board) => board.id !== id));
  } catch (error) {
    console.error("Error deleting board:", error);
    setError(error);
  }
};
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
const handleBoardLinkClickr = () => {
              navigate('/discussionform', { state: { variable: userID } });
};

  return (
    <main>
      <section className="stock-list">
        <h2>토론방</h2>
        {boards.length > 0 ? (
          boards.map(board => (
            <div key={board.board_id} className="stock">
            <div className="stock-content">
              <h3><Link to={`/boards/${board.id}`}  state= {{ variable: userID }} >{board.title}</Link></h3>
              <p>{board.content}</p>
              </div>
              {location.pathname.startsWith('/admin') && (
                                            <button className="delete-button2" onClick={() => deleteBoard(board.id)}>삭제</button>
                            )}
            </div>
          ))
        ) : (
          <p>No boards available</p>
        )}
      </section>
      <button className="disbut" onClick={handleBoardLinkClickr } >등록하기</button>
    </main>
  );
}


export default Post;
