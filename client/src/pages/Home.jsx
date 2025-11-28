import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, MapPin, BarChart3, TrendingUp, CheckCircle, Phone, Star, Clock } from 'lucide-react';
import { Carousel } from '../components/Carousel';
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [issueCount, setIssueCount] = useState(0);
  const [welcomeLangIndex, setWelcomeLangIndex] = useState(0);
  const languages = ['en', 'hi', 'ma', 'ra', 'te'];

  // Get welcome text in specific language
  const getWelcomeText = (lang) => {
    const translations = {
      en: { welcome: "Welcome", msg: "to Gaon Connect" },
      hi: { welcome: "स्वागत है", msg: "गाँव कनेक्ट में" },
      ma: { welcome: "स्वागत होय", msg: "गांव कनेक्ट में" },
      ra: { welcome: "स्वागत होय", msg: "गांव कनेक्ट में" },
      te: { welcome: "స్వాగతం", msg: "గాంవ కనెక్ట్ మేందు" }
    };
    return translations[lang] || translations.en;
  };

  // Simulate live issue counter
  useEffect(() => {
    const interval = setInterval(() => {
      setIssueCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto language switching for welcome text only
  useEffect(() => {
    const langInterval = setInterval(() => {
      setWelcomeLangIndex(prev => (prev + 1) % languages.length);
    }, 1000); // Change language every second

    return () => clearInterval(langInterval);
  }, []);

  const features = [
    {
      icon: AlertTriangle,
      title: "Quick Issue Reporting",
      description: "Report community issues instantly with GPS location tracking"
    },
    {
      icon: Users,
      title: "Local Service Providers",
      description: "Connect with trusted local professionals and artisans"
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Monitor complaint status with interactive maps and heatmaps"
    },
    {
      icon: BarChart3,
      title: "Community Insights",
      description: "View resolution statistics and community improvement trends"
    }
  ];

  const stats = [
    { number: "500+", label: "Issues Resolved" },
    { number: "200+", label: "Active Providers" },
    { number: "50+", label: "Villages Covered" },
    { number: "95%", label: "Resolution Rate" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Village Head",
      content: "Gaon Connect has transformed how we handle community issues. Problems that took weeks to resolve now get fixed in days.",
      avatar: "👨‍🌾",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Teacher",
      content: "The app is so easy to use! I reported a broken streetlight and it was fixed the next day. Amazing service!",
      avatar: "👩‍🏫",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Local Business Owner",
      content: "As a service provider, this platform has connected me with customers I never knew existed. Great for business!",
      avatar: "👨‍💼",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 text-center overflow-hidden">
        <Carousel.Root opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]} className="absolute inset-0">
          <Carousel.Content>
            <Carousel.Item className="h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url(/bg/bg.avif)' }} />
          </Carousel.Content>
        </Carousel.Root>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6">
                  <img src="/GaoConnect.png" alt="Gaon Connect Logo" className="h-16 md:h-24 w-auto order-2 md:order-1" />
                  <div className="relative">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-gray-800 leading-tight text-center order-1 md:order-2 animate-bounce">
                      {getWelcomeText(languages[welcomeLangIndex]).welcome} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">{getWelcomeText(languages[welcomeLangIndex]).msg}</span>
                    </h1>
                    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-xl sm:text-2xl md:text-4xl lg:text-6xl opacity-20 animate-ping">🌟</div>
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 text-xl sm:text-2xl md:text-4xl lg:text-6xl opacity-20 animate-pulse">✨</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  <div className="relative max-w-4xl mx-auto order-1">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] opacity-8 animate-bounce" style={{animationDuration: '4s'}}>🌳</div>
                      <div className="absolute bottom-4 right-4 text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] animate-pulse" style={{animationDelay: '1s'}}>🐄</div>
                      <div className="absolute top-4 left-4 text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] animate-bounce" style={{animationDelay: '2s'}}>🐄</div>
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-center relative z-10 font-medium">
                      {t("homePage.description")}
                    </p>
                  </div>
                  <img src="/GaoConnect.png" alt="Gaon Connect Logo" className="h-12 md:h-16 w-auto order-2" />
                </div>
              </div>

            

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/report"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <AlertTriangle className="w-6 h-6 mr-3" />
                  Report an Issue
                </Link>
                <Link
                  to="/service-provider"
                  className="inline-flex items-center px-10 py-5 border-3 border-blue-600 text-blue-600 dark:text-blue-400 font-bold text-lg rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Find Services
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:hidden w-72 h-72 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-8xl">🏘️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Issue Counter Ticker */}
      <section className="py-8 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center space-x-4">
              <Clock className="w-8 h-8 text-white animate-pulse" />
              <div className="text-white">
                <div className="text-2xl font-bold">{issueCount.toLocaleString()}+</div>
                <div className="text-white/80">Issues Reported Today</div>
              </div>
              <div className="text-white/60">•</div>
              <div className="text-white">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-white/80">Active Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t("homePage.whyChoose")}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t("homePage.whyChooseDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-xl dark:shadow-none border dark:border-purple-400/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-text/70 leading-relaxed text-base md:text-lg text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Row */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-text/70 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="py-20 px-4 md:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {t("homePage.successStories")}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t("homePage.successStoriesDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-xl dark:shadow-none border dark:border-purple-400/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center mb-6 text-center sm:text-left">
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-0 sm:mr-4">{testimonial.avatar}</div>
                  <div className="text-center sm:text-left">
                    <div className="font-bold text-gray-800 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-text/80 italic text-lg leading-relaxed mb-6 text-center">"{testimonial.content}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Hotline CTA Strip */}
      <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Phone className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Emergency Support Available 24/7</h3>
            <p className="text-white/90 text-lg mb-6">Need immediate assistance? Our emergency hotline is always ready to help.</p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Hotline
            </button>
          </div>
        </div>
      </section>

      {/* Mission-Focused Footer CTA */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of community members who are actively improving their villages through Gaon Connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/report"
                className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <TrendingUp className="w-6 h-6 mr-3" />
                Get Started Today
              </Link>
              <Link
                to="/complaint-tracker"
                className="inline-flex items-center px-10 py-5 border-3 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6 mr-3" />
                Track Progress
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home
