import csv
import xml.etree.ElementTree as ET
import json

# Lecture du fichier CSV
with open('liste1.csv', 'r', newline='', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=';')
    csv_data = list(csv_reader)

# Lecture du fichier XML
tree = ET.parse('liste2.xml')
root = tree.getroot()

xml_data = []
for client in root.findall('client'):
    nom = client.find('nom').text.strip()
    prenom = client.find('prenom').text.strip()
    email = client.find('email').text.strip()
    xml_data.append({
        'nom': nom,
        'prenom': prenom,
        'email': email
    })

# Fusion des données
merged_data = csv_data + xml_data

# Création du fichier JSON
output_data = []
for item in merged_data:
    email = next((item.get(key, '') for key in ['email', 'email1', 'email2', 'email3'] if item.get(key)), '')
    output_data.append({
        'nom': item['nom'],
        'prenom': item['prenom'],
        'email': email
    })

with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(output_data, json_file, ensure_ascii=False, indent=4)


