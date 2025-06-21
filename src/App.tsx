import React, { useState, useEffect, useRef } from 'react';
import { Heart, Camera, Music, Quote, Sparkles, ArrowUp, Menu, X } from 'lucide-react';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [loveScore, setLoveScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setShowBackToTop(scrollTop > 500);
      
      // Show/hide nav on scroll
      if (scrollTop > 100) {
        if (scrollTop > lastScrollTop.current) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
      } else {
        setShowNav(false);
      }
      lastScrollTop.current = scrollTop;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = e.clientX + 'px';
        cursorTrailRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsNavOpen(false);
    }
  };

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names');
      return;
    }

    const combinedNames = (name1 + name2).toLowerCase();
    let score = 0;
    
    const loveLetters = ['l', 'o', 'v', 'e', 'h', 'a', 'p', 'p', 'y'];
    for (let letter of combinedNames) {
      if (loveLetters.includes(letter)) {
        score += 15;
      } else if ('aeiou'.includes(letter)) {
        score += 3;
      } else {
        score += 1;
      }
    }
    
    score = Math.min(100, Math.max(10, score % 100));
    
    const messages = [
      {min: 90, text: `Soulmates! ${name1} and ${name2} are meant to be together forever.`},
      {min: 75, text: `Perfect match! ${name1} and ${name2} have an amazing connection.`},
      {min: 60, text: `Great potential! ${name1} and ${name2} could build something beautiful.`},
      {min: 40, text: `Good chemistry! ${name1} and ${name2} have a nice connection.`},
      {min: 20, text: `Potential! ${name1} and ${name2} might need to work on things.`},
      {min: 0, text: `Interesting! ${name1} and ${name2} have an unconventional match.`}
    ];
    
    const matchedMessage = messages.find(m => score >= m.min);
    
    setTimeout(() => {
      setLoveScore(score);
    }, 100);
    
    setTimeout(() => {
      setResult(`${score}% - ${matchedMessage?.text}`);
      setShowResult(true);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center z-50">
        <div className="text-6xl animate-pulse">💕</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cursor Trail */}
      <div 
        ref={cursorTrailRef}
        className="fixed pointer-events-none z-40 text-pink-400 text-xl transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-70"
      >
        💖
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-5 right-5 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full z-50 flex items-center justify-center shadow-lg md:hidden"
      >
        {isNavOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-white/70 backdrop-blur-md z-40 transition-transform duration-300 border-b border-white/20 shadow-sm ${showNav ? 'translate-y-0' : '-translate-y-full'} ${isNavOpen ? 'translate-y-0' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <ul className={`flex justify-center gap-8 py-4 ${isNavOpen ? 'flex-col items-center md:flex-row' : 'hidden md:flex'}`}>
            {[
              { id: 'hero', label: 'Home' },
              { id: 'message', label: 'Message' },
              { id: 'photos', label: 'Photos' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'quotes', label: 'Quotes' },
              { id: 'love-reasons', label: 'Why I Love You' },
              { id: 'love-calculator', label: 'Love Test' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-blue-500/30" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-pink-300/40 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6 animate-fade-in-up font-serif">
            Our Love Story ♥
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in-up animation-delay-500 font-light">
            A journey of two hearts becoming one
          </p>
          <button
            onClick={() => scrollToSection('message')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up animation-delay-1000"
          >
            Begin Our Story
          </button>
        </div>
      </section>

      {/* Message from Heart */}
      <section id="message" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Message from the Heart
            <div className="text-4xl mt-4">💕</div>
          </h2>
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-3xl" />
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic relative z-10 font-light">
              "Every love story is beautiful, but ours is my favorite. From the moment we met, I knew you were someone special. You've filled my life with laughter, joy, and endless love. Thank you for being my partner, my best friend, and my everything. This website is a small token of my love for you - a digital scrapbook of our memories and feelings."
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="photos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Photo Memories Gallery
            <div className="text-4xl mt-4">📸</div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📸', title: 'Our First Date', gradient: 'from-pink-400 to-rose-400' },
              { icon: '💕', title: 'First Kiss', gradient: 'from-purple-400 to-pink-400' },
              { icon: '🌅', title: 'Sunrise Together', gradient: 'from-orange-400 to-pink-400' },
              { icon: '🎉', title: 'Celebrating Us', gradient: 'from-blue-400 to-purple-400' },
              { icon: '🏖️', title: 'Beach Vacation', gradient: 'from-cyan-400 to-blue-400' },
              { icon: '🎂', title: 'Birthday Surprise', gradient: 'from-pink-400 to-purple-400' }
            ].map((photo, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group"
              >
                <div className={`h-64 bg-gradient-to-br ${photo.gradient} flex items-center justify-center text-6xl text-white/90 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {photo.icon}
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      // Photo Gallery Section
{[
  { icon: '📸', title: 'Our First Date', gradient: 'from-pink-400 to-rose-400' },
  { icon: '💕', title: 'First Kiss', gradient: 'from-purple-400 to-pink-400' },
  // ... more photos
].map((photo, index) => (
  <div key={index} className="...">
    <div className={`h-64 bg-gradient-to-br ${photo.gradient} flex items-center justify-center text-6xl text-white/90 relative overflow-hidden`}>
      {/* Replace this with your image */}
      <img 
        src="public/first_date.jpg" 
        alt={photo.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">{photo.title}</h3>
    </div>
  </div>
))}

      {/* Timeline */}
      <section id="timeline" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Timeline of Love
            <div className="text-4xl mt-4">⏰</div>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
            
            {[
              { date: 'Day One', title: 'The Day We Met', content: 'It was a beautiful day when our paths crossed for the first time. Little did we know that this moment would change our lives forever.' },
              { date: 'Week 2', title: 'Our First Date', content: 'Nervous butterflies, endless conversations, and the realization that we had found something special in each other.' },
              { date: 'Month 3', title: 'First "I Love You"', content: 'Three little words that meant everything. The moment we knew this was more than just a crush - it was true love.' },
              { date: 'Month 8', title: 'Moving In Together', content: 'Taking the next big step, creating our first shared space, and learning the little things that make us perfect for each other.' },
              { date: 'Now', title: 'Today & Forever', content: 'Every day with you is a new adventure. Here\'s to all the memories we\'ve made and all the ones yet to come.' }
            ].map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-purple-600 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-4 border-white">
                    {item.date}
                  </div>
                </div>
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4 font-serif">Our Song</h3>
              <p className="text-xl mb-8 opacity-90">The melody that plays in my heart whenever I think of you</p>
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
                <iframe 
                  style={{borderRadius: '12px'}} 
                  src="https://open.spotify.com/embed/track/3ZOEytgrvLwQaqXreDs2Jx?utm_source=generator" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Quotes, Vows & Poems
            <div className="text-4xl mt-4">💌</div>
          </h2>
          <div className="bg-gradient-to-br from-blue-100/50 to-pink-100/50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 text-9xl text-pink-200/30 font-serif">"</div>
            
            {[
              { text: 'In all the world, there is no heart for me like yours. In all the world, there no love for you like mine.', author: 'Maya Angelou' },
              { text: 'Roses are red, violets are blue,\nNo poem could express how much I love you.\nYou\'re my sunshine on cloudy days,\nMy compass when I lose my way.', author: 'Written for You' },
              { text: 'I promise to love you in good times and bad, in sickness and health. You are my heart, my soul, my everything. With you, I am home.', author: 'My Vow to You' }
            ].map((quote, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-lg border border-white/20 relative z-10">
                <p className="text-lg text-gray-700 italic leading-relaxed mb-4 whitespace-pre-line">
                  {quote.text}
                </p>
                <p className="text-right text-purple-600 font-semibold">- {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why I Love You Section */}
      <section id="love-reasons" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Why I Love You
            <div className="text-4xl mt-4">💝</div>
          </h2>
          <div className="bg-gradient-to-br from-orange-100/50 to-pink-100/50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '😊', title: 'Your Smile', content: 'It lights up my entire world and makes even the darkest days bright' },
                { icon: '💝', title: 'Your Kindness', content: 'The way you care for others and show compassion makes my heart melt' },
                { icon: '🤗', title: 'Your Hugs', content: 'In your arms, I find peace, comfort, and the feeling of being truly home' },
                { icon: '✨', title: 'Your Dreams', content: 'Your ambition and passion inspire me to be a better person every day' },
                { icon: '😂', title: 'Your Laugh', content: 'It\'s the most beautiful sound in the world and my favorite song' },
                { icon: '💕', title: 'Your Love', content: 'The way you love me makes me feel like the luckiest person alive' }
              ].map((reason, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/20 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Love Calculator */}
      <section id="love-calculator" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-serif">
            Love Compatibility
            <div className="text-4xl mt-4">💖</div>
          </h2>
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h3 className="text-3xl font-bold text-center mb-8 text-purple-600 font-serif">
              How Compatible Are We?
            </h3>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 text-center bg-white/80 backdrop-blur-sm"
              />
              <input
                type="text"
                placeholder="Partner's Name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 text-center bg-white/80 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={calculateLove}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
            >
              Calculate Love
            </button>
            <div className="bg-gray-200 rounded-full h-6 mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-1000 relative"
                style={{ width: `${loveScore}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            {showResult && (
              <div className="text-center text-lg text-gray-700 animate-fade-in-up">
                {result}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        >
          <ArrowUp size={20} className="mx-auto" />
        </button>
      )}

      {/* Footer */}
      <footer className="text-center py-12 px-4 bg-white/60 backdrop-blur-lg border-t border-white/20">
        <p className="text-gray-600">
          Made with ❤️ — Celebrating our journey together. Forever and always.
        </p>
      </footer>
    </div>
  );
}

export default App;