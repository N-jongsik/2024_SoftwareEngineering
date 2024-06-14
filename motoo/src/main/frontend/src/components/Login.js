import React from 'react';

function Login() {
  return (
    <main>
      <section className="login-page">
        <div className="login-form">
          <h2>로그인</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">로그인</button>
          </form>
          <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
        </div>
      </section>
    </main>
  );
}

export default Login;