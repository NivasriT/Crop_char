from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal

class LoginBody(BaseModel):
    role: Literal["farmer", "company", "officer"]

class LoginResponse(BaseModel):
    role: str
    session_id: str
    username: str

class OfferBody(BaseModel):
    company_id: str
    company_name: Optional[str] = "Industrial Biomass Buyer"
    distance_km: float
    price_per_ton: float

class OfferResponse(BaseModel):
    offer_id: str
    field_id: str
    status: str
    timestamp: str

class ConsentBody(BaseModel):
    accepted: bool
    notes: Optional[str] = None

class ConsentResponse(BaseModel):
    field_id: str
    status: str
    updated_at: str

class ChcFallbackBody(BaseModel):
    reason: Optional[str] = "buyer_rejected_or_expired"

class ChcFallbackResponse(BaseModel):
    field_id: str
    status: str
    chc_provider: str
    eta_hours: int

class FireAlertResponse(BaseModel):
    alert_id: str
    field_id: str
    status: str
    notified_officer_id: str

class OutcomeBody(BaseModel):
    field_id: str
    outcome: Literal["intervened", "burned", "unresolved"]
    notes: Optional[str] = None

class OutcomeResponse(BaseModel):
    logged: bool
    field_id: str
    outcome: str

class RiskAssessmentResponse(BaseModel):
    field_id: str
    score: int
    top_reasons: List[str]
    countdown_hours: int

class SystemStatsResponse(BaseModel):
    fields_monitored: int
    high_risk: int
    prevented: int
    active_fires: int