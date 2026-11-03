from pathlib import Path
from html.parser import HTMLParser
import re
ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text()
css = (ROOT / 'styles.css').read_text()
js = (ROOT / 'script.js').read_text()
class Checker(HTMLParser):
    ids = set()
    dupes = []
    imgs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        i = attrs.get('id')
        if i:
            if i in self.ids: self.dupes.append(i)
            self.ids.add(i)
        if tag == 'img': self.imgs.append(attrs)
p = Checker(); p.feed(html)
assert not p.dupes, f'duplicate IDs {p.dupes}'
for anchor in re.findall(r'href="#([\w-]+)"', html):
    assert anchor in p.ids, f'broken anchor: {anchor}'
assert all(img.get('alt') for img in p.imgs if img.get('id') != 'lightbox-image'), 'all content images need alt text'
assert 'lightbox-image' in html and "$('#lightbox-image').alt = img.alt" in js, 'viewer needs dynamic alt text'
assert len(p.imgs) >= 6, 'not enough editorial imagery'
assert 'noindex, nofollow' in html and 'fictional studio' in html.lower(), 'concept disclosure missing'
for q in ['@media(max-width:900px)','@media(max-width:650px)','@media(max-width:370px)','prefers-reduced-motion']:
    assert q in css, f'missing responsive/accessibility rule: {q}'
for token in ['Escape', 'aria-pressed', 'mailto:', 'navigator.clipboard.writeText', 'trapFocus']:
    assert token in js, f'missing interaction {token}'
for name in ['styles.css','script.js','assets/favicon.svg','vercel.json']:
    assert (ROOT/name).is_file(), name
print(f'OK: {len(p.ids)} IDs, {len(p.imgs)} accessible images, valid anchors, 4 responsive/motion cases, interactive design brief')