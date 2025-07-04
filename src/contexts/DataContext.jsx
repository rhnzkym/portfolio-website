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
    title: 'Ketua Departemen Riset & Teknologi',
    company: 'Himpunan Mahasiswa Sistem Informasi – Telkom University Jakarta',
    location: 'Jakarta, Indonesia',
    period: 'Jan 2025 – Sekarang',
    type: 'Organisasi',
    description: 'Memimpin departemen teknologi, merancang program kerja, dan mengelola pelaksanaan kegiatan berbasis pengembangan skill teknologi.',
    achievements: [
      'Menginisiasi dan mengelola pembuatan website resmi himpunan',
      'Mengoordinasi anggota dalam pelaksanaan program tahunan'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'HTML/CSS'],
    color: 'bg-purple-500'
  },
  {
    id: 2,
    title: 'Anggota Tim – Pengabdian Masyarakat',
    company: 'Program Studi Sistem Informasi – Telkom University Jakarta',
    location: 'SMK Nagrak Boarding School, Purwakarta',
    period: 'Mar 2025 – Jul 2025',
    type: 'Proyek Sosial',
    description: 'Merancang dan membangun Sistem Informasi Manajemen Aset untuk sekolah mitra.',
    achievements: [
      'Menganalisis kebutuhan sistem bersama pihak sekolah',
      'Membangun dan mengimplementasikan sistem informasi manajemen aset',
      'Memberikan pelatihan penggunaan sistem kepada staf'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'HTML/CSS'],
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Asisten Praktikum',
    company: 'Program Studi Sistem Informasi – Telkom University Jakarta',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2023 – Jan 2025',
    type: 'Paruh Waktu',
    description: 'Mendampingi dosen dalam pelaksanaan praktikum lima mata kuliah: Sistem Enterprise, Algoritma dan Pemrograman, PBO, Pengembangan Web, dan MRP.',
    achievements: [
      'Menyusun soal kuis dan rubrik penilaian',
      'Melakukan penilaian laporan praktikum',
      'Membimbing teknis langsung di kelas',
      'Membimbing teknis langsung di 5 mata kuliah selama 3 semester'
    ],
    technologies: ['Python', 'Java', 'SAP', 'Laravel', 'PHP', 'HTML', 'Git', 'VS Code'],
    color: 'bg-green-500'
  },
  {
    id: 4,
    title: 'Staf Humas – Content Planner',
    company: 'Himpunan Mahasiswa Sistem Informasi – Telkom University Jakarta',
    location: 'Jakarta, Indonesia',
    period: 'Jan 2024 – Des 2024',
    type: 'Organisasi',
    description: 'Menyusun dan menjadwalkan konten media sosial serta mendukung kegiatan internal organisasi.',
    achievements: [
      'Membuat kalender konten media sosial',
      'Menjadi pengisi games/interaktif dalam acara himpunan',
      'Berkoordinasi dengan tim media dan desain'
    ],
    technologies: [],
    color: 'bg-pink-500'
  },
  {
    id: 5,
    title: 'Pengawas TPS – Pilkada Tangerang Selatan 2024',
    company: 'Bawaslu Kota Tangerang Selatan',
    location: 'Pamulang Barat',
    period: 'Nov 2024',
    type: 'Kegiatan Event',
    description: 'Ditugaskan sebagai PTPS dalam Pilkada Serentak 2024 di wilayah Kelurahan Pamulang Barat.',
    achievements: [
      'Menjalankan tugas pengawasan penuh di hari H',
      'Membuat laporan hasil pemantauan TPS secara lengkap',
      'Menjaga netralitas dan ketertiban jalannya pemilu'
    ],
    technologies: [],
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: 'Liaison Officer – PKKMB 2024',
    company: 'Telkom University Jakarta',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2024',
    type: 'Kegiatan Event / Relawan',
    description: 'Mendampingi mahasiswa baru selama kegiatan orientasi kampus.',
    achievements: [
      'Menyampaikan informasi teknis dan jadwal kegiatan',
      'Menjadi penghubung antara panitia dan peserta',
      'Menjaga komunikasi serta suasana kondusif di kelompok'
    ],
    technologies: [],
    color: 'bg-indigo-500'
  },
  {
    id: 7,
    title: 'Pengawas TPS – Pemilu Presiden 2024',
    company: 'Bawaslu Kota Tangerang Selatan',
    location: 'Pamulang Barat',
    period: 'Feb 2024',
    type: 'Kegiatan Event',
    description: 'Bertugas mengawasi proses pemungutan dan penghitungan suara di TPS dalam Pemilu Presiden.',
    achievements: [
      'Menjalankan tugas pengawasan penuh di hari H',
      'Membuat laporan hasil pemantauan TPS secara lengkap',
      'Menjaga netralitas dan ketertiban jalannya pemilu'
    ],
    technologies: [],
    color: 'bg-orange-500'
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
