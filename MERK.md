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
    font-weight:400;letter-spacing:-.03em;line-height:1;color:var(--accent);white-space:nowrap}
.wm b{font-weight:700;color:var(--ink)}
```

`Front` staat op de donkere kleur (`--ink`, `#2B3034`), `pocket` op het teal accent (`--accent`, `#20C7A5`). Op de referentie zit `pocket` in een gedempte taupe; op de site kleurt het mee met het accent dat ook de knoppen, badges en cijfers pakt.

Op donker vlak (voettekst en boekingsblok) krijgt `.wm` `color:var(--on-donker)` en `.wm b` óók `color:var(--on-donker)` — de twee helften worden dan onderscheiden door het gewicht, niet door de kleur.

## Lettertype

Het woordmerk staat in **Arimo** (Google Fonts, gewichten 400 en 700), met systeem-fallback op Helvetica Neue / Helvetica / Arial. De rest van de site (koppen, lopende tekst, knoppen, cijfers) staat in **Schibsted Grotesk**.

De reden voor twee lettertypes: het merk is als beeld aangeleverd in een neo-grotesk van het Helvetica/Arial-type. Dat woordmerk moet er in de mailhandtekening, op LinkedIn en op de site hetzelfde uitzien, dus krijgt het zijn eigen familie. Arimo is metrisch gelijk aan Arial en gratis via Google Fonts, dus overal reproduceerbaar. `Front` staat op gewicht 700 (Arimo heeft geen 800, en de referentie is gewoon vet, niet extra vet).

## Palet

| Rol | Hex (licht) | Hex (donker) | Waarvoor |
|---|---|---|---|
| Accent (teal) | `#20C7A5` | `#3FDDBB` | het `pocket`-deel van het woordmerk, primaire knoppen, badges, cijfers, check-icoontjes |
| Ink (donker) | `#2B3034` | `#ECEAE6` | het `Front`-deel van het woordmerk, lopende tekst, koppen, donkere vlakken |
| Surface (wit) | `#FFFFFF` | `#24282C` | kaarten, oppervlakken |
| Grond | `#F6F5F2` | `#1B1E21` | paginaachtergrond |

Contrast in licht: donker op wit 13,4:1 (AAA), wit op teal 3,0:1 (nét onder AA voor kleine tekst, maar knoppen zijn bold en groter). Om de knoptekst in donkere modus goed leesbaar te houden staat `--on-accent` daar op donker (`#0B1620`) op licht teal (`#3FDDBB`) — 8,1:1.

De basis is bewust rustig (grond + donker + wit); teal is de enige felle kleur, en die zit alleen op de plekken waar hij aandacht moet trekken.

## Knopstaten

- **Primair**: `background:var(--accent)`, `color:var(--on-accent)`, `border:2px solid var(--accent)`, volledig rond.
- **Rustig** (`.knop.licht`): transparant, `border:2px solid var(--accent)`, `color:var(--accent)`.
- **Op donker** (`.knop.opdonker`): `background:var(--on-donker)`, `color:var(--donker)`.
- **Hover** primair en rustig: naar `--accent-dark`.
- **Focus**: 2px `--accent` ring met 2px offset (via `:focus-visible`).

## Merkbalk

Links het woordmerk, rechts de regel `Alles in je pocket.` (met punt). Deze regel vervangt de eerdere taglines. Voorbeelden hierop op `check.html` (`De check`) en `voorwaarden.html` (`Algemene voorwaarden`) blijven staan omdat ze de pagina benoemen, niet het merk.

## Favicon

Teal tegel `#20C7A5`, ronde hoeken (`rx=14`), witte, vette hoofdletter F als `<path>` — niet als `<text>`, zodat het geen geïnstalleerd lettertype nodig heeft.

## Herkomst

Typografisch woordmerk, aangeleverd door René Slagter op 12 september 2026 (referentie `LOGO NIEUWE KLEUR RUSTIG`). Eerdere richtingen met beeldmerk (het "pocket"-icoon) en het navy/turquoise-palet zijn vervallen.
