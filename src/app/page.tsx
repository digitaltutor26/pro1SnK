'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize Dark Mode state based on preferences
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (submitted) {
      setSubmitted(false);
    }
    setErrors((prev) => prev.filter((err) => !err.toLowerCase().includes('name')));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submitted) {
      setSubmitted(false);
    }
    setErrors((prev) => prev.filter((err) => !err.toLowerCase().includes('email')));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (submitted) {
      setSubmitted(false);
    }
    setErrors((prev) => prev.filter((err) => !err.toLowerCase().includes('message')));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitted(false);
    
    const newErrors: string[] = [];

    // Name validation
    if (!name.trim()) {
      newErrors.push('Name is required.');
    }

    // Email validation
    if (!email.trim()) {
      newErrors.push('Email is required.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.push('Invalid email format.');
      }
    }

    // Message validation
    if (!message.trim()) {
      newErrors.push('Message is required.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || ['An error occurred. Please try again.']);
      } else {
        setErrors([]);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      setErrors(['Network error. Please check your connection.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              SnK Systems
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300" data-testid="hero-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-950 dark:from-white dark:via-blue-200 dark:to-indigo-100 bg-clip-text text-transparent leading-none" data-testid="hero-catchphrase">
            SnK Systems: We Build the Future of Web Technology
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Providing state-of-the-art software engineering, interactive web applications, and cutting-edge design solutions for global digital transformation.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg dark:hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
            data-testid="hero-cta"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300" data-testid="services-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Tailored core software design, robust engineering, and technical development solutions engineered to scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transform transition-all duration-300 text-left">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-2xl rounded-xl mb-6">💻</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Custom Web Apps</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Building fast, secure, and modern web applications with Next.js, React, and TypeScript.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transform transition-all duration-300 text-left">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-2xl rounded-xl mb-6">📱</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Mobile Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                High-performance iOS and Android applications tailored for high user engagement and fluid design.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transform transition-all duration-300 text-left">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-2xl rounded-xl mb-6">☁️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Cloud Engineering</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Scaling infrastructure, automating deployment pipelines, and ensuring secure high-availability cloud setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300" data-testid="about-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">About SnK Systems</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We are a passionate team of innovators, engineers, and digital specialists who love creating high-impact software solutions at SnK Systems.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                By bridging the gap between sophisticated software design and fluid user experience functionality, we build digital products that scale seamlessly.
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-left transition-colors duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  To deliver exceptional, reliable technological engineering that solves real business challenges and delivers outstanding user experiences.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-left transition-colors duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  To be the preferred global technological partner, recognized for technical sophistication, design integrity, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">Contact Us</h2>
          
          {submitted && (
            <div
              data-testid="success-feedback"
              role="status"
              aria-live="polite"
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800 text-center font-medium"
            >
              Thank you for contacting us! We will get back to you shortly.
            </div>
          )}

          {errors.length > 0 && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800 space-y-1"
            >
              {errors.map((error, index) => {
                let errId = "";
                if (error.toLowerCase().includes('name')) errId = "name-error";
                else if (error.toLowerCase().includes('email')) errId = "email-error";
                else if (error.toLowerCase().includes('message')) errId = "message-error";
                return (
                  <div key={index} id={errId} data-testid="error-message" className="text-sm font-medium">
                    {error}
                  </div>
                );
              })}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors duration-300" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                data-testid="contact-name"
                value={name}
                onChange={handleNameChange}
                maxLength={100}
                aria-invalid={errors.some((err) => err.toLowerCase().includes('name'))}
                aria-describedby={errors.some((err) => err.toLowerCase().includes('name')) ? "name-error" : undefined}
                className="w-full border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                data-testid="contact-email"
                value={email}
                onChange={handleEmailChange}
                maxLength={100}
                aria-invalid={errors.some((err) => err.toLowerCase().includes('email'))}
                aria-describedby={errors.some((err) => err.toLowerCase().includes('email')) ? "email-error" : undefined}
                className="w-full border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                data-testid="contact-message"
                value={message}
                onChange={handleMessageChange}
                maxLength={1000}
                aria-invalid={errors.some((err) => err.toLowerCase().includes('message'))}
                aria-describedby={errors.some((err) => err.toLowerCase().includes('message')) ? "message-error" : undefined}
                className="w-full border-gray-300 dark:border-gray-700 rounded-xl shadow-sm py-3 px-4 border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3.5 px-4 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
