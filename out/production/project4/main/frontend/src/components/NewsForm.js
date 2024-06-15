import React, { useState } from 'react';

function NewsForm() {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsDate, setNewsDate] = useState('');

  const handleTitleChange = (event) => {
    setNewsTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setNewsImage(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewsContent(event.target.value);
  };

  const handleDateChange = (event) => {
    setNewsDate(event.target.value);
  };

  const submitNews = () => {
    if (newsTitle && newsImage && newsContent && newsDate) {
      const news = {
        title: newsTitle,
        image: newsImage,
        content: newsContent,
        date: newsDate
      };

      let newsList = JSON.parse(localStorage.getItem('newsList')) || [];
      newsList.push(news);
      localStorage.setItem('newsList', JSON.stringify(newsList));

      // Reset form
      setNewsTitle('');
      setNewsImage('');
      setNewsContent('');
      setNewsDate('');

      // Navigate to news page
      window.location.href = 'news';
    } else {
      alert('모든 필드를 입력해 주세요.');
    }
  };

  return (
    <main>
      <section className="news-form-section">
        <h2>뉴스 등록</h2>
        <form>
          <label htmlFor="newsTitle">제목</label>
          <input type="text" id="newsTitle" value={newsTitle} onChange={handleTitleChange} required />

          <label htmlFor="newsImage">이미지 파일</label>
          <input type="file" id="newsImage" value={newsImage} onChange={handleImageChange} accept="image/*" required />

          <label htmlFor="newsContent">내용</label>
          <textarea id="newsContent" value={newsContent} onChange={handleContentChange} rows="5" required></textarea>

          <label htmlFor="newsDate">날짜</label>
          <input type="date" id="newsDate" value={newsDate} onChange={handleDateChange} required />
          <button type="button" onClick={submitNews}>등록</button>
        </form>
      </section>
    </main>
  );
}

export default NewsForm;
