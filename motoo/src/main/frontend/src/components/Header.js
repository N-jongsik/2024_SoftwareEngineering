import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [item_name, setItemName] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.get(`/api/getStockInfo`, {
                params: { item_name: item_name }
            });
            setResponse(result.data.items);
            setError(null);
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    return (
        <header>
            <div className="logo">StockSite</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/market">Market</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/post">Board</Link></li>
                    <li><Link to="/ranking">Ranking</Link></li>
                    <li><Link to="/trading">Trading</Link></li>
                    <form onSubmit={handleSubmit}>
                        <ul>
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
                        </ul>
                    </form>
                    {error && <div>Error: {error.message}</div>}
                    {response && (
                        <div>
                            {response.map((item, index) => (
                                <div key={index}>
                                    <h2>{item.itmsNm}</h2>
                                    <p>{item.srtnCd.substring(1)} | {item.mrktCtg} | {item.data_rank} {item.corpNm}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>


        </header>
    );
}

export default Header;
