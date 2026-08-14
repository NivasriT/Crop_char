from fastapi import APIRouter
from app.models.schemas import OutcomeBody, OutcomeResponse, SystemStatsResponse
from app.routers.fields import FIELDS_DB
from app.routers.fires import FIRES_DB

router = APIRouter()

OUTCOMES_LOG = []

@router.post("/outcomes", response_model=OutcomeResponse)
def log_outcome(body: OutcomeBody):
    OUTCOMES_LOG.append(body.model_dump())
    
    if body.field_id in FIELDS_DB:
        field = FIELDS_DB[body.field_id]
        if body.outcome == "intervened":
            field["status"] = "resolved"
        elif body.outcome == "burned":
            field["status"] = "burned"
            
    return OutcomeResponse(
        logged=True,
        field_id=body.field_id,
        outcome=body.outcome
    )

@router.get("/outcomes")
def get_outcomes():
    return OUTCOMES_LOG

@router.get("/stats", response_model=SystemStatsResponse)
def stats():
    fields_list = list(FIELDS_DB.values())
    
    total_monitored = len(fields_list)
    high_risk_count = len([f for f in fields_list if f.get("risk_score", 0) >= 70])
    
    # Interventions count: logged as intervened OR fields currently consented or resolved
    intervened_outcomes = len([o for o in OUTCOMES_LOG if o.get("outcome") == "intervened"])
    consented_or_resolved = len([f for f in fields_list if f.get("status") in ["consented", "resolved"]])
    prevented_count = max(intervened_outcomes, consented_or_resolved)
    
    # Active fires count: fire_detected status or entries in FIRES_DB
    fire_status_fields = len([f for f in fields_list if f.get("status") == "fire_detected"])
    active_fires_count = max(fire_status_fields, len(FIRES_DB))
    
    return SystemStatsResponse(
        fields_monitored=total_monitored,
        high_risk=high_risk_count,
        prevented=prevented_count,
        active_fires=active_fires_count
    )