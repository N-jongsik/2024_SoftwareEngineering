import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 가상의 API 호출 - 실제로는 서버에서 유저 정보를 가져와야 합니다.
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile'); // 실제 API 엔드포인트로 변경
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
            <p>{user.username}</p>
          </div>
          <div className="form-group">
            <label>이메일</label>
            <p>{user.email}</p>
          </div>
          <div className="form-group">
            <label>가입일</label>
            <p>{user.joinDate}</p>
          </div>
          {/* 필요한 다른 프로필 정보들을 여기에 추가 */}
          <button onClick={() => alert('프로필 수정 기능 구현 필요')}>프로필 수정</button>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
