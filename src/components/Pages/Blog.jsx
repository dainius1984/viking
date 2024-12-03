import React from 'react';
import { Search } from 'lucide-react';
import './Blog.css';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Kiedy najlepiej brać witaminy – Rano czy wieczorem?",
      excerpt: "By zapewnić funkcjonowanie prawidłowe, potrzebne nam składników odżywczych! Właśnie przez wiesieniu ludzi pytanie, kiedy się otrzymać ich.",
      image: "/api/placeholder/600/400",
      date: "2024-01-15",
      category: "Zdrowie"
    },
    {
      id: 2,
      title: "Jakie witaminy na oczy i wzrok?",
      excerpt: "W dzisiejszych czasach nasze oczy i wzrok są narażone na różne czynniki, które mogą na.",
      image: "/api/placeholder/600/400",
      date: "2024-01-10",
      category: "Zdrowie"
    },
    {
      id: 3,
      title: "Jak wzmocnić odporność organizmu?",
      excerpt: "Pierwszy krok odbudowy twojej odporności, czynników, które mogą powodować.",
      image: "/api/placeholder/600/400",
      date: "2024-01-05",
      category: "Zdrowie"
    }
  ];

  const recentPosts = [
    "Jak witaminami wzmocnić odporność w czasie zimy?",
    "Naturalne źródła witaminy D3",
    "Kwasy Omega-3 – Działanie, Źródła, Dawkowanie",
    "Witaminy dla kobiet w ciąży"
  ];

  return (
    <>
      <Header />
      <TopNavBar />
      <div className="blog-container">
        <div className="hero-section">
          <h1>Blog</h1>
          <p>Zdrowie i Witaminy</p>
        </div>

        <div className="blog-content">
          <div className="main-content">
            {blogPosts.map(post => (
              <div key={post.id} className="blog-card">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="blog-image"
                />
                <div className="blog-card-content">
                  <div className="post-meta">
                    {post.category} • {post.date}
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <button className="read-more">Read more</button>
                </div>
              </div>
            ))}
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
                {recentPosts.map((title, index) => (
                  <li key={index}>
                    <a href="#">{title}</a>
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