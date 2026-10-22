# Kotarou reading fonts

Both fonts are self-hosted under the **SIL Open Font License 1.1**. The complete
copyright notices and licenses are distributed beside the WOFF2 files.

## Heading: Ma Shan Zheng / 马善政毛笔楷书

- Designer: Ma ShanZheng / 马善政.
- A full-bodied brush script with stable, legible character structures; selected
  after comparing the existing economic article's title and chapter heading.
- Source: <https://github.com/google/fonts/tree/406197b91ff39a93061c2c2eeaee67ddf2ae1f0d/ofl/mashanzheng>.
- Original: `MaShanZheng-Regular.ttf`; real weight 400, no synthetic bold/italic.
- License: [ma-shan-zheng-OFL.txt](ma-shan-zheng-OFL.txt).
- Core: 780 characters / 277,848 bytes; 14 WOFF2 shards / 3,346,720 bytes total.
- Desktop H1/H2/H3: 44/32/26px; mobile: 34/28/24px.

## Body: Noto Sans SC / 思源黑体简体中文版（Noto 发行版）

- Source: <https://github.com/google/fonts/tree/a85815a42757630ce188fdad368c2dfc444d4773/ofl/notosanssc>.
- Original: `NotoSansSC[wght].ttf`; variable font restricted to real weights
  400–700. Body uses 500; `strong` uses 700.
- License: [noto-sans-sc-OFL.txt](noto-sans-sc-OFL.txt).
- Core: 1,185 characters / 246,660 bytes; 60 WOFF2 shards / 9,098,624 bytes total.

## Loading and maintenance

`assets/css/reading-fonts.css` defines disjoint `unicode-range` faces with
`font-display: swap`. The browser only fetches shards used by the current page;
the 12.45 MB combined font library is **not** a per-page download. The heading
core covers current Markdown titles/headings, Latin text and punctuation. The
body core contains the 1,000 most frequent characters plus Latin/punctuation.
Remaining upstream characters are retained in 512-character on-demand shards,
so new posts do not need a font rebuild to use supported characters. Characters
outside an upstream font's coverage use the explicitly configured sans-serif
fallback. Font synthesis is disabled in articles.

No third-party font request is needed. Font files and the font stylesheet use
content-hashed names. Only single-page templates load the font stylesheet;
listing pages retain their existing system UI font.

To refresh the core subsets after adding many articles (optional):

```sh
uv run --with fonttools --with brotli python scripts/prepare-reading-fonts.py
hugo --gc --minify
```

The script downloads pinned sources into `~/.cache/kotarou-reading-fonts` and
generates checked-in WOFF2/CSS files. Hugo and Blog Writer do not require Python
or this generation step. Review the resulting font/CSS diff before committing.
