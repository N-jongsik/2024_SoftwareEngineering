import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [signupData, setSignupData] = useState({
    userID: '',
    pwd: '',
    userName: '',
    userEmail: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const checkDuplicate = async () => {
    try {
      const response = await axios.post('/api/checkDuplicate', { userID: signupData.userID });
      if (!response.data.available) {
        setErrorMessage('중복된 아이디입니다.');
      } else {
        setErrorMessage('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      setErrorMessage('중복 확인 과정에서 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/signup', signupData);
      alert(response.data); // 서버에서 반환한 메시지를 alert로 표시
      setErrorMessage(''); // 에러 메시지 초기화
    } catch (error) {
      setErrorMessage('회원가입에 실패했습니다.'); // 예외 발생 시 메시지 설정

    }
  };

  return (
      <main>
        <section className="signup-page">
          <div className="signup-form">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userID">아이디</label>
                <input type="text" id="userID" name="userID" value={signupData.userID} onChange={handleChange} required />
                <button type="button" onClick={checkDuplicate}>중복 확인</button>
              </div>
              <div className="error-message">{errorMessage}</div>
              <div className="form-group">
                <label htmlFor="pwd">비밀번호</label>
                <input type="password" id="pwd" name="pwd" value={signupData.pwd} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="userName">이름</label>
                <input type="text" id="userName" name="userName" value={signupData.userName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">이메일</label>
                <input type="email" id="userEmail" name="userEmail" value={signupData.userEmail} onChange={handleChange} required />
              </div>
              <button type="submit">회원가입</button>
            </form>
            <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
          </div>
        </section>
      </main>

  );
}

export default SignupPage;
