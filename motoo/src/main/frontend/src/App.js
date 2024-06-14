import React, { useEffect, useState } from 'react';
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
import DiscussionView from './components/DiscussionView';
import NoticeFrom from './components/NoticeForm';
import NoticeView from './components/NoticeView';
import NoticeList from './components/NoticeList';
import QnAFrom from './components/QnAForm';
import QnAView from './components/QnAView';
import QnAList from './components/QnAList';
import Ticker from './components/Ticker';
import './App.css';
import axios from 'axios';

function App() {
  const [homeData, setHomeData] = useState('');

  useEffect(() => {
    axios.get('/')
        .then(response => setHomeData(response.data))
        .catch(error => console.log(error));
  }, []);

  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home data={homeData} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/post" element={<Post />} />
            <Route path="/news" element={<News />} />
            <Route path="/newsform" element={<NewsForm />} />
            <Route path="/discussionform" element={<DiscussionBoard />} />
            <Route path="/discussionform/:boardId" element={<DiscussionBoard />} />
            <Route path="/boards/:boardId" element={<DiscussionView />} />
            <Route path="/noticelist" element={<NoticeList />} />
            <Route path="/noticeform" element={<NoticeFrom />} />
            <Route path="/noticeform/:boardId" element={<NoticeFrom />} />
            <Route path="/notice/:boardId" element={<NoticeView />} />
            <Route path="/QnAlist" element={<QnAList />} />
            <Route path="/qnaform" element={<QnAFrom />} />
            <Route path="/qnaform/:boardId" element={<QnAFrom />} />
            <Route path="/qna/:boardId" element={<QnAView />} />
            <Route path="/ticker" element={<Ticker />} />
            {/* 다른 페이지 라우트 추가 */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
