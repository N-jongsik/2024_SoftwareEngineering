import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">StockSite</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">Market</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/post">Board</Link></li>
          <li><Link to="/ranking">Ranking</Link></li>
        </ul>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <nav>
        <ul>
          <li><Link to="#">Profile</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
