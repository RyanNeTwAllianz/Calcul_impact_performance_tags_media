import json
import xlsxwriter  # type: ignore
from unify_hars import get_hars
import os
from unify_hars import unify_hars
import argparse



# Liste des mots-clés pour chaque outil
OUTIL_KEYWORDS = {
    "facebook (meta + hipto)": ["facebook", "fbcdn", "fb."],
    "adrenalead": ["adrenalead", "notifpush.com"],
    "bing": ["bing.com"],
    "campaign manager": ["doubleclick.net"],
    "google ads": ["googleads", "ade.googlesyndication.com", "adservice.google"],
    "linkedin": ["linkedin", "licdn"],
    "numberly": ["mmtro.com"],
    "oceads": ["oceads", "oadstrack"],
    "xandr (xandr + manageo + numberly)": ["adnxs.com", "xandr"],
    "outbrain": ["outbrain"],
    "powerspace": ["powerspace"],
    "snapchat": ["snapchat", "sc-static.net", "snapads"],
    "stackadapt": ["stackadapt", "sa.pub"],
    "taboola": ["taboola", "trc.taboola.com"],
    "teads": ["teads", "teads.tv"],
    "tiktok": ["tiktok", "ads.tiktok.com"],
    "timeone ancien tracking": ["publicidees.com", "logbor.com", "jsdelivr.net"],
    "timeone promethee": ["jsdelivr.net", "time1.me"],
    "twitter": ["twitter", "t.co/", "ads-twitter.com"],
    "weedo it": ["trck23.fr", "weedoit"],
    "wizaly": ["wizaly", "wz.allianz.fr"]
}


#Recuper l'argument du script en js
parser = argparse.ArgumentParser()
parser.add_argument('--mode', type=str, required=True, help='Mode à passer')
args = parser.parse_args()
argIteration = int(args.mode)


def analyze_har_to_excel(har_data, workbook, sheet_name, isAverage):

    entries = har_data['log']['entries']
    results = []

    for outil, keywords in OUTIL_KEYWORDS.items():
        tool_entries = [
            e for e in entries 
            if any(k in e['request']['url'].split('/')[2] for k in keywords)
        ]

        content_download = sum(e['timings'].get('receive', 0) for e in tool_entries)
        wait = sum(e['timings'].get('wait', 0) for e in tool_entries)
        total_time = content_download + wait
        request_count = len(tool_entries)
        total_weight_ko = sum(
            e.get('response', {}).get('content', {}).get('size', 0) 
            for e in tool_entries
        ) / 1024
        
        if isAverage:
            content_download = content_download / argIteration
            wait = wait / argIteration
            total_time = content_download + wait
            total_weight_ko = total_weight_ko / argIteration
            request_count = request_count / argIteration

        results.append([
            outil,
            round(content_download, 2),
            round(total_time, 2),
            request_count,
            round(total_weight_ko, 2)
        ])

    total_line = [
        "Total",
        round(sum(r[1] for r in results), 2),
        round(sum(r[2] for r in results), 2),
        sum(r[3] for r in results),
        round(sum(r[4] for r in results), 2)
    ]

    worksheet = workbook.add_worksheet(sheet_name)

    headers = ["Outil", "Content Download (ms)", "Temps réel utilisé (ms)", "Nombre de requêtes", "Poids total (Ko)"]
    worksheet.write_row(1, 0, headers)

    # Formats
    total_format = workbook.add_format({'bg_color': '#C6EFCE', 'bold': True})
    number_format = workbook.add_format({'num_format': '0.00'})
    int_format = workbook.add_format({'num_format': '0'})

    # Ligne des totaux (ligne 0)
    worksheet.write_row(0, 0, total_line, total_format)

    for row_num, row in enumerate(results, start=2):
        worksheet.write_string(row_num, 0, row[0])
        worksheet.write_number(row_num, 1, row[1], number_format)
        worksheet.write_number(row_num, 2, row[2], number_format)
        worksheet.write_number(row_num, 3, row[3], int_format)
        worksheet.write_number(row_num, 4, row[4], number_format)

    # Mise en forme conditionnelle
    worksheet.conditional_format("B3:B100", {
        'type': 'cell', 'criteria': '>=', 'value': 1000,
        'format': workbook.add_format({'bg_color': '#FF0000', 'font_color': '#FFFFFF'})
    })
    worksheet.conditional_format("B3:B100", {
        'type': 'cell', 'criteria': '>=', 'value': 400,
        'format': workbook.add_format({'bg_color': '#F79646'})
    })
    worksheet.conditional_format("C3:C100", {
        'type': 'cell', 'criteria': '>=', 'value': 4000,
        'format': workbook.add_format({'bg_color': '#FF0000', 'font_color': '#FFFFFF'})
    })
    worksheet.conditional_format("C3:C100", {
        'type': 'cell', 'criteria': '>=', 'value': 1500,
        'format': workbook.add_format({'bg_color': '#F79646'})
    })
    worksheet.conditional_format("D3:D100", {
        'type': 'cell', 'criteria': '>=', 'value': 30,
        'format': workbook.add_format({'bg_color': '#FF0000', 'font_color': '#FFFFFF'})
    })
    worksheet.conditional_format("D3:D100", {
        'type': 'cell', 'criteria': '>=', 'value': 15,
        'format': workbook.add_format({'bg_color': '#F79646'})
    })
    worksheet.conditional_format("E3:E100", {
        'type': 'cell', 'criteria': '>=', 'value': 300,
        'format': workbook.add_format({'bg_color': '#FF0000', 'font_color': '#FFFFFF'})
    })
    worksheet.conditional_format("E3:E100", {
        'type': 'cell', 'criteria': '>=', 'value': 50,
        'format': workbook.add_format({'bg_color': '#F79646'})
    })

    # Format de tableau
    worksheet.add_table(f"A2:E{len(results)+2}", {
        'columns': [{'header': h} for h in headers],
        'style': 'Table Style Medium 9'
    })

    # Ajustement des colonnes
    worksheet.set_column("A:A", 35)
    worksheet.set_column("B:E", 22)


def main():
    #Récuperation des fichiers .har du dernier crawl
    hars = get_hars()
    
    #Création du fichier .har
    folder_name = str(hars[0]).split("\\")[1]
    
    if not os.path.isdir(f'./csv/{folder_name}'):
        os.makedirs(f'./csv/{folder_name}')
        
    output_file = f'./csv/{folder_name}/One.xlsx'
    workbook = xlsxwriter.Workbook(output_file)

    #Loop sur les paths des .har
    for x in hars:
        input = str(x).replace("\\", "/")
        output = input.replace(".har", "").split("/")
        
        sheet_name = str(output[2])[slice(-30, None)]
        
        #Traitement des données
        with open(f'./{input}', 'r', encoding='utf-8') as f:
            har_data = json.load(f)
        analyze_har_to_excel(har_data, workbook, sheet_name, False)
    
    print('CSV affichant chaque itération de chaque parcours finit !')
    workbook.close()
    print(f"Results saved to {output_file}")
    
    output_file = f'./csv/{folder_name}/Tot.xlsx'
    workbook = xlsxwriter.Workbook(output_file)
    
    hars_filtred = {"log": {"entries": []}} 
    itr = 0
    for x in hars:
        input = str(x).replace("\\", "/")
        entries = unify_hars(f'./{input}')
        hars_filtred["log"]["entries"].extend(entries)
        
        #Loop en modulo 3 pour faire la somme des itération des parcours
        if (itr + 1) % argIteration == 0:
            output = input.replace(".har", "").split("/")
            sheet_name = str(output[2])[slice(-30, None)]
            
            analyze_har_to_excel(hars_filtred, workbook, sheet_name[:-2], True)
            hars_filtred["log"]["entries"] = []
            
        itr = itr + 1
    print('CSV affichant la somme de chaque parcours finit !')   
    workbook.close()
    print(f"Results saved to {output_file}")


main()