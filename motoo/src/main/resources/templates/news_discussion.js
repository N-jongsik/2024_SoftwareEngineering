// 뉴스 등록 폼 처리
function submitNews() {
    const newsTitle = document.getElementById('newsTitle').value;
    const newsImage = document.getElementById('newsImage').value;
    const newsContent = document.getElementById('newsContent').value;
    const newsDate = document.getElementById('newsDate').value;

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

        // 폼 초기화
        document.getElementById('newsForm').reset();
        
        // 뉴스 페이지로 이동
        window.location.href = 'news.html';
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
}

// 뉴스 페이지 로드 시 뉴스 목록 표시
function loadNews() {
    const newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    const newsContainer = document.getElementById('newsList');

    newsList.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.className = 'news';

        const imgElement = document.createElement('img');
        imgElement.src = news.image;
        imgElement.className = 'news-image';
        imgElement.style.display = 'inline-block';
        imgElement.style.verticalAlign = 'top';

        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'inline-block';

        const titleElement = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = '#';
        titleLink.textContent = news.title;
        titleElement.appendChild(titleLink);

        const dateElement = document.createElement('p');
        dateElement.innerHTML = `<small>${news.content} | ${news.date}</small>`;

        contentDiv.appendChild(titleElement);
        contentDiv.appendChild(dateElement);

        newsDiv.appendChild(imgElement);
        newsDiv.appendChild(contentDiv);

        newsContainer.appendChild(newsDiv);
    });
}

// 페이지 로드 시 뉴스 목록을 로드합니다.
document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('newsList')) {
        loadNews();
    }
});
