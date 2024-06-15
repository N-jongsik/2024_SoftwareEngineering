import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setMembers(response.data);
    } catch (error) {
      setError('Error fetching members');
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/members/${id}`);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      setError('Error deleting member');
    }
  };

  return (
    <div>
      <h2>회원 관리</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.userID}</td>
              <td>{member.userName}</td>
              <td>{member.userEmail}</td>
              <td>
                <button onClick={() => deleteMember(member.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
