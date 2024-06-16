import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Header({ isLoggedIn }) {
    const [user, setUser] = useState(null);
    const [item_name, setItemName] = useState('');
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const searchResultsRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponse = async () => {
            if (item_name.trim() === '') {
                setResponse([]);
                return;
            }
            try {
                const result = await axios.get(`/api/getStockInfo`, {
                    params: { item_name }
                });
                setResponse(result.data.items);
                setError(null);
            } catch (error) {
                setError(error);
                setResponse([]);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchResponse();
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [item_name]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setResponse([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('/api/me');
                if (response.data.status === 'success') {
                    setUser(response.data.user); // 사용자 정보를 상태에 저장
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Session check error', error);
                setUser(null);
            }
        };

        checkSession();
    }, []);

    const handleItemClick = (item) => {
        navigate(`/stockinfo?itmsNm=${item.itmsNm}&srtnCd=${item.srtnCd}`); // Navigate to StockInfo page with parameters
    };

    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            setUser(null); // 로그아웃 후 사용자 상태 초기화
            alert('로그아웃 되었습니다!');
            navigate('/login'); // 로그인 페이지로 리디렉션
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <header>
            <div className="logo">MoToo</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/market">Market</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/post">Board</Link></li>
                    <li><Link to="/ranking">Ranking</Link></li>
                    <li>
                        <Link
                            to="/trading"
                            state={{ backgroundLocation: location }}
                        >
                            Trading
                        </Link>
                    </li>
                    <li>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="stock-search">
                                <input
                                    id="stock-search"
                                    type="text"
                                    placeholder="종목검색"
                                    value={item_name}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </label>
                        </form>
                        {error && <div>Error: {error.message}</div>}
                        {response.length > 0 && (
                            <div className="search-results" ref={searchResultsRef}>
                                {response.map((item, index) => (
                                    <div key={index} className="search-result-item"
                                         onClick={() => handleItemClick(item)}>
                                        <h2>{item.itmsNm}</h2>
                                        <p>{item.srtnCd} | {item.mrktCtg} | {item.data_rank} {item.corpNm}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                    <li><Link to="/profile">Profile</Link></li>
                    {user ? (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
