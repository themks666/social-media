import pathlib
import re
path = pathlib.Path(r"c:\Users\Asus\Desktop\mern-app\frontend\src\pages\userPage\HomeWithAuth.tsx")
text = path.read_text(encoding='utf-8')
text = re.sub(r'//.*?$','', text, flags=re.MULTILINE)
text = re.sub(r'/\*.*?\*/','', text, flags=re.DOTALL)
text = re.sub(r'<!--.*?-->','', text, flags=re.DOTALL)
path.write_text(text, encoding='utf-8')
print('removed comments from HomeWithAuth.tsx')
