import json
import re
from collections import defaultdict
from pathlib import Path

import openpyxl


source_path = Path(r"C:\Users\magnu\Downloads\roster-per-distrikt-slutligt-antal-roster-inklusive-totalt-valdeltagande-kommunval-2022 (1).xlsx")
output_path = Path("app/data/val-2022-helsingborg.json")

party_codes = {
    "Arbetarepartiet-Socialdemokraterna": "S",
    "Moderaterna": "M",
    "Sverigedemokraterna": "SD",
    "Vänsterpartiet": "V",
    "Centerpartiet": "C",
    "Kristdemokraterna": "KD",
    "Liberalerna (tidigare Folkpartiet)": "L",
    "Miljöpartiet de gröna": "MP",
    "Partiet Nyans": "NYANS",
    "Medborgerlig Samling": "MED",
    "Feministiskt initiativ": "FI",
}

aggregate_rows = {
    "Valdeltagande",
    "Summa giltiga röster",
    "blanka röster",
    "övriga ogiltiga",
    "ej anmält deltagande",
    "övriga anmälda partier",
}

def clean(value):
    return str(value or "").strip()

workbook = openpyxl.load_workbook(source_path, read_only=True, data_only=True)
sheet = workbook["roster_KF"]

party_totals = defaultdict(int)
party_districts = defaultdict(lambda: defaultdict(int))
party_display_names = {}
district_names = {}

for row in sheet.iter_rows(min_row=2, values_only=True):
    municipality = clean(row[4])
    district_code = clean(row[5])
    if municipality != "Helsingborg" and not district_code.startswith("1283"):
        continue

    party_name = clean(row[9])
    if not party_name or party_name in aggregate_rows:
        continue
    votes = int(row[10] or 0)
    district_name = clean(row[6]) or "Okänt valdistrikt"
    district_code = district_code or district_name
    party_display_names[party_name] = party_name.replace(" (tidigare Folkpartiet)", "")
    party_totals[party_name] += votes
    party_districts[party_name][district_code] += votes
    district_names[district_code] = district_name

parties = []
for source_name, total in party_totals.items():
    display_name = party_display_names[source_name]
    code = party_codes.get(source_name)
    if not code:
        code = re.sub(r"[^A-Z0-9]+", "-", display_name.upper()).strip("-") or "UNKNOWN"
    districts = [
        {"code": code_value, "name": district_names[code_value], "partyVotes": votes}
        for code_value, votes in party_districts[source_name].items()
        if votes
    ]
    districts.sort(key=lambda district: (-district["partyVotes"], district["name"]))
    parties.append({
        "code": code,
        "name": display_name,
        "sourceName": source_name,
        "partyVotes": total,
        "candidates": [],
        "districts": districts,
    })

parties.sort(key=lambda party: (-party["partyVotes"], party["name"]))
payload = {
    "source": {
        "name": source_path.name,
        "sheet": "roster_KF",
        "note": "Bearbetad från Valmyndighetens slutliga röster per valdistrikt i kommunvalet 2022.",
    },
    "municipality": "Helsingborg",
    "municipalityCode": "1283",
    "election": "2022",
    "electionType": "KF",
    "parties": parties,
}

output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"parties": len(parties), "totalVotes": sum(p["partyVotes"] for p in parties), "output": str(output_path)}, ensure_ascii=False))
