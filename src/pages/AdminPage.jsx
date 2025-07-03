import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '../components/admin/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import ExperienceManager from '../components/admin/ExperienceManager'
import CertificateManager from '../components/admin/CertificateManager'
import ProjectManager from '../components/admin/ProjectManager'

const AdminPage = ({ darkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'experience':
        return <ExperienceManager />
      case 'certificates':
        return <CertificateManager />
      case 'projects':
        return <ProjectManager />
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {renderContent()}
    </AdminLayout>
  )
}

export default AdminPage
