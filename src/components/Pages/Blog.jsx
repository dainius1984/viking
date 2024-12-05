import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Blog.css';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import { blogHeaderData, blogPosts } from '../../Data/blog-data';
import { articlesContent } from '../../Data/articles-content'; // Add this import

const Blog = () => {
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="blog-container">
        <div className="blog-section">
          <img 
            src={blogHeaderData.heroImage} 
            alt="Blog Hero" 
          />
          <div className="blog-section-content">
            <h1>{blogHeaderData.title}</h1>
            <p>{blogHeaderData.subtitle}</p>
          </div>
        </div>

        <div className="blog-content">
          <div className="main-content">
            {blogPosts.map(post => {
              const articleMetadata = articlesContent[post.id];
              return (
                <div key={post.id} className="blog-card">
                  <Link 
                    to={`/article/${post.id}`} 
                    className="blog-card-image-link"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="blog-image"
                    />
                  </Link>
                  <div className="blog-card-content">
                    <div className="post-meta">
                      {post.category} • {post.date}
                    </div>
                    <Link 
                      to={`/article/${post.id}`} 
                      className="blog-card-title-link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <h2>{post.title}</h2>
                    </Link>
                    <p>{articleMetadata.metaDescription}</p>
                    <Link 
                      to={`/article/${post.id}`} 
                      className="read-more"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Czytaj więcej
                    </Link>
                  </div>
                </div>
              );
            })}
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

export default Blog;