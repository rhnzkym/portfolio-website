import { motion } from 'framer-motion'
import { Download, ArrowDown, Code, Palette, Shield } from 'lucide-react'

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 hero-spacing">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="gradient-text">Raihan</span>
                <br />
                <span className="text-gray-700 dark:text-gray-300">Zaky Maulana</span>
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
                >
                  <Code size={16} className="text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Web Developer</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
                >
                  <Palette size={16} className="text-purple-600" />
                  <span className="text-gray-700 dark:text-gray-300">UI/UX Designer</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
                >
                  <Shield size={16} className="text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">System Analyst</span>
                </motion.div>
              </div>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Mahasiswa Sistem Informasi di <span className="font-semibold text-primary-600 dark:text-primary-400">Telkom University Jakarta</span> yang tertarik dengan teknologi dan pengembangan digital.
                Suka belajar hal baru dan terus mencoba hal-hal yang bisa bawa dampak positif lewat karya.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
                onClick={() => window.open('/CV-Raihan-Zaky-Maulana.pdf', '_blank')}
              >
                <Download size={20} />
                <span>Download CV</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </motion.button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 md:w-96 md:h-96"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 rounded-full p-1">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full p-4">
                    {/* Profile Image */}
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/foto-raihan.jpg"
                        alt="Raihan Zaky Maulana"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Code size={24} />
                </motion.div>
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Palette size={24} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
