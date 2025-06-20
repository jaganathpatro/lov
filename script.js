       // Loading screen
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loading').classList.add('hidden');
            }, 1500);
        });

        // Enhanced floating hearts animation
        function createFloatingHeart() {
            const heartsContainer = document.getElementById('floating-hearts');
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '💖', '💗', '💓', '💞', '💕'];
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }

        // Create floating hearts periodically
        setInterval(createFloatingHeart, 500);

        // Navigation show/hide on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const nav = document.getElementById('nav');
            
            if (scrollTop > 100) {
                if (scrollTop > lastScrollTop) {
                    nav.classList.remove('show');
                } else {
                    nav.classList.add('show');
                }
            } else {
                nav.classList.remove('show');
            }
            lastScrollTop = scrollTop;
            
            // Show/hide back to top button
            if (scrollTop > 500) {
                document.getElementById('backToTop').classList.add('visible');
            } else {
                document.getElementById('backToTop').classList.remove('visible');
            }
            
            // Update scroll progress
            const scrollProgress = document.getElementById('scrollProgress');
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Mobile navigation toggle
        document.getElementById('navToggle').addEventListener('click', function() {
            this.classList.toggle('active');
            document.getElementById('nav').classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    document.getElementById('navToggle').classList.remove('active');
                    document.getElementById('nav').classList.remove('active');
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Back to top button
        document.getElementById('backToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Enhanced Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add stagger effect for grid items
                    if (entry.target.classList.contains('photo-card') || 
                        entry.target.classList.contains('reason-card') ||
                        entry.target.classList.contains('quote-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        entry.target.style.transitionDelay = delay + 'ms';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .heart-message, .timeline-content, .quote-card, .reason-card').forEach((el) => {
            observer.observe(el);
        });

        // Cursor heart trail effect
        const cursorTrail = document.getElementById('cursor-trail');
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        let scale = 0;
        let opacity = 0;
        let lastTime = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!cursorTrail.classList.contains('active')) {
                cursorTrail.classList.add('active');
            }
        });

        function animateCursorTrail(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            
            // Ease towards mouse position
            trailX += (mouseX - trailX) * 0.2;
            trailY += (mouseY - trailY) * 0.2;
            
            // Apply position and styles
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            // Random heart variation
            if (Math.random() < 0.05) {
                const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '💖', '💗', '💓', '💞', '💕'];
                cursorTrail.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            }
            
            requestAnimationFrame(animateCursorTrail);
        }

        requestAnimationFrame(animateCursorTrail);

        // Hide cursor trail when not moving
        let mouseStoppedTimeout;
        document.addEventListener('mousemove', function() {
            clearTimeout(mouseStoppedTimeout);
            cursorTrail.classList.add('active');
            
            mouseStoppedTimeout = setTimeout(function() {
                cursorTrail.classList.remove('active');
            }, 1000);
        });

        // Love calculator functionality
        document.getElementById('calculateBtn').addEventListener('click', function() {
            const name1 = document.getElementById('name1').value.trim();
            const name2 = document.getElementById('name2').value.trim();
            const result = document.getElementById('result');
            const meterFill = document.getElementById('meterFill');
            
            if (!name1 || !name2) {
                alert('Please enter both names');
                return;
            }
            
            // Simple "love calculation" algorithm (just for fun)
            const combinedNames = (name1 + name2).toLowerCase();
            let loveScore = 0;
            
            // Count vowels and love letters
            const loveLetters = ['l', 'o', 'v', 'e', 't', 'r', 'u'];
            for (let letter of combinedNames) {
                if (loveLetters.includes(letter)) {
                    loveScore += 5;
                } else if ('aeiou'.includes(letter)) {
                    loveScore += 3;
                } else {
                    loveScore += 1;
                }
            }
            
            // Normalize score to 0-100
            loveScore = Math.min(100, Math.max(10, loveScore % 100));
            
            // Animate meter
            meterFill.style.width = '0%';
            setTimeout(() => {
                meterFill.style.width = loveScore + '%';
            }, 100);
            
            // Show result with fun message
            const messages = [
                {min: 90, text: `Soulmates! ${name1} and ${name2} are meant to be together forever.`},
                {min: 75, text: `Perfect match! ${name1} and ${name2} have an amazing connection.`},
                {min: 60, text: `Great potential! ${name1} and ${name2} could build something beautiful.`},
                {min: 40, text: `Good chemistry! ${name1} and ${name2} have a nice connection.`},
                {min: 20, text: `Potential! ${name1} and ${name2} might need to work on things.`},
                {min: 0, text: `Interesting! ${name1} and ${name2} have an unconventional match.`}
            ];
            
            const matchedMessage = messages.find(m => loveScore >= m.min);
            
            setTimeout(() => {
                result.textContent = `${loveScore}% - ${matchedMessage.text}`;
                result.classList.add('show');
                
                // Add sparkles
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const rect = result.getBoundingClientRect();
                        createEnhancedSparkle(
                            rect.left + Math.random() * rect.width,
                            rect.top + Math.random() * rect.height
                        );
                    }, i * 200);
                }
            }, 1500);
        });

        // Enhanced sparkle creation
        function createEnhancedSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            
            const sparkles = ['✨', '💫', '⭐', '🌟', '💖', '❣️', '💘', '💝'];
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            
            // Random colors
            const colors = ['#ff6b9d', '#f7b731', '#5f27cd', '#00d2d3', '#ff9ff3', '#ff9ff3'];
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1200);
        }

        // Add sparkles on various interactions
        document.querySelectorAll('.photo-card, .reason-card, .quote-card, .timeline-content, .btn, .play-btn').forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        createEnhancedSparkle(
                            rect.left + Math.random() * rect.width,
                            rect.top + Math.random() * rect.height
                        );
                    }, i * 100);
                }
            });
        });

        // Click sparkles
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn') || e.target.classList.contains('play-btn') || e.target.classList.contains('calculate-btn')) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createEnhancedSparkle(
                            e.clientX + (Math.random() - 0.5) * 100,
                            e.clientY + (Math.random() - 0.5) * 100
                        );
                    }, i * 50);
                }
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect after loading
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            
            if (heroTitle && heroSubtitle) {
                const originalTitle = heroTitle.textContent;
                const originalSubtitle = heroSubtitle.textContent;
                
                heroTitle.style.opacity = '1';
                heroSubtitle.style.opacity = '1';
                
                setTimeout(() => {
                    typeWriter(heroTitle, originalTitle, 150);
                    setTimeout(() => {
                        typeWriter(heroSubtitle, originalSubtitle, 80);
                    }, originalTitle.length * 150 + 500);
                }, 2000);
            }
        }, 1500);

        // Add resize observer for responsive adjustments
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    if (entry.target === document.body) {
                        window.dispatchEvent(new Event('resize'));
                    }
                });
            });
            
            resizeObserver.observe(document.body);
        }
   