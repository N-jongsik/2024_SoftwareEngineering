import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BoardDetail() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/qna/${boardId}`);
        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleDelete = async () => {
    try {
      await axios.post(`http://localhost:8080/api/qna/${boardId}/delete`);
      navigate('/QnAlist'); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error('Error deleting board', error);
    }
  };

  const handleEdit = () => {
    navigate(`/qnaform/${boardId}`); // 수정 페이지로 이동
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {board ? (
        <div>
          <h2>{board.title}</h2>
          <p>{board.content}</p>
          <p>작성자: {board.user_id}</p>
          <p>작성일: {new Date(board.create_at).toLocaleDateString()}</p>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleEdit}>수정</button>
        </div>
      ) : (
        <p>No board data</p>
      )}
    </div>
  );
}

export default BoardDetail;
