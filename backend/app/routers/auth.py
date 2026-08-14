import uuid
from fastapi import APIRouter
from app.models.schemas import LoginBody, LoginResponse

router = APIRouter()

ROLE_USERNAMES = {
    "farmer": "Farmer Ramesh",
    "company": "EcoBioEnergy Corp",
    "officer": "District Agriculture Officer (Zone 7)"
}

@router.post("/login", response_model=LoginResponse)
def login(body: LoginBody):
    session_id = f"sess-{body.role}-{str(uuid.uuid4())[:8]}"
    username = ROLE_USERNAMES.get(body.role, f"{body.role.capitalize()} User")
    return LoginResponse(
        role=body.role,
        session_id=session_id,
        username=username
    )