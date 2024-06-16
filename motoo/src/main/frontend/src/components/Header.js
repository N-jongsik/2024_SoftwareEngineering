import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

function Header({ isLoggedIn, onLogout }) {
    const [item_name, setItemName] = useState('');
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const searchResultsRef = useRef(null);

    const location = useLocation();
    const userID = location.state?.variable;

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

    const handleItemClick = (item) => {
        navigate(`/stockinfo?itmsNm=${item.itmsNm}&srtnCd=${item.srtnCd}`); // Navigate to StockInfo page with parameters
    };

    const handleBoardLinkClickh = () => {
        navigate('/home', { state: { variable: userID } });
      };
    const handleBoardLinkClickm = () => {
            navigate('/market', { state: { variable: userID } });
          };
    const handleBoardLinkClickn = () => {
                navigate('/news', { state: { variable: userID } });
              };
    const handleBoardLinkClickp = () => {
            navigate('/post', { state: { variable: userID } });
          };
    const handleBoardLinkClickr = () => {
                navigate('/ranking', { state: { variable: userID } });
              };

    return (
        <header>
            <div className="logo">MoToo</div>
            <nav>
                <ul>
                    <li>{userID && <p>User ID: {userID}</p>}</li>
                                        {userID === 'Admin' && (
                                            <li>
                                                <Link to="/admin/memberlist" state={{ variable: userID }}>
                                                    관리자 페이지
                                                </Link>
                                            </li>
                                        )}
                    <li><button onClick={handleBoardLinkClickh} >Home</button></li>
                    <li><button onClick={handleBoardLinkClickm}>Market</button></li>
                    <li><button onClick={handleBoardLinkClickn}>News</button></li>
                    <li><button onClick={handleBoardLinkClickp}>Board</button></li>
                    <li><button onClick={handleBoardLinkClickr}>Ranking</button></li>
                    {/*<li><Link to="/trading">Trading</Link></li>*/}
                    <li>
                    <Link
                        to="/trading"
                        state={{ backgroundLocation: location, variable: userID }}
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
                            {/*<button type="submit">검색</button>*/}
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
                    <li><Link to="/profile" state={{  variable: userID }}>Profile</Link></li>
                    <li><Link to="/login" >Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
