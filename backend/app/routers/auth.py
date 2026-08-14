import uuid
from fastapi import APIRouter
from app.models.schemas import LoginBody, LoginResponse

router = APIRouter()

ROLE_DEFAULTS = {
    "farmer": {"username": "Gurpreet Singh", "user_id": "farmer_9876"},
    "company": {"username": "ABC Biomass Pvt. Ltd.", "user_id": "COMP-001"},
    "officer": {"username": "District Nodal Officer (Patiala)", "user_id": "OFFICER-PATIALA-01"}
}

@router.post("/login", response_model=LoginResponse)
def login(body: LoginBody):
    session_id = f"sess-{body.role}-{str(uuid.uuid4())[:8]}"
    defaults = ROLE_DEFAULTS.get(body.role, {"username": f"{body.role.capitalize()} User", "user_id": f"{body.role}_user"})
    
    username = defaults["username"]
    user_id = defaults["user_id"]

    if body.identifier:
        if body.role == "farmer":
            username = f"Farmer ({body.identifier})"
        elif body.role == "company":
            username = body.identifier.split("@")[0].capitalize() + " Biomass Ltd."
        elif body.role == "officer":
            username = f"Officer ({body.identifier})"

    return LoginResponse(
        role=body.role,
        session_id=session_id,
        username=username,
        user_id=user_id
    )