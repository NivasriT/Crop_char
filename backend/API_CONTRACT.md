# CropChar REST API Contract (v1.0)
**Author:** Navithanjali M S (Backend Lead — Team Solvex)  
**Base Server URL:** `http://localhost:8000`  
**CORS Policy:** Allowed for all origins (`*`), credentials allowed, methods `GET, POST, PUT, DELETE, OPTIONS`.

---

## State Machine Transition Specification

Every field in the CropChar platform follows a strict state transition lifecycle:

```
                  [ 1. PREDICT ]
                   monitoring
                       │
                       ├── (Company places pickup offer)
                       ▼
                  [ 2. PREVENT ]
                   offered
                       │
       ┌───────────────┴───────────────┐
 (Farmer Accepts)               (Farmer Rejects / Timer Expires)
       │                               │
       ▼                               ▼
   consented                   [ 3. FALLBACK ]
       │                         chc_fallback
       │                               │
       ├───────────────────────────────┤
       ▼                               ▼
  [ 5. LEARN ]                    [ 4. DETECT & RESPOND ]
    resolved                            fire_detected
       │                               │
       └───────────────────────────────┘
                       │
                       ▼
                    burned
```

---

## Endpoint Details & Schemas

### 1. Authentication
- **Endpoint:** `POST /api/login`
- **Description:** Authenticates user and returns session metadata.
- **Request Body:**
  ```json
  {
    "role": "farmer" // Options: "farmer", "company", "officer"
  }
  ```
- **Response Payload (200 OK):**
  ```json
  {
    "role": "farmer",
    "session_id": "sess-farmer-984210",
    "username": "Farmer User"
  }
  ```

---

### 2. Field Directory
- **Endpoint:** `GET /api/fields`
- **Description:** Fetches all monitored agricultural field polygons, risk evaluations, active offers, countdown windows, and live statuses.
- **Query Params:** None
- **Response Payload (200 OK):**
  ```json
  [
    {
      "id": "F0001",
      "name": "North Paddy Sector A",
      "farmer_id": "farmer_01",
      "crop_type": "Rice Paddy Stubble",
      "area_acres": 14.5,
      "risk_score": 85,
      "top_reasons": ["dry spell duration (>12 days)", "past historical burn anomaly"],
      "countdown_hours": 36,
      "status": "monitoring",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [76.9550, 11.0160],
            [76.9580, 11.0160],
            [76.9580, 11.0185],
            [76.9550, 11.0185],
            [76.9550, 11.0160]
          ]
        ]
      },
      "offer": null
    }
  ]
  ```

---

### 3. Field Risk Assessment
- **Endpoint:** `GET /api/fields/{field_id}/risk`
- **Description:** Fetches ML risk score, key risk drivers, and burn countdown window for a specific field.
- **Response Payload (200 OK):**
  ```json
  {
    "field_id": "F0001",
    "score": 85,
    "top_reasons": ["dry spell duration (>12 days)", "past historical burn anomaly"],
    "countdown_hours": 36
  }
  ```

---

### 4. Marketplace Biomass Offer
- **Endpoint:** `POST /api/fields/{field_id}/offer`
- **Description:** Industrial biomass buyer posts a commercial pickup offer for crop residue on a targeted field. Automatically transitions field status from `monitoring` to `offered`.
- **Request Body:**
  ```json
  {
    "company_id": "COMP-001",
    "company_name": "EcoBioEnergy Corp",
    "distance_km": 12.4,
    "price_per_ton": 1450.0
  }
  ```
- **Response Payload (200 OK):**
  ```json
  {
    "offer_id": "offer-F0001",
    "field_id": "F0001",
    "status": "offered",
    "timestamp": "2026-08-14T14:50:00Z"
  }
  ```

---

### 5. Farmer Consent Decision
- **Endpoint:** `POST /api/fields/{field_id}/consent`
- **Description:** Farmer accepts or rejects a biomass pickup offer.
  - If `accepted: true` -> Field transitions to `consented`.
  - If `accepted: false` -> Field transitions to `chc_fallback`.
- **Request Body:**
  ```json
  {
    "accepted": true
  }
  ```
- **Response Payload (200 OK):**
  ```json
  {
    "field_id": "F0001",
    "status": "consented",
    "updated_at": "2026-08-14T14:50:00Z"
  }
  ```

---

### 6. Custom Hiring Center (CHC) Fallback
- **Endpoint:** `POST /api/fields/{field_id}/chc-fallback`
- **Description:** Triggers automated machinery fallback dispatch from the nearest Custom Hiring Center. Sets status to `chc_fallback`.
- **Request Body:** Optional `{ "reason": "offer_expired" }`
- **Response Payload (200 OK):**
  ```json
  {
    "field_id": "F0001",
    "status": "chc_fallback",
    "chc_provider": "Central Machinery Hub #4 (Coimbatore North)",
    "eta_hours": 4
  }
  ```

---

### 7. Active Satellite Fire Detections
- **Endpoint:** `GET /api/fires`
- **Description:** Returns NASA FIRMS thermal anomalies matched to field boundaries via spatial joins.
- **Response Payload (200 OK):**
  ```json
  [
    {
      "field_id": "F0001",
      "detected_at": "2026-08-14T12:00:00Z",
      "confidence": 0.94,
      "brightness_kelvin": 342.5,
      "lat": 11.0168,
      "lon": 76.9558
    }
  ]
  ```

---

### 8. Officer Fire Alert Dispatch
- **Endpoint:** `POST /api/fires/{field_id}/alert`
- **Description:** Dispatches an emergency alert notification to agricultural officers for an active fire. Sets status to `fire_detected`.
- **Response Payload (200 OK):**
  ```json
  {
    "alert_id": "alert-F0001",
    "field_id": "F0001",
    "status": "officer_notified",
    "notified_officer_id": "OFFICER-DISTRICT-7"
  }
  ```

---

### 9. Outcome Logging
- **Endpoint:** `POST /api/outcomes`
- **Description:** Logs intervention outcome (`intervened`, `burned`, `unresolved`) for systemic learning and KPI tracking.
- **Request Body:**
  ```json
  {
    "field_id": "F0001",
    "outcome": "intervened"
  }
  ```
- **Response Payload (200 OK):**
  ```json
  {
    "logged": true,
    "field_id": "F0001",
    "outcome": "intervened"
  }
  ```

---

### 10. Platform System Statistics
- **Endpoint:** `GET /api/stats`
- **Description:** Calculates global live system analytics across all stages.
- **Response Payload (200 OK):**
  ```json
  {
    "fields_monitored": 6,
    "high_risk": 3,
    "prevented": 2,
    "active_fires": 1
  }
  ```
