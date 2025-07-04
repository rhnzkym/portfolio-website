import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// You'll need to replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const portfolioService = {
  // Experiences
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching experiences:', error)
      return []
    }
    return data || []
  },

  async addExperience(experience) {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experience])
      .select()
    
    if (error) {
      console.error('Error adding experience:', error)
      throw error
    }
    return data[0]
  },

  async updateExperience(id, experience) {
    const { data, error } = await supabase
      .from('experiences')
      .update(experience)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating experience:', error)
      throw error
    }
    return data[0]
  },

  async deleteExperience(id) {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting experience:', error)
      throw error
    }
  },

  // Certificates
  async getCertificates() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching certificates:', error)
      return []
    }
    return data || []
  },

  async addCertificate(certificate) {
    const { data, error } = await supabase
      .from('certificates')
      .insert([certificate])
      .select()
    
    if (error) {
      console.error('Error adding certificate:', error)
      throw error
    }
    return data[0]
  },

  async updateCertificate(id, certificate) {
    const { data, error } = await supabase
      .from('certificates')
      .update(certificate)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating certificate:', error)
      throw error
    }
    return data[0]
  },

  async deleteCertificate(id) {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting certificate:', error)
      throw error
    }
  },

  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  },

  async addProject(project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
    
    if (error) {
      console.error('Error adding project:', error)
      throw error
    }
    return data[0]
  },

  async updateProject(id, project) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating project:', error)
      throw error
    }
    return data[0]
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}
