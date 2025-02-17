import React from 'react'
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Check, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingBar from './LoadingBar';
import { useUser } from "@clerk/clerk-react";

import TestCourses from './TestCourses';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      text: "This app has transformed how we handle our daily operations. The efficiency gains are remarkable."
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      text: "The intuitive interface and powerful features make this a must-have tool for any modern business."
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      text: "We've seen a 40% increase in productivity since implementing this solution. Highly recommended!"
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  function handleScroll() {
    setIsScrolled(window.scrollY > 100);

    // Update active section based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        setActiveSection(section.id);
      }
    });
  }

  // Enable smooth scrolling behavior for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height if needed
          behavior: 'smooth',
        });
      }
    });
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll);
  });


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // 5-second loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4 mx-auto"></div>
          <LoadingBar />
          <p className="text-gray-600 text-lg mt-4 animate-pulse">
            Loading your experience...
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="relative">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-2xl font-bold text-neutral-100" data-aos="fade-up" data-aos-duration="1500">SKILLShastra</a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'About', 'Features', 'Test-Courses', 'Companies', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium hover:text-blue-500 transition-colors
                    ${activeSection === item.toLowerCase() ? 'text-black-600' : 'text-white-500'}`}
                >
                  {item}
                </a>
              ))}

              {user ? (
                <div className="flex items-center gap-2">
                  <p className="text-lg text-white">Hi, {user?.fullName}!</p>
                  <button
                    className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-md"
                    onClick={() => { navigate("/userdetails") }}
                  >
                    <User size={24} className="text-gray-700" />
                  </button>
                  <button
                    className="px-4 py-2 bg-white text-red-600 hover:bg-gray-100 rounded-full transition-colors shadow-md"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className={`${activeSection === "home"
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    } px-6 py-2 rounded-full font-medium transition-colors`}
                  onClick={() => navigate('/signIn')}
                >
                  Sign In
                </button>
              )}

            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Features', 'Test-Courses', 'Companies', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/signIn', { user })}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Add the Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white">
              <h1 className="text-3xl md:text-6xl font-bold mb-6" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1500">
                Your Gateway to Top Placements & Career Success
              </h1>
              <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
                A cutting-edge platform that prepares students for placements through test-based assessments and shortlisting for interviews with top companies.
              </p>
              <div className="space-x-4" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors" >
                  <a href="#test-courses">GET TEST COURSES</a>

                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0" data-aos="fade-up" data-aos-duration="1500">
              <img
                src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="App Screenshot"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Who Are We</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We empower students with industry-specific test courses and ensure that only skilled candidates move forward in the hiring process. If a student doesn't secure an interview, we refund their deposit, making it a risk-free opportunity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img data-aos="fade-right" data-aos-delay="300"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="About Us"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  Our mission is to streamline placements by connecting talent with companies through a transparent, skill-driven selection process.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span> Direct College & Company Partnerships.</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span> Industry-Relevant Test Courses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span> Risk-Free Enrollment </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <span>Guaranteed Interview Opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our goal is to create a transparent, skill-driven hiring process that connects students with top job opportunities!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                "icon": "📝",
                "title": "Test-Based Assessments",
                "description": "Students are evaluated through industry-relevant tests to showcase their skills."
              },
              {
                "icon": "🎯",
                "title": "Guaranteed Interview Process",
                "description": "Perform well in assessments and get direct interview opportunities with top companies."
              },
              {
                "icon": "💰",
                "title": "Refund Policy",
                "description": "If a student doesn't secure an interview, we refund the deposit, making it a risk-free opportunity."
              },
              {
                "icon": "🏫",
                "title": "College & Company Collaboration",
                "description": "We partner with colleges for student onboarding and companies for seamless hiring."
              },
              {
                "icon": "✅",
                "title": "Test-Based AI Resuming Building",
                "description": "Our company specializes in designing test-based resume building and profile enhancement solutions, ensuring candidates present their skills and qualifications effectively to potential employers."
              },
              {
                "icon": "📚",
                "title": "Industry-Curated Test Syllabus",
                "description": "Our assessments are designed in collaboration with industry experts to ensure students gain the skills that top companies are actively looking for."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <div className="text-2xl">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing Section */}
      <section id="test-courses" className="py-20 bg-gray-50">
        <TestCourses />
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the talented individuals behind our success.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-[220px]" data-aos-offset="200" data-aos-delay="300" data-aos-duration="1500">
            {[
              {
                name: "Vivek Kumar Sharma",
                role: "CEO & Founder",
                image: "../photos/viveksharma.jpg",
                insta: "",
                Linkedin: "https://www.linkedin.com/in/vivek-kumar-sharma-482919183/?originalSubdomain=in",
                position: "fade-right"
              },
              {
                name: "Sakhil Sharma",
                role: "Co-Founder & Developer",
                image: "../photos/sakhil.jpg",
                insta: "https://www.instagram.com/_.sakhil_04/",
                Linkedin: "https://www.linkedin.com/in/sakhil-sharma-developer/",
                position: "fade-left"
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 inline-block" data-aos={member.position} data-aos-duration="1500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-600 bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center space-x-6 mt-4">
                  <a href={member.insta} className="text-gray-400 hover:text-blue-600">
                    <Instagram size={24} />
                  </a>
                  <a href={member.Linkedin} className="text-gray-400 hover:text-blue-600">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers.
            </p>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
            <div className="bg-white rounded-lg shadow-lg p-8 mx-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="text-blue-600" />
                <p>NIT Hamirpur, Hamirpur, Himachal Pradesh, India 177005</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-600" />
                <p>+1 93179*****</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-600" />
                <p>contactus45@estartup.com</p>
              </div>
              <div className="flex space-x-4 mt-8">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Facebook />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Twitter />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Instagram />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SkillShastra</h3>
              <p className="text-gray-400">
                We empower students with industry-specific test courses and ensure that only skilled candidates move forward in the hiring process. If a student doesn't secure an interview, we refund their deposit, making it a risk-free opportunity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#test-courses" className="text-gray-400 hover:text-white transition-colors">Test Courses</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest features and releases.
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg w-full text-gray-900"
                />
                <button className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SkillShastra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all ${isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}


export default Home
