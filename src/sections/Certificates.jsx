import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, Calendar, Building } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null)
  const { certificates } = useData()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section id="certificates" className="section-padding bg-gray-50 dark:bg-gray-800">
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
              My <span className="gradient-text">Certificates</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Continuous learning and professional development through certified courses and programs
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Certificate Image */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 flex items-center justify-center relative overflow-hidden">
                  {cert.image ? (
                    <>
                      <img
                        src={cert.image.data}
                        alt={cert.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20"></div>
                      <Award size={48} className="text-primary-600 dark:text-primary-400 z-10" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/10 rounded-full"
                      />
                    </>
                  )}
                </div>

                {/* Certificate Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <Building size={14} />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-between pt-2"
                  >
                    <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                      View Details
                    </span>
                    <ExternalLink size={16} className="text-primary-600 dark:text-primary-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Certificate Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Certificate Preview */}
                <div className="h-96 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center overflow-hidden">
                  {selectedCert.image ? (
                    <img
                      src={selectedCert.image.data}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <Award size={64} className="text-primary-600 dark:text-primary-400" />
                  )}
                </div>

                {/* Certificate Info */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCert.title}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Building size={16} />
                      <span><strong>Issuer:</strong> {selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span><strong>Date:</strong> {selectedCert.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedCert.description}
                  </p>

                  {/* All Skills */}
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Covered:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credential Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Credential ID:</strong> {selectedCert.credentialId}
                    </p>
                    {selectedCert.image ? (
                      <motion.button
                        onClick={() => window.open(selectedCert.image.data, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        <span>Detail Certificate</span>
                      </motion.button>
                    ) : selectedCert.verifyUrl ? (
                      <motion.a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                      >
                        <ExternalLink size={16} />
                        <span>Verify Certificate</span>
                      </motion.a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certificates
