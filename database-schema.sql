-- Portfolio Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
-- For public read access and admin write access

-- 1. Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  start_date VARCHAR(50) NOT NULL,
  end_date VARCHAR(50),
  current_job BOOLEAN DEFAULT FALSE,
  description TEXT,
  technologies TEXT[], -- Array of technology strings
  color VARCHAR(50) DEFAULT 'bg-blue-500',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  image JSONB, -- Store image data as JSON {id, data, name}
  description TEXT,
  skills TEXT[], -- Array of skill strings
  credential_id VARCHAR(255),
  verify_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  images JSONB[], -- Array of image objects [{id, data, name}, ...]
  technologies TEXT[], -- Array of technology strings
  links JSONB, -- Store links as JSON {live, github, figma, report}
  featured BOOLEAN DEFAULT FALSE,
  year VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for experiences" 
ON experiences FOR SELECT 
USING (true);

CREATE POLICY "Public read access for certificates" 
ON certificates FOR SELECT 
USING (true);

CREATE POLICY "Public read access for projects" 
ON projects FOR SELECT 
USING (true);

-- Create policies for admin write access (you can customize this)
-- For now, allowing all authenticated users to write
-- In production, you should restrict this to specific admin users

CREATE POLICY "Admin write access for experiences" 
ON experiences FOR ALL 
USING (true);

CREATE POLICY "Admin write access for certificates" 
ON certificates FOR ALL 
USING (true);

CREATE POLICY "Admin write access for projects" 
ON projects FOR ALL 
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experiences_created_at ON experiences(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Insert sample data (optional)
INSERT INTO experiences (title, company, location, start_date, end_date, current_job, description, technologies, color) VALUES
('Software Developer Intern', 'Tech Company', 'Jakarta, Indonesia', 'June 2024', 'August 2024', false, 'Developed web applications using React and Node.js', ARRAY['React', 'Node.js', 'JavaScript', 'MongoDB'], 'bg-blue-500'),
('Frontend Developer', 'Startup Inc', 'Remote', 'September 2024', 'Present', true, 'Building modern web interfaces with React and TypeScript', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'], 'bg-green-500')
ON CONFLICT DO NOTHING;

INSERT INTO certificates (title, issuer, date, description, skills, credential_id, verify_url) VALUES
('React Developer Certification', 'Meta (Facebook)', 'December 2024', 'Comprehensive certification covering React fundamentals, hooks, state management, and advanced patterns.', ARRAY['React.js', 'JSX', 'Hooks', 'State Management'], 'META-REACT-2024-001', 'https://coursera.org/verify/react-cert'),
('JavaScript Algorithms and Data Structures', 'freeCodeCamp', 'November 2024', 'Mastered JavaScript fundamentals, ES6+ features, algorithms, and data structures implementation.', ARRAY['JavaScript', 'ES6+', 'Algorithms', 'Data Structures'], 'FCC-JS-2024-002', 'https://freecodecamp.org/verify/js-cert')
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, category, description, technologies, links, featured, year) VALUES
('E-Commerce Dashboard', 'Web Dev', 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.', ARRAY['React.js', 'Node.js', 'MongoDB', 'Chart.js'], '{"live": "https://ecommerce-dashboard-demo.com", "github": "https://github.com/raihanzaky/ecommerce-dashboard"}', true, '2024'),
('Food Delivery Mobile App', 'UI/UX', 'Complete UI/UX design for a food delivery application with user research, wireframes, and interactive prototypes.', ARRAY['Figma', 'Adobe XD', 'Principle', 'User Research'], '{"figma": "https://figma.com/food-delivery-app", "report": "https://drive.google.com/food-app-research"}', true, '2024')
ON CONFLICT DO NOTHING;
