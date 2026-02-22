# CircularPath Platform – All-India Agricultural Waste Intelligence

CircularPath is a platform that helps identify, classify, and utilize agricultural waste across India.
The system automatically detects waste properties and provides recommendations for processing pathways, enabling better waste management, sustainability, and resource utilization.

This version of the platform has been **focused system to a complete all-India platform** with improved data structures and automation.

---

# Features

## 1. All-India Geographic Coverage

The platform now supports:

* 28 Indian States
* 8 Union Territories
* Hierarchical location selection:

  * State → District → City

This allows users from anywhere in India to analyze agricultural waste and receive recommendations.

---

## 2. Intelligent Waste Classification

The platform includes a built-in waste database with **16+ agricultural waste types** and automated property detection.

Each waste type includes:

* Moisture Content (Automatically detected)
* Biodegradable Percentage
* Carbon Content
* Waste Category

### Supported Waste Categories

* Rice
* Coconut
* Banana
* Sugarcane
* Cotton
* Groundnut
* Maize

### Waste Types Covered

Rice:

* Husk
* Bran
* Straw

Coconut:

* Fiber
* Shell
* Pith

Banana:

* Peel
* Stem
* Leaf

Sugarcane:

* Bagasse
* Trash

Cotton:

* Stalk
* Seed Hull

Groundnut:

* Shell
* Haulm

Maize:

* Stover
* Cob

The system automatically determines:

* Dry waste
* Wet waste
* Mixed waste

Users no longer need to manually select waste nature.

---

# Platform Workflow

1. Select State
2. Select District
3. Select City
4. Select Crop Type
5. Select Waste Type
6. Enter Quantity
7. Receive Processing Recommendations

The system then:

* Identifies waste properties
* Matches processing pathways
* Provides utilization recommendations

---

# Key Improvements

## Reduced User Friction

* Removed manual "Waste Nature" selection
* Automated waste property detection
* Simplified input workflow

## Better Data Quality

* Standardized waste property database
* Consistent classification system
* Accurate recommendations

## Nationwide Scalability

* All-India coverage
* Expandable waste database
* Easily extendable geography system

---

# Project Structure

```
app/
 ├── page.tsx
 ├── assess/
 │    └── page.tsx
 ├── recommendation/
 │    └── page.tsx
 ├── facility-mapping/
 │    └── page.tsx
 ├── methodology/
 └── impact-estimation/

lib/
 ├── waste-database.ts
 └── india-geography.ts
```

---

# Core Modules

## Waste Database

File:

```
/lib/waste-database.ts
```

Contains:

* Waste properties
* Crop categories
* Moisture classification
* Filtering utilities

Helper functions:

* getWastesByCategory()
* getWasteMoistureContent()
* getWasteType()

---

## India Geography Database

File:

```
/lib/india-geography.ts
```

Contains:

* State list
* District data
* City mapping

Helper functions:

* getStateNames()
* getState()
* getDistrictsByState()
* getCitiesByDistrict()

---

# Pages

## Landing Page

File:

```
/app/page.tsx
```

Highlights:

* All-India agricultural waste statistics
* Platform overview
* User categories (MSMEs, FPOs, Researchers)

---

## Waste Assessment

File:

```
/app/assess/page.tsx
```

Allows users to:

* Enter waste details
* Select location
* Choose crop and waste type
* Submit data for recommendations

---

## Facility Mapping

File:

```
/app/facility-mapping/page.tsx
```

Displays:

* Processing facilities
* Regional infrastructure network

---

## Recommendation Engine

File:

```
/app/recommendation/page.tsx
```

Provides:

* Processing methods
* Waste utilization pathways
* Sustainability insights

---

# Technology Stack

Frontend

* Next.js
* React
* TypeScript

Backend / Data

* TypeScript-based structured datasets
* Scalable architecture for future database integration

Deployment

* Vercel

---

# Testing Checklist

* State selection loads districts correctly
* District selection loads cities correctly
* Crop selection loads waste types
* Moisture content auto-detection works
* Form validation works correctly
* Navigation to recommendations works
* Facility mapping loads properly
* All India references updated

---

# Deployment Notes

No database migration required.
All data is stored in structured TypeScript files.

Future upgrades may include:

* Database integration
* Regional waste production statistics
* Seasonal crop variations
* Facility location intelligence
* Government subsidy mapping

---

# Future Roadmap

Planned improvements:

* AI-based waste pathway optimization
* Facility recommendation engine
* Supply chain mapping
* Carbon footprint analysis
* Industrial partner integration

---

# Contribution

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new feature branch
3. Commit changes
4. Submit a pull request

---

# License

This project is intended for research, sustainability, and waste management innovation.
