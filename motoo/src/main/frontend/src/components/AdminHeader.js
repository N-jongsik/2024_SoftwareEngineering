import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminHeader() {
    return (
        <header>
            <div className="logo">Admin Panel</div>
            <nav>
                <ul>
                    <li><Link to="/admin/memberlist">회원관리</Link></li>
                    <li><Link to="/admin/noticelist">공지사항 관리</Link></li>
                    <li><Link to="/admin/QnAlist">문의내역 관리</Link></li>
                    <li><Link to="/admin/post">종목 토론방 관리</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default AdminHeader;
