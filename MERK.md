# MERK — Frontpocket

## Woordmerk

Typografisch, één woord, twee gewichten en twee kleuren. Geen beeldmerk, geen punt. Hoofdletter F. In lopende tekst schrijven we `Frontpocket`, verder gewoon.

HTML:

```html
<span class="wm"><b>Front</b>pocket</span>
```

CSS:

```css
.wm{font-family:Arimo,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight:400;letter-spacing:-.03em;line-height:1;color:var(--ink);white-space:nowrap}
.wm b{font-weight:700;color:var(--accent)}
```

Op donker vlak (voettekst en boekingsblok) krijgt `.wm` `color:var(--on-donker)`. In donkere modus is `--accent` het lichte taupe (`#A39B8E`), dat leest goed op donker.

## Lettertype

Het woordmerk staat in **Arimo** (Google Fonts, gewichten 400 en 700), met systeem-fallback op Helvetica Neue / Helvetica / Arial. De rest van de site (koppen, lopende tekst, knoppen, cijfers) staat in **Schibsted Grotesk**.

De reden voor twee lettertypes: het merk is als beeld aangeleverd in een neo-grotesk van het Helvetica/Arial-type. Dat woordmerk moet er in de mailhandtekening, op LinkedIn en op de site hetzelfde uitzien, dus krijgt het zijn eigen familie. Arimo is metrisch gelijk aan Arial en gratis via Google Fonts, dus overal reproduceerbaar. `Front` staat op gewicht 700 (Arimo heeft geen 800, en de referentie is gewoon vet, niet extra vet).

## Palet

| Rol | Hex (licht) | Hex (donker) | Waarvoor |
|---|---|---|---|
| Taupe / accent | `#5F5A51` | `#A39B8E` | het `Front` in het woordmerk, primaire knoppen, accenten |
| Donker / ink | `#2B3034` | `#ECEAE6` | lopende tekst, koppen, donkere vlakken |
| Wit / surface | `#FFFFFF` | `#24282C` | kaarten, oppervlakken |
| Grond | `#F6F5F2` | `#1B1E21` | paginaachtergrond |

Contrast in licht: taupe op wit 6,9:1, wit op taupe 6,9:1, donker op wit 13,4:1 — alles ruim AA. In donkere modus haalt witte tekst op licht taupe maar 2,8:1; de knoptekst wordt daar donker (`#2B3034`) op licht taupe (`#A39B8E`) — 4,9:1. Dat regelt het token `--on-accent` (`#FFFFFF` in licht, `#2B3034` in donker).

Het merk heeft geen felle accentkleur. Dat is een keuze: rust en betrouwbaarheid. Taupe ís de knopkleur; er komt geen kleur bij "voor de knoppen".

## Knopstaten

- **Primair**: `background:var(--accent)`, `color:var(--on-accent)`, `border:2px solid var(--accent)`, volledig rond.
- **Rustig** (`.knop.licht`): transparant, `border:2px solid var(--accent)`, `color:var(--accent)`.
- **Op donker** (`.knop.opdonker`): `background:var(--on-donker)`, `color:var(--donker)`.
- **Hover** primair en rustig: naar `--accent-dark`.
- **Focus**: 2px `--accent` ring met 2px offset (via `:focus-visible`).

## Merkbalk

Links het woordmerk, rechts de regel `Alles in je pocket.` (met punt). Deze regel vervangt de eerdere taglines. Voorbeelden hierop op `check.html` (`De check`) en `voorwaarden.html` (`Algemene voorwaarden`) blijven staan omdat ze de pagina benoemen, niet het merk.

## Favicon

Taupe tegel `#5F5A51`, ronde hoeken (`rx=14`), witte, vette hoofdletter F als `<path>` — niet als `<text>`, zodat het geen geïnstalleerd lettertype nodig heeft.

## Herkomst

Typografisch woordmerk, aangeleverd door René Slagter op 12 september 2026 (referentie `LOGO NIEUWE KLEUR RUSTIG`). Eerdere richtingen met beeldmerk (het "pocket"-icoon) en het navy/turquoise-palet zijn vervallen.
