import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header({ isLoggedIn, onLogout }) {
    const [item_name, setItemName] = useState('');
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

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

    const handleItemClick = (item) => {
        navigate(`/stockinfo?itmsNm=${item.itmsNm}&srtnCd=${item.srtnCd}`); // Navigate to StockInfo page with parameters
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
                    <li><Link to="/trading">Trading</Link></li>
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
                            <button type="submit">검색</button>
                        </form>
                        {error && <div>Error: {error.message}</div>}
                        {response.length > 0 && (
                            <div className="search-results">
                                {response.map((item, index) => (
                                    <div key={index} className="search-result-item" onClick={() => handleItemClick(item)}>
                                        <h2>{item.itmsNm}</h2>
                                        <p>{item.srtnCd} | {item.mrktCtg} | {item.data_rank} {item.corpNm}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
