-- Waste streams table
CREATE TABLE IF NOT EXISTS waste_streams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  typical_composition JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Waste assessments table
CREATE TABLE IF NOT EXISTS waste_assessments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  facility_name VARCHAR(255) NOT NULL,
  facility_type VARCHAR(100) NOT NULL,
  waste_stream_id INTEGER REFERENCES waste_streams(id),
  quantity_tonnes_per_day DECIMAL(10, 2),
  quantity_tonnes_per_year DECIMAL(10, 2),
  moisture_content DECIMAL(5, 2),
  notes TEXT,
  assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversion pathways table
CREATE TABLE IF NOT EXISTS conversion_pathways (
  id SERIAL PRIMARY KEY,
  waste_stream_id INTEGER REFERENCES waste_streams(id),
  pathway_name VARCHAR(255) NOT NULL,
  end_product VARCHAR(255) NOT NULL,
  technical_feasibility VARCHAR(20), -- HIGH, MEDIUM, LOW
  environmental_impact VARCHAR(255),
  economic_potential VARCHAR(20), -- HIGH, MEDIUM, LOW
  required_infrastructure TEXT,
  processing_technology TEXT,
  yield_percentage DECIMAL(5, 2),
  estimated_revenue_per_tonne DECIMAL(10, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER REFERENCES waste_assessments(id),
  pathway_id INTEGER REFERENCES conversion_pathways(id),
  technical_score DECIMAL(3, 2), -- 0-1
  economic_score DECIMAL(3, 2), -- 0-1
  environmental_score DECIMAL(3, 2), -- 0-1
  feasibility_status VARCHAR(50), -- RECOMMENDED, FEASIBLE, CHALLENGING, NOT_FEASIBLE
  implementation_requirements TEXT,
  estimated_investment DECIMAL(12, 2),
  payback_period_years DECIMAL(5, 2),
  annual_revenue_potential DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Infrastructure/facilities database
CREATE TABLE IF NOT EXISTS processing_facilities (
  id SERIAL PRIMARY KEY,
  facility_name VARCHAR(255) NOT NULL,
  location_district VARCHAR(100),
  location_taluk VARCHAR(100),
  facility_type VARCHAR(100),
  processing_capacity_tonnes_per_day DECIMAL(10, 2),
  capabilities TEXT,
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_waste_stream_category ON waste_streams(category);
CREATE INDEX idx_assessment_user ON waste_assessments(user_id);
CREATE INDEX idx_assessment_date ON waste_assessments(assessment_date);
CREATE INDEX idx_pathway_waste_stream ON conversion_pathways(waste_stream_id);
CREATE INDEX idx_result_assessment ON assessment_results(assessment_id);
CREATE INDEX idx_facility_location ON processing_facilities(location_district);
