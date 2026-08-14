import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    OfferBody, OfferResponse,
    ConsentBody, ConsentResponse,
    ChcFallbackBody, ChcFallbackResponse
)
from app.routers.fields import FIELDS_DB

router = APIRouter()

@router.post("/fields/{field_id}/offer", response_model=OfferResponse)
def make_offer(field_id: str, body: OfferBody):
    if field_id not in FIELDS_DB:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
    
    field = FIELDS_DB[field_id]
    offer_id = f"offer-{field_id}-{str(uuid.uuid4())[:6]}"
    now_iso = datetime.now(timezone.utc).isoformat()
    
    offer_data = {
        "offer_id": offer_id,
        "company_id": body.company_id,
        "company_name": body.company_name or "Industrial Biomass Buyer",
        "distance_km": body.distance_km,
        "price_per_ton": body.price_per_ton,
        "total_offer_value": round(body.price_per_ton * (field.get("area_acres", 10.0) * 2.2), 2),
        "timestamp": now_iso
    }
    
    field["status"] = "offered"
    field["offer"] = offer_data
    
    return OfferResponse(
        offer_id=offer_id,
        field_id=field_id,
        status="offered",
        timestamp=now_iso
    )

@router.post("/fields/{field_id}/consent", response_model=ConsentResponse)
def give_consent(field_id: str, body: ConsentBody):
    if field_id not in FIELDS_DB:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
    
    field = FIELDS_DB[field_id]
    now_iso = datetime.now(timezone.utc).isoformat()
    
    if body.accepted:
        field["status"] = "consented"
    else:
        field["status"] = "chc_fallback"
        
    field["consent_updated_at"] = now_iso
    
    return ConsentResponse(
        field_id=field_id,
        status=field["status"],
        updated_at=now_iso
    )

@router.post("/fields/{field_id}/chc-fallback", response_model=ChcFallbackResponse)
def chc_fallback(field_id: str, body: ChcFallbackBody = ChcFallbackBody()):
    if field_id not in FIELDS_DB:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
    
    field = FIELDS_DB[field_id]
    field["status"] = "chc_fallback"
    field["chc_dispatch"] = {
        "provider": "Central Machinery Hub #4 (Coimbatore North)",
        "eta_hours": 4,
        "dispatched_at": datetime.now(timezone.utc).isoformat()
    }
    
    return ChcFallbackResponse(
        field_id=field_id,
        status="chc_fallback",
        chc_provider="Central Machinery Hub #4 (Coimbatore North)",
        eta_hours=4
    )