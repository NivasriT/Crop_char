import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
import joblib

# Load synthetic fields dataset
df = pd.read_csv("data/synthetic_fields.csv")

# Define features and target
FEATURES = [
    "days_since_harvest",
    "residue_load_tons_per_ha",
    "past_burn_history",
    "days_until_next_sowing",
    "distance_to_nearest_chc_km",
    "avg_temp_c",
    "wind_speed_kmph",
]

X = df[FEATURES]
y = df["risk_score"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Gradient Boosting Regressor
model = GradientBoostingRegressor(random_state=42)
model.fit(X_train, y_train)

# Evaluate model performance
test_r2 = model.score(X_test, y_test)
print(f"Model trained successfully! Test R^2 Score: {test_r2:.4f}")

# Save the trained model
joblib.dump(model, "risk_model.pkl")
print("Saved model to risk_model.pkl")