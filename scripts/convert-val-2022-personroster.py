import json
import re
from pathlib import Path

from pypdf import PdfReader


pdf_path = Path(r"C:\Users\magnu\AppData\Local\Temp\protokoll_Val_20220911_1283_KF.pdf")
output_path = Path("app/data/val-2022-personroster-helsingborg.json")

party_codes = {
    "Moderaterna": "M",
    "Centerpartiet": "C",
    "Liberalerna (tidigare Folkpartiet)": "L",
    "Kristdemokraterna": "KD",
    "Arbetarepartiet-Socialdemokraterna": "S",
    "V\ufffdnsterpartiet": "V",
    "Milj\ufffdpartiet de gr\ufffdna": "MP",
    "Sverigedemokraterna": "SD",
}
display_names = {
    "V\ufffdnsterpartiet": "Vänsterpartiet",
    "Milj\ufffdpartiet de gr\ufffdna": "Miljöpartiet de gröna",
}

text = "\n".join(page.extract_text() or "" for page in PdfReader(pdf_path).pages)
start = text.rfind("Valsedlar med kandidater")
end = text.rfind("Kandidater som klarat spärren", start)
section = text[start:end]

parties = []
party_headers = list(party_codes)
party_patterns = {
    party_name: re.escape(party_name)
    for party_name in party_headers
}
party_patterns["V\ufffdnsterpartiet"] = r"V.nsterpartiet"
party_patterns["Milj\ufffdpartiet de gr\ufffdna"] = r"Milj.partiet de gr.na"
header_positions = sorted(
    (match.start(), party_name)
    for party_name in party_headers
    if (match := re.search(party_patterns[party_name], section))
)
for index, (header_start, party_name) in enumerate(header_positions):
    header_end = header_positions[index + 1][0] if index + 1 < len(header_positions) else len(section)
    block = section[header_start:header_end]
    candidates = []
    candidate_lines = False

    for raw_line in block.splitlines():
        line = " ".join(raw_line.replace("\xa0", " ").split())
        if "Antal personröster" in line:
            candidate_lines = True
            continue
        if not candidate_lines or not line or line.startswith(("Listnummer:", "Sida ", "VAL ", "Summa")):
            continue

        match = re.match(r"^(\d{1,3})\s+(.+?)(?:\s+(\d[\d ]*))?$", line)
        if not match:
            continue
        number = int(match.group(1))
        name = match.group(2).strip()
        vote_text = (match.group(3) or "").replace(" ", "")
        if name.startswith("[Ej valbar]"):
            continue
        candidates.append({
            "number": number,
            "name": name,
            "personalVotes": int(vote_text) if vote_text else 0,
            "districts": [],
        })

    parties.append({
        "code": party_codes[party_name],
        "name": "Liberalerna" if party_name.startswith("Liberalerna") else display_names.get(party_name, party_name),
        "sourceName": party_name,
        "candidates": candidates,
    })

payload = {
    "source": {
        "name": pdf_path.name,
        "note": "Kandidatpersonröster från Länsstyrelsen Skånes slutliga valprotokoll för Helsingborgs kommunval 2022.",
        "url": "https://resultat.val.se/protokoll/protokoll_Val_20220911_1283_KF.pdf",
    },
    "municipality": "Helsingborg",
    "municipalityCode": "1283",
    "election": "2022",
    "electionType": "KF",
    "parties": parties,
}

output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"parties": len(parties), "candidates": sum(len(p["candidates"]) for p in parties), "output": str(output_path)}, ensure_ascii=False))
