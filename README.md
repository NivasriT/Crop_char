````markdown
# 🌾 CropChar — Team Solvex

> A single-dashboard crop-fire risk management system.

### 🔥 PREDICT → PREVENT → DETECT → RESPOND → LEARN

CropChar is a smart crop-fire risk platform that brings risk prediction, fire detection, geospatial field information, and response workflows together in a single dashboard.

---

## 🎯 What is CropChar?

CropChar is designed to identify potential crop-fire risks early and support timely intervention.

It combines:

- 🤖 Risk Prediction
- 🛡️ Fire Prevention
- 🔥 Fire Detection
- 🚨 Response Management
- 🗺️ GIS-based Field Mapping
- 🏢 Nearby Company / Marketplace Matching
- 🧠 Data-driven Learning

---

## 🔄 How It Works

```text
🌾 Agricultural Field
        ↓
🗺️ GIS Field Data
        ↓
🤖 Risk Prediction
        ↓
🛡️ Prevention
        ↓
🔥 Fire Detection
        ↓
🚨 Response
        ↓
📍 Location & Distance Analysis
        ↓
🏢 Nearby Company Matching
        ↓
♻️ Crop Residue Utilization
        ↓
🧠 Learn
````

---

## ✨ Key Features

### 🤖 1. Risk Prediction

The ML module processes relevant historical fire information to identify potential crop-fire risk.

```text
Historical Fire Data
        ↓
ML Risk Model
        ↓
Risk Prediction
        ↓
LOW / MEDIUM / HIGH
```

---

### 🔥 2. Fire Detection

The fire pipeline processes fire/hotspot information and connects it with agricultural field locations.

```text
Fire / Hotspot Data
        ↓
Data Processing
        ↓
Geospatial Matching
        ↓
Potential Field Risk
```

---

### 🗺️ 3. GIS Field Mapping

CropChar uses GeoJSON-based field boundaries to represent agricultural fields and their locations.

GIS data includes:

* Field boundaries
* Field locations
* Geographic coordinates
* Location-based analysis
* Marketplace locations

---

### ⏳ 4. Risk Response

When a field is identified as requiring intervention, CropChar supports a response workflow designed to help stakeholders act quickly.

```text
Risk Identified
      ↓
Alert / Intervention
      ↓
Nearby Company Matching
      ↓
Potential Collection
```

---

### 🏢 5. Marketplace

CropChar includes marketplace mock data representing companies that may be interested in agricultural crop residue.

The system can use geographic information to identify potentially nearby companies.

```text
🌾 Field
   ↓
📍 Location
   ↓
Distance Calculation
   ↓
🏢 Nearby Companies
```

---

## 🧩 Project Structure

```text
CropChar/
│
├── frontend/
│   └── React + Vite dashboard
│
├── backend/
│   └── FastAPI backend
│
├── ml/
│   └── Risk model + fire pipeline
│
├── gis-data/
│   ├── Field boundaries
│   └── Marketplace mock data
│
└── README.md
```

---

## 👥 Team Solvex

| Team Member      | Responsibility                                 |
| ---------------- | ---------------------------------------------- |
| **Neha**         | Frontend — React + Vite Dashboard              |
| **Navithanjali** | Backend — FastAPI                              |
| **Nivedha**      | Machine Learning — Risk Model + Fire Pipeline  |
| **Nivasri**      | GIS — Field Boundaries + Marketplace Mock Data |

---

## 🌿 Branch Convention

Each team member works on a dedicated feature branch.

```text
main
│
├── feature/nivasri-gis
├── feature/nivedha-ml
├── feature/neha-frontend
└── feature/navi-backend
```

### Feature Branches

* `feature/nivasri-gis`
* `feature/nivedha-ml`
* `feature/neha-frontend`
* `feature/navi-backend`

All completed feature branches are merged into `main`.

**Main laptop for integration, merges, and final demo build: Nivasri.**

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* Leaflet
* React Leaflet

### Backend

* Python
* FastAPI
* Uvicorn

### Machine Learning

* Python
* Pandas
* Machine Learning Risk Model
* Fire / Hotspot Data Processing

### GIS & Data

* GeoJSON
* GeoPandas
* Shapely
* Latitude / Longitude
* Marketplace Mock Data

### Development

* Git
* GitHub
* VS Code
* Node.js
* npm
* Python Virtual Environment

---

## 🏗️ System Architecture

```text
                    🌐 USER
                       │
                       ▼
              ⚛️ REACT DASHBOARD
                       │
                  API REQUESTS
                       │
                       ▼
                 ⚡ FASTAPI
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       🤖 ML MODEL   🔥 FIRE      🗺️ GIS
                    PIPELINE       DATA
          │            │            │
          └────────────┼────────────┘
                       │
                       ▼
                🚨 RESPONSE LOGIC
                       │
                       ▼
                🏢 MARKETPLACE
```

---

## 📊 Data Flow

```text
Historical Fire Data
        │
        ▼
🔥 Fire Pipeline
        │
        ▼
🤖 Risk Model
        │
        ▼
Risk Classification
        │
        ▼
🗺️ GIS Field Data
        │
        ▼
📍 Location Analysis
        │
        ▼
🏢 Nearby Companies
        │
        ▼
🚨 Response
```

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NivasriT/cropchar.git
cd cropchar
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

For Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn backend.main:app --reload
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔐 Environment Variables

Sensitive credentials should never be committed to GitHub.

Create a local `.env` file for API keys and other secrets.

Example:

```env
FIRMS_MAP_KEY=your_api_key
```

Make sure `.env` is included in `.gitignore`.

---

## 🚀 Development Workflow

```text
Create Feature Branch
        ↓
Develop Feature
        ↓
Test Locally
        ↓
Commit Changes
        ↓
Push Feature Branch
        ↓
Review & Fix
        ↓
Merge into main
        ↓
Final Integration
        ↓
🚀 Demo Build
```

---

## 🌍 Our Vision

CropChar aims to move crop-fire management from a reactive approach to a proactive one.

### Traditional Approach

```text
🌾 Crop Residue
      ↓
🔥 Burning
      ↓
🌫️ Pollution
      ↓
🚨 React
```

### CropChar Approach

```text
🌾 Crop Residue
      ↓
🤖 Predict
      ↓
🛡️ Prevent
      ↓
🔥 Detect
      ↓
🚨 Respond
      ↓
♻️ Reuse
      ↓
🧠 Learn
```

---

# 🏆 Team Solvex

### CropChar

**PREDICT → PREVENT → DETECT → RESPOND → LEARN**

Built using:

**🤖 AI + 🗺️ GIS + 🔥 Fire Intelligence + ⚡ FastAPI + ⚛️ React**

---

> 🌾 Turning crop-fire risk into actionable intelligence.

```
```

