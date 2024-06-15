import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        userID: userID,
        pwd: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // 로그인 성공 시 처리
      console.log('Login success:', response.data);
      if (response.data.status === 'success') {
        // 예시: 로그인 성공 시 리다이렉트 또는 다른 처리
        alert('로그인 성공');
        window.location.href = '/';
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      // 로그인 실패 시 처리
      console.error('Login failed:', error);
      setLoginError('로그인 실패: 아이디 또는 비밀번호가 맞지 않습니다.');
    }
  };

  return (
    <main>
      <section className="login-page">
        <div className="login-form">
          <h2>로그인</h2>
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
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">로그인</button>
          </form>

          {/* 로그인 오류 메시지 */}
          {loginError && <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>}

          <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
        </div>
      </section>
    </main>
  );
};

export default Login;
