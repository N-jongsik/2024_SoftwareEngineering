import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function AdminHeader() {
    const location = useLocation();
    const userID = location.state?.variable;
    return (
        <header>
            <div className="logo">Admin Panel</div>
            <nav>
                <ul>
                    <li>{userID && <p>User ID: {userID}</p>}</li>
                    <li><Link to="/admin/memberlist" state={{ variable: userID }}>회원관리</Link></li>
                    <li><Link to="/admin/noticelist" state={{ variable: userID }}>공지사항 관리</Link></li>
                    <li><Link to="/admin/QnAlist" state={{ variable: userID }}>문의내역 관리</Link></li>
                    <li><Link to="/admin/post" state={{ variable: userID }}>종목 토론방 관리</Link></li>
                    <li><Link to="/" state={{ variable: userID }}>Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default AdminHeader;
