import React from 'react';
import { Search } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import { blogPosts } from '../../Data/blog-data';
import { articlesContent } from '../../Data/articles-content';

const Article = () => {
  const { id } = useParams();
  const articleId = parseInt(id);
  
  const articleMeta = blogPosts.find(post => post.id === articleId);
  const articleContent = articlesContent[articleId];

  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  if (!articleMeta || !articleContent) {
    return (
      <>        
        <TopNavBar />
        <Header />
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/blog" className="text-emerald-800 hover:text-emerald-900">Return to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <TopNavBar />
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-sm text-emerald-800 mb-6 uppercase tracking-wider">
                {articleMeta.category} • {articleMeta.date}
              </div>
              <h1 className="text-4xl md:text-[2.8rem] font-bold mb-6 text-gray-800 leading-tight font-serif">
                {articleContent.title}
              </h1>
              <div className="text-lg text-gray-600 mb-10 italic">
                Author: {articleContent.author}
              </div>
            </div>
            
            {/* Article Image */}
            <div className="w-full mb-8 rounded-xl overflow-hidden shadow-lg shadow-black/10 max-h-[400px]">
              <img 
                src={articleContent.featuredImage} 
                alt={articleContent.title}
                className="w-full h-[200px] md:h-[250px] object-cover transition-transform duration-300 hover:scale-102"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-3xl mx-auto text-gray-700 prose-headings:font-serif prose-headings:text-emerald-800
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:relative
                prose-h2:after:content-[''] prose-h2:after:absolute prose-h2:after:bottom-0 prose-h2:after:left-0 
                prose-h2:after:w-[60px] prose-h2:after:h-[3px] prose-h2:after:bg-emerald-800"
              dangerouslySetInnerHTML={{ __html: articleContent.fullContent }} 
            />

            {/* Tags */}
            <div className="mt-16 pt-8 border-t-2 border-gray-100 text-center">
              {articleContent.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block px-6 py-2.5 mr-2 mb-2 bg-gray-50 rounded-full text-emerald-800 text-sm 
                    transition-all duration-300 border border-gray-200 hover:bg-emerald-800 hover:text-white 
                    hover:-translate-y-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-8">
            {/* Search */}
            <div className="relative mb-10">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                className="w-full py-4 px-4 pr-12 border-2 border-gray-200 rounded-lg text-base
                  transition-all duration-300 focus:border-emerald-800 focus:outline-none 
                  focus:ring-3 focus:ring-emerald-800/10"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-8 rounded-xl shadow-lg shadow-black/10">
              <h3 className="text-xl font-bold mb-6 text-emerald-800 relative pb-2 border-b-2 border-gray-100">
                Ostatnie wpisy
              </h3>
              <ul className="space-y-5">
                {recentPosts.map((post) => (
                  <li key={post.id} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <Link 
                      to={`/article/${post.id}`}
                      className="text-lg text-gray-800 transition-all duration-300 hover:text-emerald-800 
                        hover:translate-x-1 block leading-snug"
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

export default Article;