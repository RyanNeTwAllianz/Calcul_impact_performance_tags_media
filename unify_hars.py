from pathlib import Path
import json

file_name = "unifed_hars.har"

def get_hars():
    exports_dir = Path("exports")
    subdirs = [d for d in exports_dir.iterdir() if d.is_dir()]
    subdirs.sort(key=lambda x: x.stat().st_mtime, reverse=True)
    last_dir = subdirs[0]
    print(f"File choosen : {last_dir}")
    har_files = list(last_dir.glob("*.har"))    
    
    return har_files



def unify_hars(har_file) -> str:
    print(har_file)
    har_unifie = {
        "log": {
            "version": "1.2",
            "creator": {
                "name": "Ryan",
                "version": "1.0"
            },
            "entries": []
        }
    }
    with open(har_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        entries = data.get("log", {}).get("entries", [])
        har_unifie["log"]["entries"].extend(entries)
        
    return har_unifie["log"]["entries"]