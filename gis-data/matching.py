import pandas as pd
from geopy.distance import geodesic  # pip install geopy

def nearest_companies(field_lat, field_lon, companies_csv="gis-data/mock_companies.csv", top_n=3):
    df = pd.read_csv(companies_csv)
    df["distance_km"] = df.apply(lambda r: geodesic((field_lat, field_lon), (r.lat, r.lon)).km, axis=1)
    return df.sort_values("distance_km").head(top_n).to_dict(orient="records")