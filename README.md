# Frontpocket — website

Statische site (drie pagina's) voor **frontpocket.nl**. Gehost op Strato, gedeployed via GitHub Actions.

## Pagina's

- `index.html` — landingspagina
- `check.html` — de check van zes vragen (client-side, geen opslag)

## Structuur

```
/
├── index.html            landing
├── check.html            check
├── assets/
│   ├── style.css         gedeelde stylesheet (alle tokens hier)
│   ├── check.js          vanilla JS voor de check
│   ├── config.js         Calendly-URL + analytics-stub
│   ├── favicon.svg       taupe tegel met witte F
│   ├── rene.png          portret René
│   └── jan.png           portret Jan
├── robots.txt            Disallow: / (site staat op noindex)
├── .htaccess             HTTPS-forceren, .html verbergen, caching
├── .github/workflows/deploy.yml   GitHub Actions FTP-deploy
└── README.md
```

## Lokaal draaien

Puur statisch, geen build. Twee opties:

**VS Code Live Server** — installeer de "Live Server"-extensie, klik "Go Live".

**Python** — vanuit deze map:

```powershell
python -m http.server 8000
```

Open dan http://localhost:8000

## Deploy naar Strato

### Eenmalige setup

1. **SFTP-account bij Strato**
   Klantenlogin → Hosting → FTP-manager → nieuw account. **Belangrijk:** stel de startmap in op de webroot van `frontpocket.nl` (meestal `/` of `/htdocs/`) — niet op een submap zoals `wp-content`, anders komt de site op `frontpocket.nl/wp-content/` terecht.

2. **GitHub secrets zetten**
   Repo → Settings → Secrets and variables → Actions → New repository secret. Zet:

   | Secret | Waarde |
   |---|---|
   | `STRATO_FTP_HOST` | bv. `xxxxxxx.ssh.strato.hosting` |
   | `STRATO_FTP_USER` | de gebruikersnaam van het SFTP-account |
   | `STRATO_FTP_PASSWORD` | het wachtwoord |
   | `STRATO_FTP_PORT` | `22` voor SFTP (default 22) |
   | `STRATO_FTP_PROTOCOL` | `sftp` (default) |
   | `STRATO_FTP_DIR` | server-directory, meestal `/` (default `/`) |

3. **Push naar `main`** — elke push deployt binnen ~30 seconden.

### Deploy uitvoeren zonder push

Repo → Actions → "Deploy naar Strato" → Run workflow.

## Analytics

Nog niet gekozen. `assets/config.js` heeft een no-op `FRONTPOCKET_ANALYTICS.track()`. De code roept die op vier momenten aan:

- `check_gestart`
- `check_afgerond` (met `grootste_lek`, `uren_per_week`, `bedrag_per_jaar`)
- `grootste_lek` (met welk lek)
- `calendly_click` (met welke van de vier knoppen)

Zodra er een tool gekozen is (Plausible, GoatCounter, Umami), vervang je de body van `track()` in `assets/config.js`.

## noindex

Beide pagina's staan op `<meta name="robots" content="noindex,nofollow">` en `robots.txt` doet `Disallow: /`. Zodra de site live mag: die drie regels verwijderen.

## Merk

Zie `MERK.md` voor het volledige huisstijldocument. Kort:

- Woordmerk: typografisch, `<b>Front</b>pocket` — vet taupe + normaal donker, geen beeldmerk, hoofdletter F
- Kleuren: taupe `#5F5A51` (accent), donker `#2B3034` (ink), grond `#F6F5F2` (achtergrond)
- Lopende tekst: `Frontpocket`, hoofdletter F, verder gewoon
- Frontpocket is een handelsnaam van IAS17 Consultancy BV, Hoorn
- Alle bedragen zijn exclusief btw
