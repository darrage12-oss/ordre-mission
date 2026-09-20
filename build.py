import os, re
base_dir = r'C:\Users\huawei\.gemini\antigravity\scratch\ordre-mission'
html_path = os.path.join(base_dir, 'index.html')
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

def css_replacer(match):
    path = os.path.join(base_dir, match.group(1))
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return '<style>\n' + f.read() + '\n</style>'
    return match.group(0)

html = re.sub(r'<link\s+rel=\"stylesheet\"\s+href=\"([^>]+\.css)\">', css_replacer, html)

def js_replacer(match):
    path = os.path.join(base_dir, match.group(1))
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return '<script>\n' + f.read() + '\n</script>'
    return match.group(0)

html = re.sub(r'<script\s+src=\"([^>]+\.js)\"><\/script>', js_replacer, html)

with open(os.path.join(base_dir, 'ordre-mission-standalone.html'), 'w', encoding='utf-8') as f:
    f.write(html)
print('standalone cree')
