import os
import joblib
import pandas as pd
from fastapi import APIRouter, FastAPI, HTTPException
from .fire_pipeline import fetch_active_fires, match_fires_to_fields

# 1. Main router for backend integration
router = APIRouter()

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "risk_model.pkl")
DATA_PATH = os.path.join(BASE_DIR, "data", "synthetic_fields.csv")

# Load ML model & features dataset
model = joblib.load(MODEL_PATH)
df_fields = pd.read_csv(DATA_PATH)

FEATURES = [
    "days_since_harvest",
    "residue_load_tons_per_ha",
    "past_burn_history",
    "days_until_next_sowing",
    "distance_to_nearest_chc_km",
    "avg_temp_c",
    "wind_speed_kmph",
]

FIELD_FEATURES = {
    str(row["field_id"]): row.to_dict()
    for _, row in df_fields.iterrows()
}

def get_top_reasons(row: dict) -> list[str]:
    reasons = []
    if float(row.get("days_until_next_sowing", 99)) <= 10:
        reasons.append("Sowing deadline approaching")
    if int(row.get("past_burn_history", 0)) == 1:
        reasons.append("History of burning on this field")
    if float(row.get("residue_load_tons_per_ha", 0)) > 5:
        reasons.append("High residue load")
    if float(row.get("distance_to_nearest_chc_km", 0)) > 15:
        reasons.append("Far from nearest CHC machine")
    return reasons[:3] if reasons else ["Baseline seasonal risk"]

@router.get("/fields/{field_id}/risk")
def get_risk(field_id: str):
    """Returns risk prediction and countdown for a given field."""
    if field_id not in FIELD_FEATURES:
        raise HTTPException(
            status_code=404,
            detail=f"Field ID '{field_id}' not found in database."
        )

    row = FIELD_FEATURES[field_id]
    feature_df = pd.DataFrame([[row[col] for col in FEATURES]], columns=FEATURES)
    
    predicted_val = model.predict(feature_df)[0]
    score = int(round(float(predicted_val)))
    clamped_score = max(0, min(100, score))
    countdown = int(max(1, float(row["days_until_next_sowing"])) * 24)

    return {
        "score": clamped_score,
        "top_reasons": get_top_reasons(row),
        "countdown_hours": countdown,
    }

@router.get("/fires")
def get_fires():
    """Fetches active satellite fires and returns those matching monitored field boundaries."""
    fires_df = fetch_active_fires()
    matched = match_fires_to_fields(fires_df)
    return matched

# Standalone app for local testing
app = FastAPI()
app.include_router(router)