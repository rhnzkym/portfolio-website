import { motion } from 'framer-motion'
import {
  Code2,
  Palette,
  Shield,
  Database,
  Globe,
  Smartphone,
  Coffee,
  Music,
  Camera,
  BookOpen,
  Gamepad2,
  Settings
} from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Frontend Development', icon: Code2, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'UI/UX Design', icon: Palette, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { name: 'System Analysis', icon: Shield, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Database Management', icon: Database, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Web Development', icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { name: 'ERP (SAP)', icon: Settings, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
  ]

  const interests = [
    { name: 'Dengerin Musik', icon: Music, description: 'Musik jadi temen paling setia buat bantu fokus atau sekadar santai.' },
    { name: 'Main Game', icon: Gamepad2, description: 'Kadang butuh juga healing lewat game biar kepala nggak ngebul.' },
    { name: 'Eksplor Hal Baru', icon: BookOpen, description: 'Suka banget cari tahu hal-hal baru, apalagi yang berhubungan sama teknologi atau ide-ide kreatif.' },
  ]

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

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get to know more about who I am, what I do, and what skills I have
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Personal Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Who I Am
                </h3>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p className="leading-relaxed">
                    Saya adalah mahasiswa Sistem Informasi di <span className="font-semibold text-primary-600 dark:text-primary-400">Telkom University Jakarta</span> yang tertarik memahami cara kerja sistem dan bagaimana teknologi dapat menyelesaikan masalah sehari-hari. Rasa ingin tahu mendorong saya untuk terus belajar, baik di dalam maupun di luar kelas.
                  </p>

                  <p className="leading-relaxed">
                    Selama kuliah, saya aktif dalam berbagai kegiatan seperti asisten praktikum, pelatihan dan sertifikasi, serta kepanitiaan kampus. Pengalaman ini mengajarkan saya pentingnya kerja sama, tanggung jawab, dan komunikasi.
                  </p>

                  <p className="leading-relaxed">
                    Bagi saya, berkembang bukan hanya soal keterampilan teknis, tapi juga bagaimana menjadi pribadi yang adaptif dan terbuka. Portofolio ini adalah refleksi dari perjalanan dan karya yang terus saya bangun.
                  </p>
                </div>

                {/* Quote */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border-l-4 border-primary-500"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic text-lg">
                    "Code is like humor. When you have to explain it, it's bad."
                  </p>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mt-2">
                    - Cory House
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  My Skills
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${skill.bg} p-4 rounded-xl text-center space-y-2 cursor-pointer transition-all duration-300 hover:shadow-md`}
                      >
                        <Icon className={`${skill.color} mx-auto`} size={32} />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  When I'm Not Coding
                </h3>
                
                <div className="space-y-4">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon
                    return (
                      <motion.div
                        key={interest.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <Icon className="text-primary-600 dark:text-primary-400" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {interest.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {interest.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
