import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import { blogHeaderData, blogPosts } from '../../Data/blog-data';
import { articlesContent } from '../../Data/articles-content';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[230px] mt-8 mb-16 overflow-hidden w-full rounded-2xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-green-900/70 z-10"></div>
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-2/5 h-[3px] bg-gradient-to-r from-transparent via-green-900/30 to-transparent rounded"></div>
          <img 
            src={blogHeaderData.heroImage} 
            alt="Blog Hero"
            className="w-full h-full object-cover object-[center_45%] transition-transform duration-600 hover:scale-105"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-5">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg tracking-wide mb-2">
              {blogHeaderData.title}
            </h1>
            <p className="text-white/95 text-xl md:text-2xl drop-shadow-md font-medium">
              {blogHeaderData.subtitle}
            </p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 -mt-4">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">
                  Nie znaleziono artykułów dla zapytania "{searchQuery}"
                </p>
              </div>
            ) : (
              filteredPosts.map(post => {
                const articleMetadata = articlesContent[post.id];
                return (
                  <div key={post.id} className="bg-white rounded-xl shadow-md mb-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg first:mt-12 first:rounded-2xl first:shadow-lg">
                    <Link 
                      to={`/article/${post.id}`} 
                      className="block overflow-hidden"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="text-sm text-green-800 font-medium mb-3">
                        {post.category} • {post.date}
                      </div>
                      <Link 
                        to={`/article/${post.id}`} 
                        className="hover:text-green-800 transition-colors duration-300"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setSearchQuery('');
                        }}
                      >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {articleMetadata.metaDescription}
                      </p>
                      <Link 
                        to={`/article/${post.id}`} 
                        className="inline-block bg-green-800 text-white px-5 py-3 rounded-md font-medium transition-all duration-300 hover:bg-green-900 hover:translate-x-1"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setSearchQuery('');
                        }}
                      >
                        Czytaj więcej
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="sticky top-8">
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 px-4 pr-10 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-green-800 focus:ring-3 focus:ring-green-800/10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
            </div>

            <div className="bg-white p-7 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-green-800 pb-2 border-b-2 border-gray-100">
                Ostatnie wpisy
              </h3>
              <ul className="space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <Link 
                      to={`/article/${post.id}`}
                      className="text-gray-800 text-lg leading-snug block transition-all duration-300 hover:text-green-800 hover:translate-x-1"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setSearchQuery('');
                      }}
                    >
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