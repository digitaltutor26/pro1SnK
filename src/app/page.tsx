'use client';

import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Reset errors and fields on success
    setErrors([]);
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100" data-testid="hero-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 md:mb-6" data-testid="hero-catchphrase">
            SnK Systems: We Build the Future of Web Technology
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Providing state-of-the-art software engineering, interactive web applications, and cutting-edge design solutions.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition duration-200"
            data-testid="hero-cta"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50 border-b border-gray-100" data-testid="services-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-sm sm:text-base">Tailored core software design, robust engineering, and technical development solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3">Custom Web Apps</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Building fast, secure, and modern web applications with Next.js, React, and TypeScript.
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Mobile Solutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                High-performance iOS and Android applications tailored for high user engagement.
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mb-4">☁️</div>
              <h3 className="text-xl font-bold mb-3">Cloud Engineering</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Scaling infrastructure, automating deployment pipelines, and ensuring secure high-availability configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white border-b border-gray-100" data-testid="about-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About SnK Systems</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                We are a passionate team of innovators, engineers, and digital specialists who love creating high-impact software solutions at SnK Systems.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                By bridging the gap between sophisticated software design and fluid user experience functionality, we build digital products that scale seamlessly.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="p-5 md:p-6 bg-gray-50 rounded-lg border border-gray-100 text-left">
                <h3 className="text-base md:text-lg font-bold mb-2 text-blue-600">Our Mission</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  To deliver exceptional, reliable technological engineering that solves real business challenges and delivers outstanding user experiences.
                </p>
              </div>
              <div className="p-5 md:p-6 bg-gray-50 rounded-lg border border-gray-100 text-left">
                <h3 className="text-base md:text-lg font-bold mb-2 text-blue-600">Our Vision</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  To be the preferred global technological partner, recognized for technical sophistication, design integrity, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Contact Us</h2>
          
          {submitted && (
            <div
              data-testid="success-feedback"
              role="status"
              aria-live="polite"
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-md border border-green-200 text-center font-medium"
            >
              Thank you for contacting us! We will get back to you shortly.
            </div>
          )}

          {errors.length > 0 && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200 space-y-1"
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

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border space-y-4 md:space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border-gray-300 rounded-md shadow-sm py-2.5 px-3 md:py-3 md:px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border-gray-300 rounded-md shadow-sm py-2.5 px-3 md:py-3 md:px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border-gray-300 rounded-md shadow-sm py-2.5 px-3 md:py-3 md:px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <button
                type="submit"
                data-testid="contact-submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
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
