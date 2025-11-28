import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = {
    services: [
      { name: 'Report Issues', path: '/report' },
      { name: 'Track Complaints', path: '/complaint-tracker' },
      { name: 'Find Providers', path: '/service-provider' },
      { name: 'Emergency Services', path: '/report' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Mission', path: '/mission' },
      { name: 'Team', path: '/team' },
      { name: 'Careers', path: '/careers' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ]

  return (
    <footer className="text-gray-800" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/GaoConnect.png" alt="Gaon Connect Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-xl" />
              <span className="text-xl md:text-2xl font-bold">Gaon Connect</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Empowering rural communities through technology. Connecting villagers with essential services and fostering community-driven solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Serving Rural Communities Across India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Emergency: 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm">support@gaonconnect.in</span>
              </div>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/20"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Stay Updated</h3>
            <p className="text-gray-700 text-sm mb-4">
              Get notified about new features and community updates
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/80 border border-white/50 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-700 text-sm text-center md:text-left">
              © 2024 Gaon Connect. Made with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> for rural communities.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  >
                    <social.icon className="w-4 h-4 text-gray-700" />
                  </a>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="text-gray-700 text-sm text-center md:text-right">
              🌍 Available in 5 languages
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer