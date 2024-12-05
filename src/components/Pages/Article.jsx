// Pages/Article.jsx
import React from 'react';
import { Search } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import { blogPosts } from '../../Data/blog-data'; // Removed recentPosts import
import { articlesContent } from '../../Data/articles-content';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  const articleId = parseInt(id);
  
  const articleMeta = blogPosts.find(post => post.id === articleId);
  const articleContent = articlesContent[articleId];

  // Get recent posts from blogPosts
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  // Add error handling for non-existent articles
  if (!articleMeta || !articleContent) {
    return (
      <>        
      <TopNavBar />
        <Header />
        <div className="blog-container">
          <h1>Article not found</h1>
          <Link to="/blog" className="read-more">Return to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <TopNavBar />
      <div className="blog-container">
        <div className="article-content">
          <div className="main-content">
            <div className="article-header">
              <div className="article-meta">
                {articleMeta.category} • {articleMeta.date}
              </div>
              <h1>{articleContent.title}</h1>
              <div className="article-author">
                Author: {articleContent.author}
              </div>
            </div>
            
            <div className="article-image-container">
              <img 
                src={articleContent.featuredImage} 
                alt={articleContent.title}
                className="article-image"
              />
            </div>

            <div 
              className="article-text"
              dangerouslySetInnerHTML={{ __html: articleContent.fullContent }} 
            />

            <div className="article-tags">
              {articleContent.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                className="search-input"
              />
              <Search className="search-icon" size={20} />
            </div>

            <div className="recent-posts">
              <h3>Ostatnie wpisy</h3>
              <ul>
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link to={`/article/${post.id}`}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Article;