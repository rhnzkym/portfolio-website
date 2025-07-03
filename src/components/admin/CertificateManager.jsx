import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Award,
  Calendar,
  Building,
  ExternalLink
} from 'lucide-react'
import { useData } from '../../contexts/DataContext'
import ImageUpload from './ImageUpload'

const CertificateManager = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    image: null,
    description: '',
    skills: [''],
    credentialId: '',
    verifyUrl: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({
      ...formData,
      [field]: newArray
    })
  }

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    })
  }

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({
      ...formData,
      [field]: newArray
    })
  }

  const openModal = (certificate = null) => {
    if (certificate) {
      setEditingCertificate(certificate)
      setFormData({
        title: certificate.title,
        issuer: certificate.issuer,
        date: certificate.date,
        image: certificate.image || null,
        description: certificate.description,
        skills: certificate.skills || [''],
        credentialId: certificate.credentialId || '',
        verifyUrl: certificate.verifyUrl || ''
      })
    } else {
      setEditingCertificate(null)
      setFormData({
        title: '',
        issuer: '',
        date: '',
        image: null,
        description: '',
        skills: [''],
        credentialId: '',
        verifyUrl: ''
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCertificate(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const certificateData = {
      ...formData,
      skills: formData.skills.filter(item => item.trim() !== '')
    }

    if (editingCertificate) {
      updateCertificate(editingCertificate.id, certificateData)
    } else {
      addCertificate(certificateData)
    }
    
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      deleteCertificate(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificate Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your certifications and achievements</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
        </motion.button>
      </div>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
          >
            {/* Certificate Image */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 flex items-center justify-center relative overflow-hidden">
              {certificate.image ? (
                <img
                  src={certificate.image.data}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Award size={48} className="text-primary-600 dark:text-primary-400" />
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  onClick={() => openModal(certificate)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 dark:bg-gray-800/80 text-blue-600 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(certificate.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 dark:bg-gray-800/80 text-red-600 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Certificate Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {certificate.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Building size={14} />
                  <span>{certificate.issuer}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>{certificate.date}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {certificate.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {certificate.skills?.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {certificate.skills?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                    +{certificate.skills.length - 3} more
                  </span>
                )}
              </div>

              {/* Verify Link */}
              {certificate.verifyUrl && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    <ExternalLink size={14} />
                    <span>Verify Certificate</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {certificates.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No certificates added yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Start by adding your first certificate</p>
            <motion.button
              onClick={() => openModal()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Certificate
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Certificate Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g. React Developer Certification"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Issuer *
                    </label>
                    <input
                      type="text"
                      name="issuer"
                      value={formData.issuer}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g. Meta (Facebook)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Issued *
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g. December 2024"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      name="credentialId"
                      value={formData.credentialId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g. META-REACT-2024-001"
                    />
                  </div>
                </div>

                {/* Certificate Image Upload */}
                <ImageUpload
                  value={formData.image}
                  onChange={(image) => setFormData({...formData, image})}
                  label="Certificate Image"
                  multiple={false}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Describe what this certification covers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills Covered
                  </label>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'skills')}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g. React.js"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'skills')}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    + Add Skill
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification URL
                  </label>
                  <input
                    type="url"
                    name="verifyUrl"
                    value={formData.verifyUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://coursera.org/verify/..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>{editingCertificate ? 'Update' : 'Save'} Certificate</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CertificateManager
