import numpy as np
import pandas as pd

np.random.seed(42)
N = 800

df = pd.DataFrame(
    {
        "field_id": [f"F{i:04d}" for i in range(N)],
        "days_since_harvest": np.random.randint(0, 20, N),
        "residue_load_tons_per_ha": np.round(np.random.uniform(1, 8, N), 2),
        "past_burn_history": np.random.choice([0, 1], N, p=[0.6, 0.4]),
        "days_until_next_sowing": np.random.randint(1, 25, N),
        "distance_to_nearest_chc_km": np.round(
            np.random.uniform(0.5, 30, N), 2
        ),
        "avg_temp_c": np.round(np.random.uniform(15, 38, N), 1),
        "wind_speed_kmph": np.round(np.random.uniform(2, 25, N), 1),
    }
)

# Hand-craft a risk score formula so the "ground truth" makes agronomic sense
df["risk_score"] = (
    (20 - df["days_until_next_sowing"]).clip(0) * 3
    + df["past_burn_history"] * 25
    + df["residue_load_tons_per_ha"] * 4
    + (df["distance_to_nearest_chc_km"] > 15).astype(int) * 15
    + np.random.normal(0, 5, N)
).clip(0, 100).round().astype(int)

df.to_csv("data/synthetic_fields.csv", index=False)
print("Generated data/synthetic_fields.csv successfully!")
print(df.head())