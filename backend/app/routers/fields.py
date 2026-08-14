import os
import json
from fastapi import APIRouter, HTTPException
from app.models.schemas import RiskAssessmentResponse

router = APIRouter()

# Global in-memory fields database
FIELDS_DB = {}

def get_geojson_path():
    # Check local app data directory first, then root gis-data directory
    local_path = os.path.join(os.path.dirname(__file__), "..", "data", "fields.geojson")
    gis_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "gis-data", "fields.geojson")
    
    if os.path.exists(gis_path):
        return os.path.abspath(gis_path)
    elif os.path.exists(local_path):
        return os.path.abspath(local_path)
    return None

def load_initial_fields():
    global FIELDS_DB
    path = get_geojson_path()
    if path and os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                geojson_data = json.load(f)
                features = geojson_data.get("features", [])
                for feat in features:
                    props = feat.get("properties", {})
                    field_id = props.get("id") or feat.get("id")
                    if field_id:
                        FIELDS_DB[field_id] = {
                            "id": field_id,
                            "name": props.get("name", f"Field {field_id}"),
                            "farmer_id": props.get("farmer_id", "farmer_01"),
                            "farmer_name": props.get("farmer_name", "Local Farmer"),
                            "crop_type": props.get("crop_type", "Rice Paddy Stubble"),
                            "area_acres": props.get("area_acres", 10.0),
                            "risk_score": props.get("risk_score", 75),
                            "top_reasons": props.get("top_reasons", ["dry spell", "historical burn"]),
                            "countdown_hours": props.get("countdown_hours", 48),
                            "status": props.get("status", "monitoring"),
                            "geometry": feat.get("geometry", {}),
                            "offer": None
                        }
        except Exception as e:
            print(f"[FIELDS_DB] Error loading GeoJSON: {e}")

    # Ensure fallback fields exist if empty
    if not FIELDS_DB:
        FIELDS_DB["F0001"] = {
            "id": "F0001",
            "name": "North Paddy Sector A",
            "farmer_id": "farmer_01",
            "farmer_name": "Ramu K",
            "crop_type": "Rice Paddy Stubble",
            "area_acres": 14.5,
            "risk_score": 85,
            "top_reasons": ["dry spell duration (>12 days)", "past historical burn anomaly"],
            "countdown_hours": 36,
            "status": "monitoring",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [[76.9550, 11.0160], [76.9580, 11.0160], [76.9580, 11.0185], [76.9550, 11.0185], [76.9550, 11.0160]]
                ]
            },
            "offer": None
        }

# Initial load on module import
load_initial_fields()

@router.get("/fields")
def get_fields():
    return list(FIELDS_DB.values())

@router.get("/fields/{field_id}/risk", response_model=RiskAssessmentResponse)
def get_field_risk(field_id: str):
    if field_id not in FIELDS_DB:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
    field = FIELDS_DB[field_id]
    return RiskAssessmentResponse(
        field_id=field_id,
        score=field.get("risk_score", 0),
        top_reasons=field.get("top_reasons", []),
        countdown_hours=field.get("countdown_hours", 48)
    )

@router.post("/fields/reset")
def reset_fields():
    load_initial_fields()
    return {"message": "FIELDS_DB reset successfully to initial state", "total_fields": len(FIELDS_DB)}