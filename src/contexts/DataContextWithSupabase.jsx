import { createContext, useContext, useState, useEffect } from 'react'
import { portfolioService } from '../lib/supabase'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Default data (fallback when database is not available)
const defaultExperiences = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'Tech Company',
    location: 'Jakarta, Indonesia',
    startDate: 'June 2024',
    endDate: 'August 2024',
    currentJob: false,
    description: 'Developed web applications using React and Node.js. Collaborated with senior developers to implement new features and fix bugs.',
    technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    color: 'bg-blue-500'
  }
]

const defaultCertificates = [
  {
    id: 1,
    title: 'React Developer Certification',
    issuer: 'Meta (Facebook)',
    date: 'December 2024',
    image: null,
    description: 'Comprehensive certification covering React fundamentals, hooks, state management, and advanced patterns.',
    skills: ['React.js', 'JSX', 'Hooks', 'State Management'],
    credentialId: 'META-REACT-2024-001',
    verifyUrl: 'https://coursera.org/verify/react-cert'
  }
]

const defaultProjects = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    category: 'Web Dev',
    description: 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.',
    images: [],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Chart.js'],
    links: {
      live: 'https://ecommerce-dashboard-demo.com',
      github: 'https://github.com/raihanzaky/ecommerce-dashboard',
      figma: null,
      report: null
    },
    featured: true,
    year: '2024'
  }
]

export const DataProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([])
  const [certificates, setCertificates] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [useDatabase, setUseDatabase] = useState(false)

  // Check if Supabase is configured
  const isSupabaseConfigured = () => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    return url && key && url !== 'YOUR_SUPABASE_URL' && key !== 'YOUR_SUPABASE_ANON_KEY'
  }

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      
      if (isSupabaseConfigured()) {
        try {
          // Try to load from Supabase
          const [expData, certData, projData] = await Promise.all([
            portfolioService.getExperiences(),
            portfolioService.getCertificates(),
            portfolioService.getProjects()
          ])
          
          setExperiences(expData.length > 0 ? expData : defaultExperiences)
          setCertificates(certData.length > 0 ? certData : defaultCertificates)
          setProjects(projData.length > 0 ? projData : defaultProjects)
          setUseDatabase(true)
          
          console.log('✅ Data loaded from Supabase')
        } catch (error) {
          console.error('❌ Supabase error, falling back to localStorage:', error)
          loadFromLocalStorage()
        }
      } else {
        console.log('📱 Supabase not configured, using localStorage')
        loadFromLocalStorage()
      }
      
      setLoading(false)
    }

    const loadFromLocalStorage = () => {
      const savedExperiences = localStorage.getItem('portfolioExperiences')
      const savedCertificates = localStorage.getItem('portfolioCertificates')
      const savedProjects = localStorage.getItem('portfolioProjects')

      setExperiences(savedExperiences !== null ? JSON.parse(savedExperiences) : defaultExperiences)
      setCertificates(savedCertificates !== null ? JSON.parse(savedCertificates) : defaultCertificates)
      setProjects(savedProjects !== null ? JSON.parse(savedProjects) : defaultProjects)
      setUseDatabase(false)
    }

    loadData()
  }, [])

  // Save to localStorage (fallback)
  useEffect(() => {
    if (!loading && !useDatabase) {
      localStorage.setItem('portfolioExperiences', JSON.stringify(experiences))
    }
  }, [experiences, loading, useDatabase])

  useEffect(() => {
    if (!loading && !useDatabase) {
      localStorage.setItem('portfolioCertificates', JSON.stringify(certificates))
    }
  }, [certificates, loading, useDatabase])

  useEffect(() => {
    if (!loading && !useDatabase) {
      localStorage.setItem('portfolioProjects', JSON.stringify(projects))
    }
  }, [projects, loading, useDatabase])

  // Experience CRUD operations
  const addExperience = async (experience) => {
    const newExperience = { ...experience, id: Date.now() }
    
    if (useDatabase) {
      try {
        const savedExp = await portfolioService.addExperience(newExperience)
        setExperiences(prev => [savedExp, ...prev])
        return savedExp
      } catch (error) {
        console.error('Error adding experience to database:', error)
        // Fallback to local
        setExperiences(prev => [newExperience, ...prev])
        return newExperience
      }
    } else {
      setExperiences(prev => [newExperience, ...prev])
      return newExperience
    }
  }

  const updateExperience = async (id, updatedExperience) => {
    if (useDatabase) {
      try {
        const updated = await portfolioService.updateExperience(id, updatedExperience)
        setExperiences(prev => prev.map(exp => exp.id === id ? updated : exp))
        return updated
      } catch (error) {
        console.error('Error updating experience in database:', error)
        // Fallback to local
        setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExperience } : exp))
      }
    } else {
      setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExperience } : exp))
    }
  }

  const deleteExperience = async (id) => {
    if (useDatabase) {
      try {
        await portfolioService.deleteExperience(id)
        setExperiences(prev => prev.filter(exp => exp.id !== id))
      } catch (error) {
        console.error('Error deleting experience from database:', error)
        // Fallback to local
        setExperiences(prev => prev.filter(exp => exp.id !== id))
      }
    } else {
      setExperiences(prev => prev.filter(exp => exp.id !== id))
    }
  }

  // Certificate CRUD operations
  const addCertificate = async (certificate) => {
    const newCertificate = { ...certificate, id: Date.now() }
    
    if (useDatabase) {
      try {
        const saved = await portfolioService.addCertificate(newCertificate)
        setCertificates(prev => [saved, ...prev])
        return saved
      } catch (error) {
        console.error('Error adding certificate to database:', error)
        setCertificates(prev => [newCertificate, ...prev])
        return newCertificate
      }
    } else {
      setCertificates(prev => [newCertificate, ...prev])
      return newCertificate
    }
  }

  const updateCertificate = async (id, updatedCertificate) => {
    if (useDatabase) {
      try {
        const updated = await portfolioService.updateCertificate(id, updatedCertificate)
        setCertificates(prev => prev.map(cert => cert.id === id ? updated : cert))
        return updated
      } catch (error) {
        console.error('Error updating certificate in database:', error)
        setCertificates(prev => prev.map(cert => cert.id === id ? { ...cert, ...updatedCertificate } : cert))
      }
    } else {
      setCertificates(prev => prev.map(cert => cert.id === id ? { ...cert, ...updatedCertificate } : cert))
    }
  }

  const deleteCertificate = async (id) => {
    if (useDatabase) {
      try {
        await portfolioService.deleteCertificate(id)
        setCertificates(prev => prev.filter(cert => cert.id !== id))
      } catch (error) {
        console.error('Error deleting certificate from database:', error)
        setCertificates(prev => prev.filter(cert => cert.id !== id))
      }
    } else {
      setCertificates(prev => prev.filter(cert => cert.id !== id))
    }
  }

  // Project CRUD operations
  const addProject = async (project) => {
    const newProject = { ...project, id: Date.now() }
    
    if (useDatabase) {
      try {
        const saved = await portfolioService.addProject(newProject)
        setProjects(prev => [saved, ...prev])
        return saved
      } catch (error) {
        console.error('Error adding project to database:', error)
        setProjects(prev => [newProject, ...prev])
        return newProject
      }
    } else {
      setProjects(prev => [newProject, ...prev])
      return newProject
    }
  }

  const updateProject = async (id, updatedProject) => {
    if (useDatabase) {
      try {
        const updated = await portfolioService.updateProject(id, updatedProject)
        setProjects(prev => prev.map(proj => proj.id === id ? updated : proj))
        return updated
      } catch (error) {
        console.error('Error updating project in database:', error)
        setProjects(prev => prev.map(proj => proj.id === id ? { ...proj, ...updatedProject } : proj))
      }
    } else {
      setProjects(prev => prev.map(proj => proj.id === id ? { ...proj, ...updatedProject } : proj))
    }
  }

  const deleteProject = async (id) => {
    if (useDatabase) {
      try {
        await portfolioService.deleteProject(id)
        setProjects(prev => prev.filter(proj => proj.id !== id))
      } catch (error) {
        console.error('Error deleting project from database:', error)
        setProjects(prev => prev.filter(proj => proj.id !== id))
      }
    } else {
      setProjects(prev => prev.filter(proj => proj.id !== id))
    }
  }

  const value = {
    // Data
    experiences,
    certificates,
    projects,
    loading,
    useDatabase,
    
    // Experience methods
    addExperience,
    updateExperience,
    deleteExperience,
    
    // Certificate methods
    addCertificate,
    updateCertificate,
    deleteCertificate,
    
    // Project methods
    addProject,
    updateProject,
    deleteProject
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
