import { motion } from 'framer-motion'
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Certificates from '../sections/Certificates'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Footer from '../components/Footer'

const PortfolioPage = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </motion.div>
  )
}

export default PortfolioPage
