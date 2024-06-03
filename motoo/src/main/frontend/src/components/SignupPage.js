import React from 'react';

function SignupPage() {
  return (
    <main>
      <section className="signup-page">
        <div className="signup-form">
          <h2>회원가입</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input type="password" id="confirm-password" name="confirm-password" required />
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
