import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import Login from './components/Login';
import Ranking from './components/Ranking';
import Post from './components/Post';
import News from './components/News';
import NewsForm from './components/NewsForm';
import DiscussionBoard from './components/DiscussionForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/post" element={<Post />} />
          <Route path="/news" element={<News />} />
          <Route path="/newsform" element={<NewsForm />} />
          <Route path="/discussionform" element={<DiscussionBoard />} />
          {/* 다른 페이지 라우트 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
