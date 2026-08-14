import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import risk_router
# Ensure backend directory is in python path so 'from app.routers ...' resolves cleanly
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.routers import auth, fields, marketplace, fires, outcomes



app = FastAPI(
    title="CropChar API",
    description="End-to-End Stubble Burning Elimination & Wildfire Prevention System",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include core FastAPI routers under /api prefix
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(fields.router, prefix="/api", tags=["Fields & Risk Evaluation"])
app.include_router(marketplace.router, prefix="/api", tags=["Marketplace & Consent State Machine"])
app.include_router(fires.router, prefix="/api", tags=["Fire Detection & Officer Alerts"])
app.include_router(outcomes.router, prefix="/api", tags=["Outcome Logging & System Analytics"])
app.include_router(risk_router.router, prefix="/api", tags=["Risk Evaluation"])
# Dynamic mount for Nivedha's ML Risk Router if available in workspace
try:
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    if project_root not in sys.path:
        sys.path.insert(0, project_root)
    from ml.risk_router import router as ml_router
    app.include_router(ml_router, prefix="/api", tags=["ML Risk Predictions"])
    print("[CropChar Backend] Successfully mounted Nivedha's ML Risk Router!")
except ImportError:
    print("[CropChar Backend] Note: ML router (ml/risk_router.py) not mounted yet. Built-in risk router active.")
except Exception as e:
    print(f"[CropChar Backend] ML Router load notice: {e}")

@app.get("/")
def root():
    return {
        "system": "CropChar Platform API",
        "status": "online",
        "docs_url": "/docs",
        "api_contract": "/api/fields"
    }

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "monitored_fields": len(fields.FIELDS_DB),
        "active_fires": len(fires.FIRES_DB)
    }