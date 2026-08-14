def top_reasons(row: dict) -> list[str]:
    reasons = []
    if row.get("days_until_next_sowing", 99) <= 10:
        reasons.append("Sowing deadline approaching")
    if row.get("past_burn_history", 0) == 1:
        reasons.append("History of burning on this field")
    if row.get("residue_load_tons_per_ha", 0) > 5:
        reasons.append("High residue load")
    if row.get("distance_to_nearest_chc_km", 0) > 15:
        reasons.append("Far from nearest CHC machine")
    return reasons[:3] if reasons else ["Baseline seasonal risk"]