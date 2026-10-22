# Kotarou reading fonts

Both fonts are self-hosted under the **SIL Open Font License 1.1**. The complete
copyright notices and licenses are distributed beside the WOFF2 files.

## Heading: Zhi Mang Xing / 志莽行书

- Designer: Wei Zhimang / 魏志莽.
- Upstream describes this as a **running script**, with connected strokes within
  individual characters, based on Wei Zhimang's handwritten calligraphy.
- Source: <https://github.com/google/fonts/tree/187e2123ad2710ad8c2fa9955332fe9073e834b1/ofl/zhimangxing>.
- Original: `ZhiMangXing-Regular.ttf`; real weight 400, no synthetic bold/italic.
- License: [zhi-mang-xing-OFL.txt](zhi-mang-xing-OFL.txt).
- Core: 780 characters / 205,944 bytes; 14 WOFF2 shards / 2,385,836 bytes total.

## Body: Noto Sans SC / 思源黑体简体中文版（Noto 发行版）

- Source: <https://github.com/google/fonts/tree/a85815a42757630ce188fdad368c2dfc444d4773/ofl/notosanssc>.
- Original: `NotoSansSC[wght].ttf`; variable font restricted to real weights
  400–700. Body uses 500; `strong` uses 700.
- License: [noto-sans-sc-OFL.txt](noto-sans-sc-OFL.txt).
- Core: 1,185 characters / 246,660 bytes; 60 WOFF2 shards / 9,098,624 bytes total.

## Loading and maintenance

`assets/css/reading-fonts.css` defines disjoint `unicode-range` faces with
`font-display: swap`. The browser only fetches shards used by the current page;
the 11.48 MB combined font library is **not** a per-page download. The heading
core covers current Markdown titles/headings, Latin text and punctuation. The
body core contains the 1,000 most frequent characters plus Latin/punctuation.
Remaining upstream characters are retained in 512-character on-demand shards,
so new posts do not need a font rebuild to use supported characters. Characters
outside an upstream font's coverage use the explicitly configured sans-serif
fallback. Font synthesis is disabled in articles.

No third-party font request is needed. Font files and the font stylesheet use
content-hashed names. Only single-page templates load the font stylesheet;
listing pages retain their existing system UI font.

The acceptance article (中澳铁矿石产业链重构) fetched 665,572 bytes of fonts
in total across both families. This is measured with an empty browser cache;
subsequent articles can reuse cached shards.

To refresh the core subsets after adding many articles (optional):

```sh
uv run --with fonttools --with brotli python scripts/prepare-reading-fonts.py
hugo --gc --minify
```

The script downloads pinned sources into `~/.cache/kotarou-reading-fonts` and
generates checked-in WOFF2/CSS files. Hugo and Blog Writer do not require Python
or this generation step. Review the resulting font/CSS diff before committing.
