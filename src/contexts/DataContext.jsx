import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Default data
const defaultExperiences = [
  {
    id: 1,
    title: 'Asisten Praktikum',
    company: 'Program Studi Sistem Informasi – Telkom University Jakarta',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2023 – Jun 2025',
    type: 'Paruh Waktu / Akademik',
    description: 'Mendampingi dosen dalam pelaksanaan praktikum untuk lima mata kuliah berbeda selama tiga semester. Tugas mencakup pembuatan soal kuis, penilaian laporan, pembimbingan teknis, serta membantu mahasiswa dalam menyelesaikan tugas dan proyek praktikum.\n\nMata kuliah yang dibantu:\n• Sistem Enterprise – Mengajarkan dasar penggunaan SAP dan menyusun soal kuis\n• Algoritma dan Pemrograman – Membimbing dasar bahasa pemrograman Python\n• Pengembangan Aplikasi Website – Mengajarkan HTML, PHP, serta framework Laravel\n• Pemrograman Berorientasi Objek (PBO) – Menjelaskan konsep OOP menggunakan Java (encapsulation, inheritance, dll)\n• Manajemen Rantai Pasok (MRP) – Membimbing praktikum SAP modul SCM 500',
    achievements: [
      'Menyusun soal kuis, rubrik penilaian, dan mengevaluasi laporan praktikum',
      'Memberikan bimbingan teknis secara rutin dan diskusi aktif di kelas',
      'Mendukung proses pembelajaran praktikum berbasis proyek'
    ],
    technologies: ['Python', 'Java', 'SAP (Fundamental & SCM 500)', 'Laravel', 'PHP', 'HTML', 'Visual Studio Code', 'Git'],
    color: 'bg-green-500'
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
  },
  {
    id: 2,
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'November 2024',
    image: null,
    description: 'Mastered JavaScript fundamentals, ES6+ features, algorithms, and data structures implementation.',
    skills: ['JavaScript', 'ES6+', 'Algorithms', 'Data Structures'],
    credentialId: 'FCC-JS-2024-002',
    verifyUrl: 'https://freecodecamp.org/verify/js-cert'
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
  },
  {
    id: 2,
    title: 'Food Delivery Mobile App',
    category: 'UI/UX',
    description: 'Complete UI/UX design for a food delivery application with user research, wireframes, and interactive prototypes.',
    images: [],
    technologies: ['Figma', 'Adobe XD', 'Principle', 'User Research'],
    links: {
      live: null,
      github: null,
      figma: 'https://figma.com/food-delivery-app',
      report: 'https://drive.google.com/food-app-research'
    },
    featured: true,
    year: '2024'
  }
]

export const DataProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([])
  const [certificates, setCertificates] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Load data from localStorage or use defaults
    const savedExperiences = localStorage.getItem('portfolioExperiences')
    const savedCertificates = localStorage.getItem('portfolioCertificates')
    const savedProjects = localStorage.getItem('portfolioProjects')

    // Use saved data if it exists (including empty arrays), otherwise use defaults
    setExperiences(savedExperiences !== null ? JSON.parse(savedExperiences) : defaultExperiences)
    setCertificates(savedCertificates !== null ? JSON.parse(savedCertificates) : defaultCertificates)
    setProjects(savedProjects !== null ? JSON.parse(savedProjects) : defaultProjects)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    // Always save experiences, even if empty array
    localStorage.setItem('portfolioExperiences', JSON.stringify(experiences))
  }, [experiences])

  useEffect(() => {
    // Always save certificates, even if empty array
    localStorage.setItem('portfolioCertificates', JSON.stringify(certificates))
  }, [certificates])

  useEffect(() => {
    // Always save projects, even if empty array
    localStorage.setItem('portfolioProjects', JSON.stringify(projects))
  }, [projects])

  // Experience CRUD operations
  const addExperience = (experience) => {
    const newExperience = { ...experience, id: Date.now() }
    setExperiences(prev => [...prev, newExperience])
    return newExperience
  }

  const updateExperience = (id, updatedExperience) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExperience } : exp))
  }

  const deleteExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id))
  }

  // Certificate CRUD operations
  const addCertificate = (certificate) => {
    const newCertificate = { ...certificate, id: Date.now() }
    setCertificates(prev => [...prev, newCertificate])
    return newCertificate
  }

  const updateCertificate = (id, updatedCertificate) => {
    setCertificates(prev => prev.map(cert => cert.id === id ? { ...cert, ...updatedCertificate } : cert))
  }

  const deleteCertificate = (id) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id))
  }

  // Project CRUD operations
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now() }
    setProjects(prev => [...prev, newProject])
    return newProject
  }

  const updateProject = (id, updatedProject) => {
    setProjects(prev => prev.map(proj => proj.id === id ? { ...proj, ...updatedProject } : proj))
  }

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(proj => proj.id !== id))
  }

  const value = {
    experiences,
    certificates,
    projects,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertificate,
    updateCertificate,
    deleteCertificate,
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
