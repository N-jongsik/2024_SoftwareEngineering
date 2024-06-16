import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function DiscussionForm() {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [boardType, setBoardType] = useState('종목1');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
  const location = useLocation();
  const userID = location.state?.variable;
  useEffect(() => {
    if (boardId) {
      const fetchBoard = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/qna/${boardId}`);
          const { title, board_type, content } = response.data;
          setTitle(title);
          setBoardType(board_type);
          setContent(content);
        } catch (error) {
          console.error('Error fetching board data', error);
        }
      };
      fetchBoard();
    }
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (boardId) {
        await axios.post(`http://localhost:8080/api/qna/${boardId}`, {
          title,
          board_type: boardType,
          content,
        });
      } else {
        await axios.post(`http://localhost:8080/api/qna`, {
          title,
          board_type: boardType,
          content,
          us : userID,
        });
      }
      navigate('/QnAlist', { state: { variable: userID } });
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <main>
      <section className="discussion">
        <h2>문의사항</h2>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <label>제목을 입력</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="stock-type">
            <label>QnA</label>
            <select
              name="board_type"
              value={boardType}
              onChange={(e) => setBoardType(e.target.value)}
              required
            >
              <option value="공개">공개</option>
              <option value="비공개">비공개</option>
            </select>
          </div>
          <div className="content">
            <label>내용 입력</label>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">등록하기</button>
        </form>
      </section>
    </main>
  );
}

export default DiscussionForm;
