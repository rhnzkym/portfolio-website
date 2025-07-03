import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Award, 
  FolderOpen, 
  TrendingUp, 
  Calendar,
  Plus,
  Eye,
  Edit
} from 'lucide-react'
import { useData } from '../../contexts/DataContext'

const Dashboard = ({ setActiveTab }) => {
  const { experiences, certificates, projects } = useData()

  const stats = [
    {
      title: 'Total Experience',
      value: experiences.length,
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Certificates',
      value: certificates.length,
      icon: Award,
      color: 'bg-green-500',
      change: '+1 this month'
    },
    {
      title: 'Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'bg-purple-500',
      change: '+3 this month'
    },
    {
      title: 'Portfolio Views',
      value: '1.2K',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15% this week'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'Added new project',
      item: 'E-Commerce Dashboard',
      time: '2 hours ago',
      type: 'project'
    },
    {
      id: 2,
      action: 'Updated experience',
      item: 'Frontend Developer Intern',
      time: '1 day ago',
      type: 'experience'
    },
    {
      id: 3,
      action: 'Added certificate',
      item: 'React Developer Certification',
      time: '3 days ago',
      type: 'certificate'
    }
  ]

  const quickActions = [
    {
      title: 'Add Experience',
      description: 'Add new work experience',
      icon: Briefcase,
      color: 'bg-blue-500',
      action: () => setActiveTab('experience')
    },
    {
      title: 'Add Certificate',
      description: 'Add new certification',
      icon: Award,
      color: 'bg-green-500',
      action: () => setActiveTab('certificates')
    },
    {
      title: 'Add Project',
      description: 'Add new project',
      icon: FolderOpen,
      color: 'bg-purple-500',
      action: () => setActiveTab('projects')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="text-primary-100">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <div className="hidden md:block">
            <Calendar size={48} className="text-primary-200" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-green-600 dark:text-green-400 text-xs">
                {stat.change}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.title}
                  onClick={action.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <Plus className="text-gray-400 ml-auto" size={20} />
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'project' ? 'bg-purple-100 dark:bg-purple-900/30' :
                  activity.type === 'experience' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-green-100 dark:bg-green-900/30'
                }`}>
                  {activity.type === 'project' && <FolderOpen size={16} className="text-purple-600 dark:text-purple-400" />}
                  {activity.type === 'experience' && <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'certificate' && <Award size={16} className="text-green-600 dark:text-green-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Items Preview */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Items
          </h3>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Eye size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Edit size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Latest Experience */}
          {experiences.length > 0 && (
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Latest Experience</span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {experiences[experiences.length - 1]?.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {experiences[experiences.length - 1]?.company}
              </p>
            </div>
          )}

          {/* Latest Certificate */}
          {certificates.length > 0 && (
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award size={16} className="text-green-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Latest Certificate</span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {certificates[certificates.length - 1]?.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {certificates[certificates.length - 1]?.issuer}
              </p>
            </div>
          )}

          {/* Latest Project */}
          {projects.length > 0 && (
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FolderOpen size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Latest Project</span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {projects[projects.length - 1]?.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {projects[projects.length - 1]?.category}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
