import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state?.variable;
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/me');
        if (response.data.status === 'success') {
          setUser(response.data.user);  // 사용자 정보를 상태에 저장
        } else {
            alert('로그인을 해주세요!');
            navigate('/login');
        }
      } catch (error) {
        console.error('Session check error', error);
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;  // 사용자 정보를 로드 중일 때 로딩 표시
  }
    const handleBoardLinkClick = () => {
                  navigate('/QnAlist', { state: { variable: userID } });
    };

  return (
    <div>
      <h1>개인 정보 확인하기</h1>
      <h2>사용자 이름: {user.userName}</h2>  {/* 사용자의 이름을 출력 */}
      <h2>사용자 ID: {user.userID}</h2>  {/* 사용자의 ID를 출력 */}
      <h2>사용자 Email: {user.userEmail}</h2>  {/* 사용자의 이메일을 출력 */}
      <h2>Motoo의 {user.id}번째 회원입니다!</h2>
      {/* 필요한 다른 사용자 정보 추가 */}
      <button className="disbut" onClick={handleBoardLinkClick } >문의사항 등록하기</button>)
    </div>
  );
};

export default Dashboard;
