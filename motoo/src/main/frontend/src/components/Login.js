import React, { useState } from 'react';
import axios from 'axios';
function Login() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    try {
      const response = await axios.post('/api/login', {
        userID,
        password
      });

      // 서버에서 로그인 성공 여부에 따라 처리
      if (response.data.success) {
        // 로그인 성공 시, 필요한 처리 (예: 페이지 이동)
        console.log('로그인 성공!');
        // 예시로 alert 메시지 출력
        alert('로그인 성공!');
        // 필요한 처리 구현 (예: 페이지 이동)
      } else {
        // 로그인 실패 시, 에러 메시지 표시
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setLoginError('로그인 중 오류가 발생했습니다.');
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
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
              <button type="submit">로그인</button>
            </form>

            {/* 로그인 오류 메시지를 표시할 경우 */}
            {loginError && <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>}

            <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
          </div>
        </section>
        {/* 다른 페이지 섹션들 */}
      </main>
  );
}

export default Login;