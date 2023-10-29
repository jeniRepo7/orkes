import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      const response = await axios.get(`http://localhost:5000/api/photos/${page}`);
      const data = response.data;
  
      if (data && data.nodes) {
        setArticles((prevArticles) => [...prevArticles, ...data.nodes]);
        setPage(page + 1);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  });
  
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, page]);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchArticles();
    }
  };

  return (
    <div className="App">
      <div className="article-list">
        <ul className='photo-gallery'>
            {articles &&
            articles.map((article, index) => (
              <li className="photo-card" key={article.node.nid}>
                <div className="photo-image">
                  <img src={article.node.field_photo_image_section} alt={article.node.title} />
                </div>
                <div className="photo-details">
                  <h2 className="photo-title">{article.node.title}</h2>
                  <p className="photo-author">Author: {article.node.author_name}</p>
                  <p className="photo-date">Date: {article.node.date}</p>
                </div>
            </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;
