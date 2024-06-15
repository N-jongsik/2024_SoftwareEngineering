import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'credentials': 'include' // 세션 기반 인증을 사용할 경우 필요
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="profile-page">
        <div className="profile-info">
          <h2>프로필 정보</h2>
          <div className="form-group">
            <label>아이디</label>
            <p>{user.userID}</p>
          </div>
          <div className="form-group">
            <label>이메일</label>
            <p>{user.userEmail}</p>
          </div>
          <div className="form-group">
            <label>사용자 이름</label>
            <p>{user.userName}</p>
          </div>
          <button onClick={() => alert('프로필 수정 기능 구현 필요')}>프로필 수정</button>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
