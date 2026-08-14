import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import FireAlertResponse, FireVerificationBody
from app.routers.fields import FIELDS_DB

router = APIRouter()

# Thermal anomalies database linked to fields
FIRES_DB = [
    {
        "field_id": "F0024",
        "district": "Patiala",
        "state": "Punjab",
        "detected_at": "2026-08-15 10:24 AM",
        "confidence": 94,
        "brightness_kelvin": 348.5,
        "lat": 30.3320,
        "lon": 76.3725,
        "status": "awaiting_verification"
    },
    {
        "field_id": "F0011",
        "district": "Karnal",
        "state": "Haryana",
        "detected_at": "2026-08-15 09:15 AM",
        "confidence": 88,
        "brightness_kelvin": 339.0,
        "lat": 29.6920,
        "lon": 77.0030,
        "status": "awaiting_verification"
    }
]

@router.get("/fires")
def get_fires(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None)
):
    results = FIRES_DB.copy()
    
    # Also dynamically include any FIELDS_DB entries with status 'fire_detected'
    for f_id, field in FIELDS_DB.items():
        if field.get("status") == "fire_detected":
            if not any(f["field_id"] == f_id for f in results):
                coords = field.get("geometry", {}).get("coordinates", [[[76.38, 30.34]]])[0][0]
                results.append({
                    "field_id": f_id,
                    "district": field.get("district", "Patiala"),
                    "state": field.get("state", "Punjab"),
                    "detected_at": "2026-08-15 10:24 AM",
                    "confidence": 94,
                    "brightness_kelvin": 345.2,
                    "lat": coords[1],
                    "lon": coords[0],
                    "status": "awaiting_verification"
                })

    if state and state != "All Regions":
        results = [f for f in results if f.get("state", "").lower() == state.lower()]

    if district and district != "All Districts":
        results = [f for f in results if f.get("district", "").lower() == district.lower()]

    return results

@router.post("/fires/{field_id}/verify")
def verify_fire_incident(field_id: str, body: FireVerificationBody):
    if field_id not in FIELDS_DB:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")

    field = FIELDS_DB[field_id]
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    status_map = {
        "dispatch_ground_team": "ground_team_dispatched",
        "mark_under_verification": "under_verification",
        "mark_verified_burn": "burned",
        "mark_false_detection": "monitoring"
    }

    new_status = status_map.get(body.action, "under_verification")
    field["status"] = new_status
    field["verification"] = {
        "action": body.action,
        "officer_id": body.officer_id or "OFFICER-PATIALA-01",
        "notes": body.notes or f"Action {body.action} performed.",
        "timestamp": now_str
    }

    # Update thermal anomaly entry status
    for fire in FIRES_DB:
        if fire["field_id"] == field_id:
            fire["status"] = new_status

    return {
        "field_id": field_id,
        "action": body.action,
        "new_status": new_status,
        "timestamp": now_str
    }