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
  const [successMessage, setSuccessMessage] = useState('');

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
        setSuccessMessage('');
      } else {
        setSuccessMessage('사용 가능한 아이디입니다.');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('중복 확인 과정에서 오류가 발생했습니다.');
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // 에러 메시지 초기화
    setSuccessMessage(''); // 성공 메시지 초기화
    try {
      const response = await axios.post('/api/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.status === 'success') {
        setSuccessMessage(response.data.message);
        alert('회원가입에 성공했습니다!')
        window.location.href = '/login';
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('회원가입에 실패했습니다.');
      }
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
              <p><button type="button" onClick={checkDuplicate}>중복 확인</button></p>
            </div>
            <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>
            <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>
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