from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal

class LoginBody(BaseModel):
    role: Literal["farmer", "company", "officer"]
    identifier: Optional[str] = None
    password: Optional[str] = None

class LoginResponse(BaseModel):
    role: str
    session_id: str
    username: str
    user_id: str

class FieldCreateBody(BaseModel):
    crop_type: str  # Paddy, Wheat, Sugarcane, Cotton, Other
    custom_crop_type: Optional[str] = None
    harvest_month: str
    area_acres: float
    planting_month: str
    latitude: float
    longitude: float
    state: Optional[str] = "Punjab"
    district: Optional[str] = "Patiala"
    village: Optional[str] = "Patiala Sector"
    farmer_id: Optional[str] = "farmer_9876"
    farmer_name: Optional[str] = "Gurpreet Singh"

class OfferBody(BaseModel):
    company_id: Optional[str] = "COMP-001"
    company_name: Optional[str] = "ABC Biomass Pvt. Ltd."
    price_per_ton: float
    notes: Optional[str] = None
    distance_km: Optional[float] = 12.4

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

class FireAlertResponse(BaseModel):
    alert_id: str
    field_id: str
    status: str
    notified_officer_id: str

class FireVerificationBody(BaseModel):
    action: Literal["dispatch_ground_team", "mark_under_verification", "mark_verified_burn", "mark_false_detection"]
    officer_id: Optional[str] = "OFFICER-PATIALA-01"
    notes: Optional[str] = None

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
    residue_diverted_tons: float
    co2_avoided_tons: float
    pm25_avoided_tons: float