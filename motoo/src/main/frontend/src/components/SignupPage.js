import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const [duplicateMessageColor, setDuplicateMessageColor] = useState('red');

  const checkDuplicate = async () => {
    try {
      const result = await axios.post('/api/checkDuplicate', { userID });
      if (result.data.available) {
        setDuplicateMessage(result.data.message);
        setDuplicateMessageColor('blue');
      } else {
        setDuplicateMessage(result.data.message);
        setDuplicateMessageColor('red');
      }
    } catch (error) {
      setDuplicateMessage('중복 확인 중 오류가 발생했습니다.');
      setDuplicateMessageColor('red');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('/api/signup', {
        userID,
        email,
        password,
        userName
      });
      setResponseMessage(result.data.message);
      setError(null);
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
      setResponseMessage('');
    }
  };

  return (
    <main>
      <section className="signup-page">
        <div className="signup-form">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userid">아이디</label>
              <input
                type="text"
                id="userid"
                name="userID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={checkDuplicate}>중복 확인</button>
            <div id="duplicate-message" className="error-message" style={{ color: duplicateMessageColor }}>
              {duplicateMessage}
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">이름</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">회원가입</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {responseMessage && <div style={{ color: 'green' }}>{responseMessage}</div>}
          <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
