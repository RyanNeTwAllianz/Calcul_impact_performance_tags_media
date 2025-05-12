from pathlib import Path
import json

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

file_name = "unifed_hars.har"

def get_hars():
    exports_dir = Path("exports")
    subdirs = [d for d in exports_dir.iterdir() if d.is_dir()]
    subdirs.sort(key=lambda x: x.stat().st_mtime, reverse=True)
    last_dir = subdirs[0]
    print(f"File choosen : {last_dir}")
    har_files = list(last_dir.glob("*.har"))    
    return har_files

def unify_hars() -> str:
    har_files = get_hars()
    for har_path in har_files:
        with open(har_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            entries = data.get("log", {}).get("entries", [])
            har_unifie["log"]["entries"].extend(entries)
            
    with open(file_name, 'w', encoding='utf-8') as out:
        json.dump(har_unifie, out, indent=2)
        print("File created")
    
    return file_name

unify_hars()