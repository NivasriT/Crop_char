from datetime import datetime
import os
import geopandas as gpd
import pandas as pd
import requests
from shapely.geometry import Point

MAP_KEY = "75f2400fd4dafbb1ad0fbb1976ab591f"
# Demo region bounding box covering the fields in Punjab (approx 75E-76E, 30N-31N)
AREA = "75.7,30.8,75.9,31.0"
URL = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{MAP_KEY}/VIIRS_SNPP_NRT/{AREA}/1"

# Resolve path to gis-data/fields.geojson
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GEOJSON_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "gis-data", "fields.geojson")
)


def fetch_active_fires() -> pd.DataFrame:
  """Fetches live active fires from NASA FIRMS; falls back to mock data if API is down/empty."""
  try:
    response = requests.get(URL, timeout=5)
    if response.status_code == 200 and len(response.text.strip()) > 0:
      df = pd.read_csv(pd.io.common.StringIO(response.text))
      if not df.empty and "latitude" in df.columns:
        print(f"Fetched {len(df)} live fire points from NASA FIRMS.")
        return df
  except Exception as e:
    print(f"FIRMS API fetch notice: {e}. Falling back to demo mock fire data.")

  # Mock fallback points placed specifically inside demo field F0000 and F0001 coordinates
  print("Using mock fire dataset for demo reliability.")
  mock_data = {
      "latitude": [30.9090, 30.9080],
      "longitude": [75.7960, 75.7962],
      "confidence": [95, 88],
      "acq_date": [
          datetime.now().strftime("%Y-%m-%d"),
          datetime.now().strftime("%Y-%m-%d"),
      ],
      "acq_time": ["1330", "1415"],
  }
  return pd.DataFrame(mock_data)


def match_fires_to_fields(
    fire_df: pd.DataFrame, fields_geojson_path: str = GEOJSON_PATH
) -> list[dict]:
  """Performs spatial join between fire coordinates and field boundary polygons."""
  if not os.path.exists(fields_geojson_path):
    print(f"Warning: {fields_geojson_path} not found.")
    return []

  fields = gpd.read_file(fields_geojson_path)

  # Convert fires DataFrame to GeoDataFrame with Point geometries
  fires = gpd.GeoDataFrame(
      fire_df,
      geometry=[Point(xy) for xy in zip(fire_df.longitude, fire_df.latitude)],
      crs="EPSG:4326",
  )

  # Match coordinate points within polygon boundaries
  matched = gpd.sjoin(fires, fields, how="inner", predicate="within")

  # Format output matching API Contract
  results = []
  for _, row in matched.iterrows():
    results.append({
        "field_id": str(row.get("field_id", "Unknown")),
        "detected_at": f"{row.get('acq_date', '')} {row.get('acq_time', '')}".strip(),
        "confidence": int(row.get("confidence", 80)),
        "lat": float(row.get("latitude")),
        "lon": float(row.get("longitude")),
    })
  return results


if __name__ == "__main__":
  fires_df = fetch_active_fires()
  matched_results = match_fires_to_fields(fires_df)
  print(f"Matched Fires to Fields ({len(matched_results)} detected):")
  print(matched_results)