(function(){
  "use strict";

  var VRAGEN = [
    {
      thema: "Om te beginnen",
      vraag: "Wat voor bedrijf heb je?",
      hulp: "",
      soort: "vak",
      opties: [
        {t:"Aannemer of timmerbedrijf", v:"aannemer"},
        {t:"Installateur, elektricien of loodgieter", v:"installateur"},
        {t:"Schilder, stukadoor of afbouw", v:"afbouw"},
        {t:"Hovenier, boomverzorger of grondwerk", v:"groen"}
      ]
    },
    {
      thema: "Offertes",
      vraag: "Hoeveel tijd kost het uitwerken van offertes je per week?",
      hulp: "Opmeten uitwerken, bedragen overtypen, netjes maken en versturen.",
      soort: "lek", sleutel: "offerte",
      opties: [
        {t:"Bijna niets", v:0.5, h:"minder dan 1 uur"},
        {t:"Een uurtje of anderhalf", v:1.5, h:"1 tot 2 uur"},
        {t:"Een paar uur", v:3, h:"2 tot 4 uur"},
        {t:"Meer dan een halve dag", v:5, h:"4 uur of meer"}
      ]
    },
    {
      thema: "Bonnen en facturen",
      vraag: "En het uitzoeken van bonnen, uren en facturen achteraf?",
      hulp: "Terugzoeken wat er gedaan is, hoeveel uur erin zat, en wat er nog gefactureerd moet.",
      soort: "lek", sleutel: "bon",
      opties: [
        {t:"Bijna niets", v:0.5, h:"minder dan 1 uur"},
        {t:"Een uurtje of anderhalf", v:1.5, h:"1 tot 2 uur"},
        {t:"Een paar uur", v:3, h:"2 tot 4 uur"},
        {t:"Meer dan een halve dag", v:5, h:"4 uur of meer"}
      ]
    },
    {
      thema: "Planning",
      vraag: "Hoeveel tijd kost het plannen en afstemmen wie waar heen moet?",
      hulp: "Rondbellen, appen, omgooien als er werk uitvalt of een levering niet komt.",
      soort: "lek", sleutel: "planning",
      opties: [
        {t:"Bijna niets", v:0.5, h:"minder dan 1 uur"},
        {t:"Een uurtje of anderhalf", v:1.5, h:"1 tot 2 uur"},
        {t:"Een paar uur", v:3, h:"2 tot 4 uur"},
        {t:"Meer dan een halve dag", v:5, h:"4 uur of meer"}
      ]
    },
    {
      thema: "Klanten",
      vraag: "En het nabellen van klanten en het inplannen van onderhoud?",
      hulp: "Achter offertes aan, terugbellen, en bijhouden wie weer aan de beurt is.",
      soort: "lek", sleutel: "klant",
      opties: [
        {t:"Bijna niets", v:0.5, h:"minder dan 1 uur"},
        {t:"Een uurtje of anderhalf", v:1.5, h:"1 tot 2 uur"},
        {t:"Een paar uur", v:3, h:"2 tot 4 uur"},
        {t:"Meer dan een halve dag", v:5, h:"4 uur of meer"}
      ]
    },
    {
      thema: "Tot slot",
      vraag: "Wat is een uur van jou ongeveer waard?",
      hulp: "Neem je eigen uurtarief, of wat je een ingehuurde kracht betaalt.",
      soort: "tarief",
      opties: [
        {t:"Rond de 45 euro", v:45},
        {t:"Rond de 55 euro", v:55},
        {t:"Rond de 65 euro", v:65},
        {t:"75 euro of meer", v:80}
      ]
    }
  ];

  var LEKKEN = {
    offerte: {
      naam: "Offertes uitwerken",
      tekst: "Bij jou zit de meeste tijd in het uitwerken van offertes. Dat is ook de plek waar het het snelst geld kost, want in deze markt gunt de klant het werk vaak aan wie het eerst levert.",
      advies: "Een offertescherm met jouw eigen posten en eenheidsprijzen brengt dit terug van uren naar minuten. Je vinkt aan, vult aantallen in, en er rolt een offerte uit met jouw logo en voorwaarden."
    },
    bon: {
      naam: "Bonnen en facturen",
      tekst: "Bij jou zit de meeste tijd in het achteraf uitzoeken van bonnen, uren en facturen. Dat kost je niet alleen tijd, het kost je ook rente: elke factuur die drie weken later de deur uitgaat, is drie weken langer wachten op je eigen geld.",
      advies: "Een werkbon op de telefoon, met uren, materiaal en foto's, die meteen in het systeem staat. Jij ziet in één scherm welke klussen af zijn en nog niet gefactureerd zijn."
    },
    planning: {
      naam: "Plannen en afstemmen",
      tekst: "Bij jou zit de meeste tijd in plannen en rondbellen. Dat is de stilste kostenpost van allemaal, want je merkt hem pas als er een dag verkeerd is ingedeeld.",
      advies: "Een weekbord waarop je klussen naar dagen en naar mensen sleept, en waar iedereen op zijn eigen telefoon ziet waar hij morgen moet zijn. Bij herplannen krijgt iedereen automatisch bericht."
    },
    klant: {
      naam: "Klanten en onderhoud",
      tekst: "Bij jou zit de meeste tijd in het nabellen van klanten en het inplannen van onderhoud. Dit is ook de post waar het meeste omzet stilletjes wegloopt, want een vergeten klant belt volgend jaar iemand anders.",
      advies: "Elke maandag een lijst met wie er aan de beurt is en wie je moet nabellen, met een concept-bericht erbij dat jij alleen nog goedkeurt."
    }
  };

  var i = 0, antwoorden = {}, tarief = 55, vak = "", grootsteLek = null;
  var $ = function(id){ return document.getElementById(id); };

  function track(naam, extra){
    if (window.FRONTPOCKET_ANALYTICS && typeof window.FRONTPOCKET_ANALYTICS.track === "function") {
      try { window.FRONTPOCKET_ANALYTICS.track(naam, extra || {}); } catch(e) {}
    }
  }

  function toon(id){
    ["start","vraag","uitkomst"].forEach(function(s){ $(s).hidden = (s !== id); });
    var doel = $(id);
    if (doel) {
      var f = doel.querySelector("h1, h2, button, a.knop");
      if (f && typeof f.focus === "function") { try { f.focus({preventScroll:true}); } catch(e){ f.focus(); } }
    }
    window.scrollTo(0,0);
  }

  function tekenVraag(){
    var q = VRAGEN[i];
    $("teller").textContent = "Vraag " + (i+1) + " van " + VRAGEN.length;
    $("thema").textContent = q.thema;
    var pct = Math.round(((i)/VRAGEN.length)*100 + (100/VRAGEN.length));
    $("balkvul").style.width = pct + "%";
    var balk = document.querySelector(".balk");
    if (balk) balk.setAttribute("aria-valuenow", String(pct));
    $("vraagtekst").textContent = q.vraag;
    $("vraaghulp").textContent = q.hulp || "";
    $("vraaghulp").hidden = !q.hulp;
    $("terug").hidden = (i === 0);
    var box = $("opties");
    box.innerHTML = "";
    q.opties.forEach(function(o){
      var b = document.createElement("button");
      b.className = "optie";
      b.type = "button";
      var s = document.createElement("span");
      s.textContent = o.t;
      b.appendChild(s);
      if (o.h){
        var h = document.createElement("span");
        h.className = "hint";
        h.textContent = o.h;
        b.appendChild(h);
      }
      b.addEventListener("click", function(){ kies(q, o); });
      box.appendChild(b);
    });
    var eerste = box.querySelector("button");
    if (eerste) { try { eerste.focus({preventScroll:true}); } catch(e){ eerste.focus(); } }
  }

  function kies(q, o){
    if (q.soort === "vak") vak = o.v;
    else if (q.soort === "tarief") tarief = o.v;
    else antwoorden[q.sleutel] = o.v;
    i++;
    if (i < VRAGEN.length) tekenVraag(); else reken();
  }

  function euro(n){
    return "€ " + Math.round(n).toLocaleString("nl-NL");
  }

  function komma(n){
    return String(n).replace(".", ",");
  }

  function reken(){
    var sleutels = ["offerte","bon","planning","klant"];
    var perWeek = 0, grootste = sleutels[0], max = -1;
    sleutels.forEach(function(k){
      var v = antwoorden[k] || 0;
      perWeek += v;
      if (v > max){ max = v; grootste = k; }
    });
    var perJaar = perWeek * 46;
    var geld = perJaar * tarief;
    grootsteLek = grootste;

    $("perjaar").textContent = euro(geld);
    $("perjaartekst").textContent = "per jaar aan tijd die je aan dit soort werk kwijt bent, gerekend met " + euro(tarief) + " per uur";
    $("perweek").textContent = komma(perWeek);
    $("urenjaar").textContent = Math.round(perJaar) + " uur";

    var koppen = {
      aannemer: "Zo ziet de week van een aannemer eruit",
      installateur: "Zo ziet de week van een installateur eruit",
      afbouw: "Zo ziet de week van een afbouwbedrijf eruit",
      groen: "Zo ziet de week van een groenbedrijf eruit"
    };
    $("kop").textContent = koppen[vak] || "Zo ziet jouw week eruit";

    var staaf = $("staaf");
    staaf.innerHTML = "";
    sleutels.forEach(function(k){
      var v = antwoorden[k] || 0;
      var rij = document.createElement("div");
      rij.className = "staafrij";
      var naam = document.createElement("span");
      naam.textContent = LEKKEN[k].naam;
      var track = document.createElement("span");
      track.className = "track";
      var vul = document.createElement("span");
      vul.style.width = Math.round((v/5)*100) + "%";
      track.appendChild(vul);
      var w = document.createElement("span");
      w.className = "w";
      w.textContent = komma(v) + " u";
      rij.appendChild(naam); rij.appendChild(track); rij.appendChild(w);
      staaf.appendChild(rij);
    });

    $("lektitel").textContent = LEKKEN[grootste].naam;
    $("lektekst").textContent = LEKKEN[grootste].tekst;
    $("advies").textContent = LEKKEN[grootste].advies;
    $("nuance").textContent = "Dit is een schatting op basis van wat je zelf hebt ingevuld, geen meting. Software haalt hier niet alles uit: reken op ongeveer de helft, dus zo'n " + euro(geld/2) + " per jaar. Dat is nog steeds meer dan wat een app op één werkproces kost.";

    toon("uitkomst");
    track("check_afgerond", { grootste_lek: grootste, uren_per_week: perWeek, bedrag_per_jaar: Math.round(geld) });
    track("grootste_lek", { lek: grootste });
  }

  // Wire up Calendly-knop met de gedeelde config
  var boek = $("boek");
  if (boek && window.FRONTPOCKET_CONFIG) {
    boek.href = window.FRONTPOCKET_CONFIG.calendlyUrl;
    boek.addEventListener("click", function(){
      track("calendly_click", { plek: "check-uitkomst", grootste_lek: grootsteLek });
    });
  }

  $("startknop").addEventListener("click", function(){
    i = 0; antwoorden = {};
    track("check_gestart");
    tekenVraag();
    toon("vraag");
  });
  $("terug").addEventListener("click", function(){
    if (i > 0){ i--; tekenVraag(); }
  });
  $("opnieuw").addEventListener("click", function(){
    i = 0; antwoorden = {}; toon("start");
  });
})();
