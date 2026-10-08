import csv, json
from datetime import date
from pydantic import BaseModel, HttpUrl, ValidationError
from pathlib import Path

BASE = Path(__file__).parent

class Resort(BaseModel):
    name: str
    country: str
    day_price: float
    currency: str
    source: HttpUrl
    updated: date

def createJson(data):
    with open(BASE.parent / 'ski-prices-data/resorts.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def main():
    with open(BASE.parent / 'ski-prices-data/resorts.csv', newline='', encoding='utf-8') as f:
        resorts = {}
        for row in csv.DictReader(f):
            try:
                resort = Resort(**row)  
            except ValidationError as exc:
                key = exc.errors()[0]['loc'][0]
                if key == 'day_price':
                    row[key] = 0.00
                else:
                    row[key] = 'n/a'
                resort = Resort(**row)
        
            resorts.setdefault(resort.country, []).append(resort.model_dump(mode='json'))   
        createJson(resorts)


if __name__ == '__main__':
    main()