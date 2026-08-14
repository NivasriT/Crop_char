import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from app.models.schemas import FireAlertResponse
from app.routers.fields import FIELDS_DB

router = APIRouter()

# Active thermal anomaly database
FIRES_DB = [
    {
        "field_id": "F0001",
        "detected_at": "2026-08-14T12:00:00Z",
        "confidence": 0.94,
        "brightness_kelvin": 342.5,
        "lat": 11.0168,
        "lon": 76.9558
    }
]

@router.get("/fires")
def get_fires():
    return FIRES_DB

@router.post("/fires/{field_id}/alert", response_model=FireAlertResponse)
def alert_officer(field_id: str):
    if field_id in FIELDS_DB:
        FIELDS_DB[field_id]["status"] = "fire_detected"
    
    alert_id = f"alert-{field_id}-{str(uuid.uuid4())[:6]}"
    
    # Check if fire already in FIRES_DB, else append
    existing = [f for f in FIRES_DB if f["field_id"] == field_id]
    if not existing:
        FIRES_DB.append({
            "field_id": field_id,
            "detected_at": datetime.now(timezone.utc).isoformat(),
            "confidence": 0.95,
            "brightness_kelvin": 348.0,
            "lat": 11.0168,
            "lon": 76.9558
        })
        
    return FireAlertResponse(
        alert_id=alert_id,
        field_id=field_id,
        status="officer_notified",
        notified_officer_id="OFFICER-DISTRICT-7"
    )