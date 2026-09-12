# Squartiqa 4F (licensed webfont)

Squartiqa 4F is a commercial font by 4th february (Sergiy Tkachenko). It is
not committed here. Buy a webfont license (Fontspring or MyFonts) and drop the
files in this folder with these exact names:

    Squartiqa4F-Regular.woff2   -> used for every heading weight 400-900
    Squartiqa4F-Light.woff2     -> used for weights 100-399 (optional)

The @font-face rules live in app/globals.css. Until the files exist the
headings fall back to Barlow Condensed, so nothing breaks.

The family has no Bold cut; the Regular file is declared with a weight range so
the browser never synthesizes a fake bold.
